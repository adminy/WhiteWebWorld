'use strict'
const { encode, decode } = require('dns-packet')
const dgram = require('dgram-as-promised').DgramAsPromised
const loadSocketServer = require('./server')
const db = require('./db')
const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout))
const UDP_SERVERS = ['1.1.1.1', '1.0.0.1', '8.8.8.8', '8.8.4.4', '9.9.9.9']
const UDP_PORT = 53

const queryUdp = async (server, packet) => {
  const socket = dgram.createSocket('udp4')
  socket.send(packet, 0, packet.length, UDP_PORT, server)
  const res = await Promise.any([socket.recv(), sleep(10 * 1000)])
  socket.close()
  return res && res.msg
}

const queryServers = packet => Promise.any(UDP_SERVERS.map(server => queryUdp(server, packet)))

const isBlocked = domain => false

const resolveQuery = async (packet, clientIP) => {
  const { id, questions } = decode(packet)
  const res = { type: 'response', id, questions }
  const domain = questions[0].name
  if (isBlocked(domain)) return encode({ ...res, flags: 3 })
  const query = await queryServers(packet)
  if (!query) return encode({ ...res, flags: 2 })
  db.addDomain(domain)
  console.log('resolved: ', domain, ' asked by ', clientIP)
  return query
}

const dns = dgram.createSocket('udp4')
dns.bind(UDP_PORT).then(async ({ address, port }) => {
  console.log(`DNS is listening on ${address}:${port}`)
  for await (const { msg, rinfo } of dns) {
    resolveQuery(msg, rinfo.address).then(res => dns.send(res, 0, res.length, rinfo.port, rinfo.address))
  }
})

loadSocketServer().then(server => {
  // API here
  // server.get('/checkRoom/:roomID', (req, res) => res.send(updateRoom(req.params.roomID)))
  // server.get('/:roomID/:name', (req, res) => res.send(process.cwd() + '/dist/index.html'))

  // Live API here

  // server.get('/host/:roomID', { websocket: true }, (connection, req, params) => {
  //   console.log('host created room ' + params.roomID)
  //   const ws = connection.socket
  //   ws.roomHost = params.roomID
  //   ws.on('message', msg => server.websocketServer.clients.forEach(client => client !== ws && client.send(msg)))
  //   ws.on('close', () => console.log(`Host in room ${params.roomID} finished streaming`))
  //   ws.send('[]')
  //   // ws.on('message', msg => ws.send( Buffer.from( 'hi from server, ack you said: ' + msg + ' in room: ' + params.roomID ) ) )
  // })

  server.path('/api', async server => {
    server.get('/domains', (req, res) => db.listDomains())
  // server.get('/status/:name', (req, res) => res.send(JSON.stringify({ status: 'ok', ...req.params })))
  // server.post('/upload', (req, res) => {
  // const bodyFiles = req.body['files[]']
  // const files = Array.isArray(bodyFiles) ? bodyFiles : [bodyFiles]
  // files.forEach(({ name, data, md5, size }) => fs.writeFileSync(process.cwd() + '/upload/' + name, data))
  // res.send(JSON.stringify({ status: 'ok' }))
  // })
  })

  server.parcel(process.cwd() + '/web/index.html')
  server.listen(80, '0.0.0.0').then(addr => console.log(`server listening on ${addr}`))
})

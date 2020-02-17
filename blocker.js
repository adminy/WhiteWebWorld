const net = require('net')
const fs = require('fs')
const { encode, decode } = require('dns-packet');
const config = require('./config.js');
const { queryServers } = require('./query');

const WL = __dirname + '/whitelist.txt'

const loadWhiteList = () => fs.readFileSync(WL).toString().split('\n').filter(line => line.length > 0)

allowed = loadWhiteList()

fs.watch(WL, {}, () => setTimeout(() => allowed = loadWhiteList(), 1000))

const textFill = (str, length) => {
  for(let i = str.length; i < length; i++)
      str +=  '&nbsp;'
  return str
}
const showInfo = (sites, type, text, color) => {
  const filtered = sites.filter(kv => kv[1][type]).sort((a, b) => b[1] - a[1])
  text = `<h2>${text}<span style='color:${color}'>${filtered.length}</span></h2>`
  for(let i = 0; i < filtered.length; i++) {
    const index = i <= 9 ? '&nbsp;' + i : i
    const totalCalls = '' + filtered[i][1][type]
    text += `${index}> ${textFill(totalCalls, 5)}: ${filtered[i][0]}</br>`
  }
  return text
}

const visitedSites = {}

const server = net.createServer(socket => {
  const sites = Object.entries(visitedSites)
   const html = showInfo(sites, 'blocks', 'Total Sites Blocked: ', 'red') +
                showInfo(sites, 'requests', 'Sites Stats: ', 'green')
  socket.write([
    'HTTP/1.1 200 OK',
    'Content-Type: text/html; charset=UTF-8',
    `Content-Length: ${html.length}`,
    `Server: Marin-HTTP-Server`,
    'Connection: close',
    '\r', html
  ].join('\n'))
  socket.end()
})
server.listen(80, '127.0.0.1')

const isBlocked = domain => {
  for(const dns of allowed) {
    if(domain.includes(dns)) {
      if(dns in visitedSites) visitedSites[dns].requests++
      else visitedSites[dns] = {requests: 1}
      return false;
    }
  }
  domain = domain.split('.').slice(-2).join('.')
  if(domain in visitedSites) visitedSites[domain].blocks++
  else visitedSites[domain] = {blocks: 1}
  return true;
}

module.exports.resolveQuery = function resolveQuery(packet) {
  return new Promise((resolve)=> {
    const servers = config.useHttp? config.httpServers: config.udpServers;
    const request = decode(packet);

    // questions is an array but it's almost guaranteed to have only one element
    // https://serverfault.com/q/742785
    const question = request.questions[0];

    // resolve with NXDOMAIN if the domain is blocked
    if(['A', 'AAAA'].includes(question.type) && isBlocked(question.name)) {
      // lm.log(`Blocked ${question.name}`)
      return resolve(encode({ type: 'response', id: request.id, flags: 3, questions: request.questions })) // flag 3 is NXDOMAIN; https://serverfault.com/a/827108
    }

    // query remote servers. Resolve with SERVFAIL on error
    queryServers(servers, packet, { timeout: config.timeout })
      .then(resolve)
      .catch((err)=> {
        console.log(err.message)
        resolve(encode({ type: 'response', id: request.id, flags: 2, questions: request.questions })) // flag 2 is SERVFAIL; https://serverfault.com/a/827108
      })
  })
}

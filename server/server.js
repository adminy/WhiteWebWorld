const loadSocketServer = async () => {
  const server = require('fastify')()
  await server.register(require('middie'))
  await server.register(require('fastify-websocket'), { options: { maxPayload: 16 * 1024 * 1024 } })
  server.path = (prefix, registerAPI) =>
    server.register(async (server, opts, done) => {
      await server.register(require('fastify-file-upload'))
      await registerAPI(server)
      done()
    }, { prefix })
  // https://parceljs.org/api.html#bundler
  server.parcel = path => setTimeout(() => server.use(new (require('parcel-bundler'))(path, {}).middleware()), 0)
  return server
}

module.exports = loadSocketServer

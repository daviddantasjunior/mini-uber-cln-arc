import { env } from 'src/env'
import HttpServer from './httpServer'
import Hapi from '@hapi/hapi'

export default class HapiAdapter implements HttpServer {
  server: Hapi.Server

  constructor() {
    this.server = Hapi.server({})
  }

  on(method: string, url: string, callback: Function): void {
    this.server.route({
      method,
      path: url.replace(/\:/g, ''),
      handler: async function (request: any, reply: any) {
        try {
          const output = await callback(request.params, request.payload)
          return output
        } catch (e: any) {
          return reply.response(e.message).code(422)
        }
      },
    })
  }

  listen(port: number, host?: string, _?: Function): void {
    this.server.settings.port = port
    this.server.settings.host = host
    console.log(`Server running at http://${env.HOST}:${env.PORT}/`)
    this.server.start()
  }
}

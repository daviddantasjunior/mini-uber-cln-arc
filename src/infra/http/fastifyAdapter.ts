import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import HttpServer from './httpServer'

export default class FastifyAdapter implements HttpServer {
  app: FastifyInstance

  constructor() {
    this.app = fastify()
  }

  on(method: string, url: string, callback: Function): void {
    const routeOptions: RouteShorthandOptions = {
      schema: {
        response: {
          200: {
            type: 'object',
          },
        },
      },
    }

    this.app.route({
      method: method.toUpperCase() as any,
      url: url.replace(/\{|\}/g, ''),
      handler: async (request, reply) => {
        try {
          const output = await callback(request.params, request.body)
          reply.send(output)
        } catch (e: any) {
          reply.status(422).send(e.message)
        }
      },
      ...routeOptions,
    })
  }

  listen(port: number, host?: string, _?: Function): void {
    this.app.listen(port, (err, host) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server is listening on ${host}`)
    })
  }
}

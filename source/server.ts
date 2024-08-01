import 'dotenv/config'
import { env } from '../environment/env.config.js'
import { fastify } from './fastify.js'

async function start() {
	try {
		await fastify.listen({ host: env.HOST, port: env.PORT })
		const address = fastify.server.address()
		const port = typeof address === 'string' ? address : address?.port
		console.log(`HTTP server running on port: ${port}`)
	} catch (error) {
		fastify.log.error(error)
		process.exit(1)
	}
}

start()

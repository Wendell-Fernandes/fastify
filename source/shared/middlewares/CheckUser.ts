import type { FastifyReply, FastifyRequest } from 'fastify'

export async function CheckUser(request: FastifyRequest, reply: FastifyReply) {
	if (request.method !== 'POST') {
		const sessionID = request.cookies.sessionID

		if (!sessionID) {
			return reply.status(401).send({
				error: 'Unauthorizied',
			})
		}
	}
}

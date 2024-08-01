import { randomUUID } from 'node:crypto'
import type { FastifyReply, FastifyRequest } from 'fastify'
import * as zod from 'zod'
import { kysely } from '../database/kysely/index.js'

export async function CreateTransaction(request: FastifyRequest, reply: FastifyReply) {
	const transactionCreationBodySchema = zod.object({
		title: zod.string(),
		amount: zod.number(),
		type: zod.enum(['credit', 'debit']),
	})

	const { amount, title, type } = transactionCreationBodySchema.parse(request.body)

	let sessionID = request.cookies.sessionID

	if (!sessionID) {
		sessionID = randomUUID()

		reply.cookie('sessionID', sessionID, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7, // 7 days
		})
	}

	await kysely
		.insertInto('transactions')
		.values({
			id: randomUUID(),
			title,
			amount: type === 'credit' ? amount : amount * -1,
			created_at: JSON.stringify(new Date()),
			session_id: sessionID,
		})
		.execute()

	return reply.code(201).send()
}

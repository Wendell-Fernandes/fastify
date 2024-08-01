import type { UUID } from 'node:crypto'
import type { FastifyRequest } from 'fastify'
import { kysely } from '../database/kysely/index.js'

export async function ListTransactions(request: FastifyRequest) {
	const { sessionID } = request.cookies

	const transactions = await kysely
		.selectFrom('transactions')
		.selectAll()
		.where('session_id', '=', sessionID as UUID)
		.execute()

	return { transactions }
}

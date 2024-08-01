import type { FastifyInstance } from 'fastify'
import { CreateTransaction } from '../controllers/CreateTransaction.js'
import { GetSummary } from '../controllers/GetSummary.js'
import { GetTransaction } from '../controllers/GetTransaction.js'
import { ListTransactions } from '../controllers/ListTransactions.js'
import { CheckUser } from '../shared/middlewares/CheckUser.js'

export async function TransactionsRoutes(fastify: FastifyInstance) {
	fastify.addHook('preHandler', CheckUser)

	fastify.get('/', ListTransactions)

	fastify.get('/:id', GetTransaction)

	fastify.get('/summary', GetSummary)

	fastify.post('/', CreateTransaction)
}

import { execSync } from 'node:child_process'
import supertest from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { fastify } from '../fastify.js'

describe('Transactins routes', () => {
	beforeAll(async () => await fastify.ready())

	beforeEach(() => {
		execSync('pnpm kysely migrate:rollback --all')
		execSync('pnpm kysely migrate:latest')
	})

	afterAll(async () => await fastify.close())

	it('user can create a new transaction', async () => {
		await supertest(fastify.server)
			.post('/transactions')
			.send({
				title: 'Transaction example',
				amount: 1000,
				type: 'credit',
			})
			.expect(201)
	})

	it('must be able to list all transactions', async () => {
		const createTransactionResponse = await supertest(fastify.server).post('/transactions').send({
			title: 'Transaction example',
			amount: 1000,
			type: 'credit',
		})

		const cookies = createTransactionResponse.get('Set-Cookie')

		const listTransactionsResponse = await supertest(fastify.server)
			.get('/transactions')
			.set('Cookie', cookies as string[])
			.expect(200)

		expect(listTransactionsResponse.body.transactions).toEqual([
			expect.objectContaining({
				title: 'Transaction example',
				amount: 1000,
			}),
		])
	})

	it('must be able to get a specific transaction', async () => {
		const createTransactionResponse = await supertest(fastify.server).post('/transactions').send({
			title: 'Transaction example',
			amount: 1000,
			type: 'credit',
		})

		const cookies = createTransactionResponse.get('Set-Cookie')

		const listTransactionsResponse = await supertest(fastify.server)
			.get('/transactions')
			.set('Cookie', cookies as string[])
			.expect(200)

		const transactionID = listTransactionsResponse.body.transactions[0].id

		const getTransactionResponse = await supertest(fastify.server)
			.get(`/transactions/${transactionID}`)
			.set('Cookie', cookies as string[])
			.expect(200)

		expect(getTransactionResponse.body.transaction).toEqual(
			expect.objectContaining({
				title: 'Transaction example',
				amount: 1000,
			}),
		)
	})

	it('must be able to get the summary', async () => {
		const debitTransactionResponse = await supertest(fastify.server).post('/transactions').send({
			title: 'Transaction example',
			amount: 1000,
			type: 'debit',
		})

		const cookies = debitTransactionResponse.get('Set-Cookie')

		await supertest(fastify.server)
			.post('/transactions')
			.set('Cookie', cookies as string[])
			.send({
				title: 'Transaction example',
				amount: 2000,
				type: 'credit',
			})

		const summaryResponse = await supertest(fastify.server)
			.get('/transactions/summary')
			.set('Cookie', cookies as string[])
			.expect(200)

		expect(summaryResponse.body.summary).toEqual({
			amount: 1000,
		})
	})
})

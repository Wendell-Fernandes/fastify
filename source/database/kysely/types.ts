import type { UUID } from 'node:crypto'
import type { Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
	transactions: TransactionsTable
}

export interface TransactionsTable {
	id: UUID
	session_id: string
	title: string
	amount: number
	created_at: string
}

export type Transaction = Selectable<TransactionsTable>
export type NewTransaction = Insertable<TransactionsTable>
export type TransactionUpdate = Updateable<TransactionsTable>

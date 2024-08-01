import { defineConfig } from 'kysely-ctl'
import { dialect } from './source/database/kysely/index.js'

export default defineConfig({
	dialect,
	migrations: {
		migrationFolder: 'database/migrations',
	},
})

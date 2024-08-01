import { config } from 'dotenv'
import * as zod from 'zod'

if (process.env.NODE_ENV === 'test') config({ path: 'environment/.env.test' })
else config({ path: 'environment/.env.dev' })

const schema = zod.object({
	NODE_ENV: zod.enum(['development', 'test', 'production']).default('development'),
	DATABASE_CLIENT: zod.enum(['sqlite', 'postgresql']),
	PORT: zod.coerce.number().default(3333),
	HOST: zod.string().default('localhost'),
	DATABASE_URL: zod.string(),
})

const _env = schema.safeParse(process.env)

if (_env.success === false) {
	throw new Error(`Invalid environments variables! ${JSON.stringify(_env.error.format())}`)
}

export const env = _env.data

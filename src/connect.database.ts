import knex from 'knex'
import dotenv from 'dotenv'
dotenv.config()

export const connection = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: { 
            rejectUnauthorized: false 
        }
    }
}) 
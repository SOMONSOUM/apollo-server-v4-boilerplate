import knex from 'knex';
import { config } from 'dotenv';
config();

export default function createKnexContex() {
  return {
    default: knex({
      client: 'mysql2',
      connection: process.env.DATABASE_URL,
      pool: { min: 3, max: 10 },
    }),
  };
}

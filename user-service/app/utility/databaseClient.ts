import { Client } from 'pg'

export const DBClient = () => {
  return new Client({
    host: 'user-service.cv402emcgt18.ap-southeast-1.rds.amazonaws.com',
    user: 'postgres',
    database: 'user_service',
    password: 'postgres',
    port: 5432,
  })
}

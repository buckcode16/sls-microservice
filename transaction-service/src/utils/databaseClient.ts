import { Client } from 'pg'

export const DBClient = () => {
  const client = new Client({
    host: 'ec2-52-221-214-109.ap-southeast-1.compute.amazonaws.com',
    user: 'transaction_service',
    database: 'transaction_service',
    password: 'transaction_service',
    port: 5432,
  })
  console.log(client)
  return client
}

// Local Host Instance
// host: '127.0.0.1',
// user: 'postgres',
// database: 'postgres', (CREATE DATABASE transaction_service; first)
// password: 'postgres',
// port: 5432,

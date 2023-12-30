import { Client } from 'pg'

export const DBClient = () => {
  return new Client({
    host: 'ec2-52-221-214-109.ap-southeast-1.compute.amazonaws.com',
    user: 'user_service',
    database: 'user_service',
    password: 'user_service',
    port: 5432,
  })
}

// RDS Managed Instance (Terminated)
// host: 'user-service.cv402emcgt18.ap-southeast-1.rds.amazonaws.com',
// user: 'postgres',
// database: 'user_service',
// password: 'postgres',
// port: 5432,

// EC2 Self Managed RDS Instance
// host: 'ec2-52-221-214-109.ap-southeast-1.compute.amazonaws.com',
// user: 'user_service',
// database: 'user_service',
// password: 'user_service',
// port: 5432,

// Local Host Instance
// host: '127.0.0.1',
// user: 'postgres',
// database: 'postgres',
// password: 'postgres',
// port: 5432,

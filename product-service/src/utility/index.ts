import { ConnectDB } from './dbConnection'

ConnectDB()
  .then(() => {
    console.log('DB connected!')
  })
  .catch((err) => console.log(err))

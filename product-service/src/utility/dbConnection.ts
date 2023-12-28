import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

const ConnectDB = async () => {
  const DB_URL =
    'mongodb+srv://sls-mongo:sls-mongo@cluster0.rs9ksjc.mongodb.net/nodejs-sls-mc?retryWrites=true&w=majority'

  try {
    await mongoose.connect(DB_URL)
  } catch (err) {
    console.log(err)
  }
}

export { ConnectDB }

const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODBDEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log(`MongoDB Connected : ${conn.connection.host}`)
  } catch (error) {
    console.log(`Mongo error :${error}`)
    process.exit(1)
  }
}
connectDB()

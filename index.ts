// Imports
import express from 'express'
import mongoose from 'mongoose'
import router from './config/router'
import 'dotenv/config'

// Node setup
const app = express()

const startServer = async () => {
  try {
    await mongoose.connect(process.env.dbURI!)
    console.log('😻 Database has connected successfully')

    // Middleware
    app.use(express.json())

    // Router middleware
    app.use('/api', router)

    // Log every request
    app.use((req, _res, next) => {
      console.log(`😽 Incoming request: ${req.method} - ${req.url}`)
      next()
    })

    // Catcher
    app.use((_req, res) => {
      return res.status(404).json({ message: '🙀 Path not found' })
    })

    // Listen
    const server = app.listen(process.env.PORT, () => {
      console.log(`😸 Server up and running on port ${process.env.PORT}`)
    })
    // 30 second timeout
    server.timeout = 30000
  } catch (err) {
    console.log('😿 Something went wrong, could not connect')
    console.log(err)
  }
}

startServer()


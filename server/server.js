import express from 'express'
import mongoose from 'mongoose'
import { DB_URI, host, PORT } from './config/environment.js'
import router from './config/router.js'

import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()

const startServer = async () => {

  try {
    await mongoose.connect(DB_URI)
    console.log('Database has connected successfully')

    app.use(express.json())
    app.use('/api', router)

    // ** New lines **
    app.use(express.static(path.join(__dirname, 'client', 'build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
    app.use((req, _res, next) => {
      console.log(`Request received: ${req.method} - ${req.url}`)
      next()
    })

    app.use((_req, res) => {
      return res.status(404).json({ message: 'Path not found' })
    })

    const server = app.listen(PORT, host, () => console.log(`🚀 Server up and running on PORT ${PORT}`)) // app.listen takes the port and starts the server up using express
    server.timeout = 1000

  } catch (err) {
    console.log('Something went wrong - couldnt connect')
    console.log(err)
  }
}

startServer()
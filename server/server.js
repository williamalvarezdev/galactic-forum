
import express from 'express'
import mongoose from 'mongoose'
import { DB_URI, host, PORT } from './config/environment.js'
import router from './config/router.js'

const express = require('express');
const cors = require('cors');
const app = express();
const Port = 4000;


import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()

const startServer = async () => {


/*CREATING AND RETRIEVING POST THREADS WITHIN APPLICATION */
app.post("/api/create/thread", async (req, res) => {
    const { thread, userId} = req.body;
    const threadId = generatedId();

    console.log({ thread, userId, threadId });
});

/* SAVING POST AND SEND ALL AVAILABLE POST TO THE CLIENT SIDE */
const threadList = [];

app.post("/api/create/thread", async (req, res) => {
    const { thread, userId } = req.body;
    const threadId = generatedId();

    //Add post to array or db
    threadList.unshift({
        id: threadId,
        title: thread,
        userId,
        replies: [],
        likes: [],
    });

    res.json({
        message: "Thread created successfully!",
        threads: threadList,
    })
})

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


import express from 'express'
import mongoose from 'mongoose'
import { DB_URI, host, PORT } from './server/config/environment.js'
import router from './server/config/router.js'
import cors from 'cors'
const app = express();


import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const startServer = async () => {



/* SAVING POST AND SEND ALL AVAILABLE POST TO THE CLIENT SIDE */
// Assuming threadList is declared and initialized somewhere in your code
const threadList = [];

// POST endpoint to create a thread
app.post("/api/create/thread", async (req, res) => {

    const { thread, userId } = req.body;
    const threadId = generatedId();

    // Add post to array or db
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
    });
});

// GET endpoint to fetch all threads
app.get("/api/threads", (req, res) => {
    res.json({
        threads: threadList,
    });
});

// GET endpoint to fetch likes for a thread
app.get("/api/thread/:threadId/likes", (req, res) => {
  const threadId = req.params.threadId;
  
  const thread = threadList.find(thread => thread.id === threadId);
  
  if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
  }

  res.json({
      threadId: thread.id,
      likes: thread.likes,
  });
});


  try {
    await mongoose.connect(DB_URI)
    console.log('Database has connected successfully')
    app.use(cors());
    app.use(express.json())
    app.use('/api', router)

    app.use(express.static(path.join(__dirname, 'client', 'galactic-forum-app', 'build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'galactic-forum-app','build', 'index.html'))
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

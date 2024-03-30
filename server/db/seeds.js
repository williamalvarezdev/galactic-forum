import mongoose from 'mongoose'
import { DB_URI } from '../config/environment.js'

// Models
import User from '../models/user.js'

// Data
import userData from './data/usersD.js'


const seedDatabase = async () => {
  try {
    await mongoose.connect(DB_URI)
    console.log('Database connected')

    await mongoose.connection.db.dropDatabase()
    console.log('Dropped database')
    
    const users = await User.create(userData)

    await mongoose.connection.close()
    console.log('Goodbye')
  } catch (err) {
    console.log('You failed')
    console.log(err)
    await mongoose.connection.close()
    console.log('Goodbye')
  }
}

seedDatabase()
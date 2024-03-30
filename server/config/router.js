import express from 'express'
import {  getUser, getUsers, registerUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'

const router = express.Router()

// Users

router.route('/users')
  .get(getUsers)

router.route('/user')
  .get(secureRoute, getUser)
  
// Auth

router.route('/login')
  .post(loginUser)

router.route('/register')
  .post(registerUser)

export default router
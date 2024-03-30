import User from '../models/user.js'
import { SECRET } from '../config/environment.js'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    console.log(newUser)
    return res.status(202).json({ message: `Welcome ${newUser.username}` })
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

export const loginUser = async (req, res) => {
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    console.log('User to login ->', userToLogin)
    console.log('Password is a match: ', userToLogin.validatePassword(req.body.password))
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)){
      throw new Error()
    }
    const token = jwt.sign({ sub: userToLogin._id, username: userToLogin.username }, SECRET, { expiresIn: '7 days' })
    return res.status(200).json({ 
      message: `Welcome back ${userToLogin.username}`,
      token
    })
  } catch (err) {
    console.log(err)
    return res.status(422).json({ message: 'Unauthorised' })
  }

}

export const getUsers = async (req, res) => {
    try {
      console.log(req.currentUser,  'current user console log')
      const users = await User.find()
      if (!users) throw new Error()
      return res.status(200).json(users)
    } catch (err){
      console.log(err)
      return res.status(404).json({ message: 'Not found' })
    }
  } 
  
  export const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.currentUser._id)
      if (!user) throw new Error()
      return res.status(200).json(user)
    } catch (err){
      console.log(err)
      return res.status(404).json({ message: 'Not found' })
    }
  } 
import User from '../models/user'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const registerUser = async (req: { body: any }, res: any) => {
  try {
    const newUser = await User.create(req.body)
    console.log(newUser)
    const token = jwt.sign({ sub: newUser._id }, process.env.SECRET!!, { expiresIn: '7 days' })
    return res.status(202).json({ message: `Welcome ${newUser.username}`, token })
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
}

export const loginUser = async (req: { body: { email: string; password: string } }, res: any) => {
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    console.log('User to login', userToLogin)
    console.log('Password is a match: ', userToLogin.validatePassword(req.body.password))
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      throw new Error()
    }
    const token = jwt.sign({ sub: userToLogin._id }, process.env.SECRET!!, { expiresIn: '7 days' })
    console.log(token)
    return res.status(200).json({
      message: `Welcome back ${userToLogin.username}`,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(422).json({ message: 'Unauthorised' })
  }
}

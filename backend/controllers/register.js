import { Router } from "express"
import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Theme from "../models/theme.js"

const router = Router()

router.post("/", async (req, res) => {
  const body = req.body
  const { password, passwordConfirm } = body

  if (password !== passwordConfirm) {
    return res.status(400).json({ message: 'passwords must be the same' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    ...body,
    passwordHash,
    registered: {
      date: new Date(),
      age: 0
    },
  })

  const theme = new Theme({ user: user.id })
  
  await user.save()
  await theme.save()

  const forToken = {
    id: user._id,
    theme
  }

  const access_token = 
    jwt.sign(forToken, process.env.SECRET_KEY, {
      expiresIn: 60*60
    })

  return res.json({ message: "User created", access_token, theme, username: user.username })
})

export default router

import { Router } from "express"
import User from "../models/user.js"

const router = Router()

router.post("/", async (req, res) => {
  const { username, password, passwordConfirm } = req.body

  const user = new User({
    username,
    passwordHash: password,

  })

  await user.save()

  return res.json({ message: "User created" })
})

export default router

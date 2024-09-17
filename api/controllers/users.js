import { Router } from "express"
import User from "../models/user.js"

const router = Router()

router.get("/", async (req, res) => {
  const user = await User.findById(req.user_id)

  return res.json({ user })
})

router.put("/", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user_id, { ...req.body },
    { new: true, runValidators: true })

  res.json({ modifiedUser: user })
})

export default router

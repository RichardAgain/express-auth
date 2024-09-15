import { Router } from "express"
import User from "../models/user.js"

const router = Router()

router.get("/", (req, res) => {
  // const user = await User.findById(req.user.id)

  res.json({ user: req.user })
})

router.put("/", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body,
    { new: true, runValidators: true })

  res.json({ user })
})

export default router

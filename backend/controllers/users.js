import { Router } from "express"
import User from "../models/user.js"

const router = Router()

router.get("/", async (req, res) => {
  const user = await User.findById(req.user_id)

  return res.json({ user })
})

router.put("/", async (req, res) => {
  const data = {
    ...req.body,
    dob: {
      date: req.body.dob,
      age: 0,
    },
  }

  console.log(data)

  const user = await User.findByIdAndUpdate(req.user_id, data,
    { new: true, runValidators: true })

  res.json({ modifiedUser: user })
})

export default router

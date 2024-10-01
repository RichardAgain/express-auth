import { Router } from "express"
import User from "../models/user.js"
import Theme from "../models/theme.js"

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

  const user = await User.findByIdAndUpdate(req.user_id, data,
    { new: true, runValidators: true })

  res.json({ modifiedUser: user })
})

router.get("/theme", async (req, res) => {
  const theme = await Theme.find({ user: req.user_id })

  return res.json({ theme })
})

router.put("/theme", async (req, res) => {
  const theme = await Theme.findOneAndUpdate({ user: req.user_id }, req.body, { new: true })

  return res.json(theme)
})

export default router

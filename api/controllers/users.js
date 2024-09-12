import { Router } from "express"
import User from "../models/user.js"

const router = Router()

router.get("/", (req, res) => {
  res.json({ user: req.user })
})

router.put("/", (req, res) => {})

export default router

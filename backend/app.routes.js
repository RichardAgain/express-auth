
import express from "express"
const router = express.Router()

import loginController from "./controllers/login.js"
import registerController from "./controllers/register.js"
import userController from "./controllers/users.js"
import { getRequestUser } from "./middleware/authMiddleware.js"

router.get("/api/ping", (req, res) => {
  res.json({ message: "Pong!" })
})

router.use("/api/login", loginController)
router.use("/api/register", registerController)

router.use("/api/user", getRequestUser, userController)

// UNKNOWN ENDPOINT
router.use((request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
})

export default router

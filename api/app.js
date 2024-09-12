import express from "express"
import cors from "cors"

const app = express()
import loginController from "./controllers/login.js"
import registerController from "./controllers/register.js"
import userController from "./controllers/users.js"

import mongoose from "mongoose"
import { DATABASE, MONGODB_URI } from "./utils/config.js"

import errorHandler from "./middleware/errorHandler.js"
import { getRequestToken, getRequestUser } from "./middleware/authMiddleware.js"

console.log('connecting...')
mongoose.connect(MONGODB_URI, { dbName: DATABASE })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB: ", err))


app.use(cors())
app.use(express.json())
app.use(express.static("dist/browser"))

app.use(getRequestToken)

app.get("/api/ping", (req, res) => {
  res.json({ message: "Pong!" })
})


app.use("/api/login", loginController)
app.use("/api/register", registerController)

app.use("/api/user", getRequestUser, userController)

// ERROR HANDLER
app.use(errorHandler)

// UNKNOWN ENDPOINT
app.use ((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})

export default app

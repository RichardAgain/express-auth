import express from "express"
import cors from "cors"

import {} from 'express-async-errors' 
const app = express()

// MONGODB CONNECTION 
import mongoose from "mongoose"
import { DATABASE, MONGODB_URI } from "./utils/config.js"

console.log('connecting...')
mongoose.connect(MONGODB_URI, { dbName: DATABASE })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB: ", err))

// APP
import errorHandler from "./middleware/errorHandler.js"
import { getRequestToken, getRequestUser } from "./middleware/authMiddleware.js"

import loginController from "./controllers/login.js"
import registerController from "./controllers/register.js"
import userController from "./controllers/users.js"

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

// UNKNOWN ENDPOINT
app.use ((request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
})

// ERROR HANDLER
app.use(errorHandler)

export default app

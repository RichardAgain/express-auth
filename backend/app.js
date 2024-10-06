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
import appRoutes from './app.routes.js'

app.use(cors())
app.use(express.json())

app.use(express.static("public"))
app.use(express.static("dist/browser"))

app.use(getRequestToken)

app.use(appRoutes)

app.use(errorHandler)

export default app

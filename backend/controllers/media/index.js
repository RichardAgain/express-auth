import { Router } from "express";
import carourselRouter from './carousel.js'

const router = Router()

router.use(carourselRouter)

router.get("/", async (req, res) => {
    res.json({ message: "media" })
})

export default router
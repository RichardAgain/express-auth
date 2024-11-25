import { Router } from "express";
import carourselRouter from './carousel.js'
import videoRouter from './video.js'
import captionRouter from './captions.js'

const router = Router()

router.use(carourselRouter)
router.use(videoRouter)
router.use(captionRouter)

router.get("/", async (req, res) => {
    res.json({ message: "media" })
})

export default router

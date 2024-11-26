import { Router } from "express";
import carourselRouter from './carousel.js'
import videoRouter from './video.js'
import captionRouter from './captions.js'
import documentRouter from './pdf.js'
import Theme from '../../models/theme.js'

const router = Router()

router.use(carourselRouter)
router.use(videoRouter)
router.use(captionRouter)
router.use(documentRouter)

router.get("/", async (req, res) => {
    res.json({ message: "media" })
})

router.patch('/wysiwyg', async (req, res) => {
    const toUpdate = {
        wysiwyg: req.body.content
    }

    console.log(toUpdate)

    const theme = await Theme.findOneAndUpdate(
        { user: req.user_id },
        toUpdate,
        { new: true }
    )

    return res.json(theme)
})

export default router

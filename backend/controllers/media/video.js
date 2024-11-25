import { Router } from "express"
// import User from "../models/user.js"
import Theme from '../../models/theme.js'
import multer from "multer"

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/videos")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.split(" ").join("_"))
    },
  })
const upload = multer({ storage })

router.patch("/video", upload.single('video'), async (req, res) => {
  const toUpdate = {
    videoPath: req.file.filename
  }

  console.log(req.user_id)

  const theme = await Theme.findOneAndUpdate(
    { user: req.user_id }, 
    toUpdate, 
    { new: true }
  )

  console.log(theme)

  return res.json(theme)
})

export default router

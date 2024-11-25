import { Router } from "express"
// import User from "../models/user.js"
import Theme from '../../models/theme.js'
import multer from "multer"

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images/carousel")
    },
    filename: function (req, file, cb) {
      // console.log(req, file)

      cb(null, file.originalname + '.' + file.mimetype.split('/')[1])
    },
  })
const upload = multer({ storage })

router.get("/carousel", async (req, res) => {
  res.json({ message: "carousel" })
})

router.patch("/carousel", upload.array('images'), async (req, res) => {
  const toUpdate = {
    carouselPaths: req.files.map(file => file.filename)
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

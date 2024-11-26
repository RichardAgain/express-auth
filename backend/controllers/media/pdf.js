import { Router } from "express"
// import User from "../models/user.js"
import Theme from '../../models/theme.js'
import multer from "multer"

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/documents")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.split(" ").join("_"))
    },
  })
const upload = multer({ storage })

router.patch("/documents", upload.single('pdf'), async (req, res) => {
  const toUpdate = {
    userManualPath: req.file.filename
  }

  const theme = await Theme.findOneAndUpdate(
    { user: req.user_id }, 
    toUpdate, 
    { new: true }
  )

  return res.json(theme)
})

export default router
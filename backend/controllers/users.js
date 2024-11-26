import { Router } from "express"
import User from "../models/user.js"
import Theme from "../models/theme.js"
import multer from "multer"

const router = Router()



router.get("/", async (req, res) => {
  const user = await User.findById(req.user_id)

  return res.json({ user })
})

router.put("/", async (req, res) => {
  const data = {
    ...req.body,
    dob: {
      date: req.body.dob,
      age: 0,
    },
  }

  const user = await User.findByIdAndUpdate(req.user_id, data, {
    new: true,
    runValidators: true,
  })

  res.json({ modifiedUser: user })
})

router.get("/theme", async (req, res) => {
  const theme = await Theme.findOne({ user: req.user_id })

  return res.json({ theme })
})

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/fonts")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix)
  },
})
const upload = multer({ storage })

// theme
router.patch("/theme", upload.array("fonts"), async (req, res) => {
  let toUpdate = req.body

  const fontFile = req.files.find(file => file.originalname === 'paragraphs');
  const titleFontFile = req.files.find(file => file.originalname === 'titles');

  if (fontFile) {
    toUpdate = {
      ...toUpdate,
      fontPath: fontFile.filename,
    }
  }

  if (titleFontFile) {
    toUpdate = {
      ...toUpdate,
      titleFontPath: titleFontFile.filename,
    }
  }

  const theme = await Theme.findOneAndUpdate(
    { user: req.user_id },
    toUpdate,
    { new: true }
  )

  // console.log(toUpdate, 'theme')

  return res.json(theme)
})

export default router

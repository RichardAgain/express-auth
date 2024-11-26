import mongoose, { Schema } from "mongoose"

const themeSchema = new Schema({
  primary: String,
  secondary: String,
  accent: String,
  background: String,
  text: String,

  textSize: String,
  subSize: String,
  titleSize: String,

  wysiwyg: String,

  fontPath: { type: String },
  titleFontPath: { type: String },

  videoPath: { type: String },
  videoCaptionsPath: { type: String },

  userManualPath: { type: String },

  carouselPaths: [String],

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
})

themeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.registered
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.user
  },
})

const Theme = mongoose.model("Theme", themeSchema)

export default Theme

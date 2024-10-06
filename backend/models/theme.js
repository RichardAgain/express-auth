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

  fontPath: { type: String },

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

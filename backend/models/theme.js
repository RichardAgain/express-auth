import mongoose, { Schema } from "mongoose"

const themeSchema = new Schema({
  primary: { type: String, default: '#000000'},
  secondary: { type: String, default: '#000000'},
  accent: { type: String, default: '#000000'},
  background: { type: String, default: '#000000'},
  text: { type: String, default: '#000000'},

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

import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: String,
})

const User = mongoose.model("User", userSchema)

export default User

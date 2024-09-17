import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
  username: {
    type: String,
    // unique: true,
    required: true,
  },
  passwordHash: String,

  registered: {
    date: Date,
    age: Number,
  },

  email: {
    type: String,
    required: true
  },

  phone: String,
  cell: String,

  registered: {
    date: Date,
    age: Number,
  },

  name: {
    first: String,
    last: String,
  },

  gender: String,

  dob: {
    date: Date,
    age: Number,
  },

  nat: String,

  location: {
    street: {
      number: Number,
      name: String,
    },

    city: String,
    state: String,
    country: String,
    postcode: Number,

    coordinates: {
      latitude: String,
      longitude: String,
    },
  },
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash
    delete returnedObject.registered
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model("User", userSchema)

export default User

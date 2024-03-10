const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  username: {
    type: String,
    required: true,
    unique: [true, "Username must be unique"],
    minlength: [3, "Username must be at least {MINLENGTH} characters long."],
  },
  name: String,
  passwordHash: String,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

userSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});
const User = mongoose.model("User", userSchema);

module.exports = User;

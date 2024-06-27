const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { genToken, verifyToken } = require("../utils/jwtToken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (req, res) {
  try {
    console.log(this.password);
    const hash = bcrypt.hash(this.password, 10);
    this.password = await hash;
    console.log("this is the hashed password", hash);
  } catch (err) {
    console.log(err.message);
  }
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    console.log("username is incorrect");
    throw new Error("Invalid Credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("password is incorrect");
    throw new Error("Invalid Credentials");
  } else {
    return genToken(user);
  }
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) throw Error("All fields must be filled.");
  if (!validator.isEmail(email)) throw Error("Email is not valid.");

  const exists = await this.findOne({ email });
  if (exists) throw Error("Email already in use.");

  if (!validator.isStrongPassword(password))
    throw Error(
      "Password should have a letter, a capital letter, a number, a special character and be at least 8 characters long."
    );

  const salt = await bcrypt.genSalt(14);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All fields must be filled.");

  const user = await this.findOne({ email });

  if (!user) throw Error("Incorrect email.");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error("Incorrect password.");

  return user;
};

module.exports = mongoose.model("User", userSchema);

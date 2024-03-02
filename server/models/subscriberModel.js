const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

subscriberSchema.statics.subscribe = async (email) => {
  if (!email) throw Error("Email must be filled in.");
  if (!validator.isEmail(email)) throw Error("Invalid email.");
  const exists = await this.findOne({ email });
  if (exists) throw Error("Email address already subscribed.");

  const subscribedEmail = await this.create({ email });
  return subscribedEmail;
};

module.exports = mongoose.model("Subscriber", subscriberSchema);

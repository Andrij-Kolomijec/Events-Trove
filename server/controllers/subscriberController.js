const Subscriber = require("../models/subscriberModel");
const mongoose = require("mongoose");

async function subscribe(req, res) {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await Subscriber.create({ email });

    res.status(200).json({ message: "Subscribed.", email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const unsubscribe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Subscriber not found." });
  }

  const subscriber = await Subscriber.findOneAndDelete({ _id: id });

  if (!subscriber) {
    return res.status(404).json({ error: "Subscriber not found." });
  }

  res.status(200).json({ message: "Unsubscribed successfully." });
};

module.exports = { subscribe, unsubscribe };

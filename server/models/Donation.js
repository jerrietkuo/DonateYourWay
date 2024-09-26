// models/Donation.js
const { Schema, model } = require("mongoose");

const donationSchema = new Schema({
  donationAmount: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  donationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  charity: {
    type: Schema.Types.ObjectId,
    ref: "Charity", // Reference to the Charity model
    required: true,
  },
});

const Donation = model("Donation", donationSchema);

module.exports = Donation;


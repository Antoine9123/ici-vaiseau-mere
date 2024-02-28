const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    hour_start: {
      type: String,
      required: true,
    },
    hour_end: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    long_description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    artists: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

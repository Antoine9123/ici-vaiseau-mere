const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    event_name: { type: String, required: true },
    event_type: { type: String, required: true },
    date_start: { type: Date, required: true },
    date_end: { type: Date, required: true },
    event_price: { type: String, required: true },
    event_description: { type: String, required: true },
    event_programmation: { type: String, required: true },
    event_youtube: { type: String },
    image: [String],
    current_residencies: [{ type: Schema.Types.ObjectId, ref: "Residency" }],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

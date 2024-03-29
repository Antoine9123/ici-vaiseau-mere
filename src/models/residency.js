const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const residencySchema = new Schema(
  {
    collective_name: { type: String, required: true },
    residency_name: { type: String, required: true },
    residency_start: { type: Date, required: true },
    residency_end: { type: Date, required: true },
    description: { type: String, required: true },

    residency_insta: { type: String },
    residency_facebook: { type: String },
    residency_youtube: { type: String },
    residency_website: { type: String },
    
    artist_name_1: { type: String },
    artist_url_1: { type: String },
    artist_name_2: { type: String },
    artist_url_2: { type: String },
    artist_name_3: { type: String },
    artist_url_3: { type: String },
    artist_name_4: { type: String },
    artist_url_4: { type: String },
    artist_name_5: { type: String },
    artist_url_5: { type: String },
    artist_name_6: { type: String },
    artist_url_6: { type: String },
    artist_name_7: { type: String },
    artist_url_7: { type: String },
    artist_name_8: { type: String },
    artist_url_8: { type: String },
    artist_name_9: { type: String },
    artist_url_9: { type: String },
    artist_name_10: { type: String },
    artist_url_10: { type: String },
    artist_name_11: { type: String },
    artist_url_11: { type: String },
    artist_name_12: { type: String },
    artist_url_12: { type: String },
    artist_name_13: { type: String },
    artist_url_13: { type: String },
    artist_name_14: { type: String },
    artist_url_14: { type: String },
    artist_name_15: { type: String },
    artist_url_15: { type: String }
  },
  { timestamps: true }
);


const Residency = mongoose.model("Residency", residencySchema);
module.exports = Residency;

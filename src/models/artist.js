const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  art_field: {
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
  thumbnail: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  timestamps: true,
});

const Artist = mongoose.model("Artist", artistSchema);
module.exports = Artist;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema(
  {
    page: { type: String, required: true },
    content: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true, collection: "content" } 
);

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;

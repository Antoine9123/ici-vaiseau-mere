const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, collection: "authentification" } 
);

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;

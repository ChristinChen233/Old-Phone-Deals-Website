const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
    ref: "UserList",
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), expires: 3600 }, //1 hour
});

module.exports = mongoose.model("TokenVerify", tokenSchema, "tokenverify");

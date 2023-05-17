const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  createdTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", productSchema);

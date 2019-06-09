const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const ExtinguisherSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  six_yr_test: {
    type: Number,
    required: true
  },
  twelve_yr_test: {
    type: Number,
    required: true
  },
  notes: String
});

ExtinguisherSchema.plugin(timestamp);

const Extinguisher = mongoose.model("Extinguisher", ExtinguisherSchema);
module.exports = Extinguisher;

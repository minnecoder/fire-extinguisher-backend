const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const SiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  number_extinguishers: {
    type: Number,
    required: true
  },
  contact_name: {
    type: String,
    required: true
  },
  contact_phone: {
    type: String,
    required: true
  }
});

SiteSchema.plugin(timestamp);

const Site = mongoose.model("Site", SiteSchema);
module.exports = Site;

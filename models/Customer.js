const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const CustomerSchema = new mongoose.Schema({
  company_name: {
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
  phone: {
    type: Number,
    required: true
  },
  contact_name: {
    type: String,
    required: true
  },
  contact_email: {
    type: String,
    required: true
  },

  contract_status: String,
  contract_end_date: Date
});

CustomerSchema.plugin(timestamp);

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;

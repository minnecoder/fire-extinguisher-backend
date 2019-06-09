const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: Number,
  email: String,
  birthday: Date,
  hire_date: Date
});

EmployeeSchema.plugin(timestamp);

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;

// ============================================================
// models/Employee.js — Session 6: Employee Model
// ============================================================
// This model maps to the Employees collection in MongoDB.
// It is used by the login endpoint to verify credentials
// against REAL employee records instead of hardcoded values.
//
// The field names MUST match exactly what's in your MongoDB
// collection (case-sensitive):
//   Empid, Username, Password
//
// IMPORTANT: The third argument "Employees" must match your
// actual collection name in MongoDB. Check Compass to confirm
// whether yours is "Employees", "employees", or something else.

const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
  Empid: { type: Number, required: true },
  Username: { type: String, required: true },
  Password: { type: String, required: true },
})

module.exports = mongoose.model('Employee', employeeSchema, 'Employees')

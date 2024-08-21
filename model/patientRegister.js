const mongoose = require('mongoose')

const patientRegister = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mob: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  role: {
    type: String,

    
    required: true
  },
  files: {
    type: String,
  }
})

module.exports = mongoose.model("professor-managment", patientRegister)

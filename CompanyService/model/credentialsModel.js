const db=require('../dbConnection')
const mongoose = require('mongoose');
const { Schema } = mongoose;

const credentialsSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Company', 'Student','Admin'], required: true }
});

const CredentialsModel = mongoose.model('Credentials', credentialsSchema);

module.exports = CredentialsModel;
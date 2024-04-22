const mongoose = require('mongoose');
const { Schema } = mongoose;
const CredentialsModel = require('./ credentialsModel');

const companySchema = new Schema({
  companyName: { type: String,unique:true, required: true },
  contactEmail: { type: String,unique:true, required: true, unique: true },
  companyCity: String,
  credentials: { type: Schema.Types.ObjectId, ref: 'Credentials', required: true } // Reference to CredentialsModel
});


const CompanyModel = mongoose.model('Company', companySchema);

module.exports = CompanyModel;

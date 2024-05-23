const mongoose = require('mongoose');
const { Schema } = mongoose;
const CredentialsModel = require('./ credentialsModel'); // Corrected import path

const companySchema = new Schema({
  companyName: { type: String, unique: true, required: true },
  contactEmail: { type: String, unique: true, required: true },
  companyCity: String,
  credentials: { type: Schema.Types.ObjectId, ref: 'Credentials', required: true }
});



// Define a function to fetch company IDs and names
companySchema.statics.getCompanyIdsAndNames= async (req, res, next) => {
  try {
    
    const companies = await CompanyModel.find({}, { _id: 1, companyName: 1 });
   
   res.status(200).send(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).send("Error while fetching company");
  }
}
const CompanyModel = mongoose.model('Company', companySchema);

module.exports = CompanyModel;

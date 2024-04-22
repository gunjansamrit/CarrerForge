const mongoose = require('mongoose');
const { Schema } = mongoose;
const CredentialsModel = require('./ credentialsModel');
const { verifyPassword } = require('../utils/passwordHash'); // Import the verifyPassword utility function
const { generateToken,verifyToken } = require('../utils/jwtToken');
const companySchema = new Schema({
  companyName: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true },
  companyCity: String,
  credentials: { type: Schema.Types.ObjectId, ref: 'Credentials', required: true } // Reference to CredentialsModel
});

// Login method for company
companySchema.statics.login = async (req, res, next) => {
  const { username, password, role } = req.body;


  try {
    const credentials = await CredentialsModel.findOne({ username, role }); // Find credentials by username and role
    if (!credentials) {
      throw new Error('Invalid User Name');
    }

    const isMatch = await verifyPassword(password, credentials.password); // Verify the password
    if (!isMatch) {
      throw new Error('Invalid Password');
    }

    // Find the company based on credentials _id
    const token = generateToken({ userId: credentials._id , role:credentials.role });

    const company = await CompanyModel.findOne({ credentials: credentials._id });
    if (!company) {
      throw new Error('Company not found');
    }

    res.status(200).json({ companyId: company._id ,token });
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid credentials");
  }
};

const CompanyModel = mongoose.model('Company', companySchema);

module.exports = CompanyModel;

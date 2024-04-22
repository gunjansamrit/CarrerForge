const mongoose = require('mongoose');
const { generatePasswordHash, verifyPassword } = require('../utils/passwordHash'); // Import password hash utility functions

const { Schema } = mongoose;
const { generateToken,verifyToken } = require('../utils/jwtToken'); // Import JWT token utility function
const CredentialsModel = require('./ credentialsModel');
const CompanyModel = require('./companyModel');

const adminSchema = new Schema({
  credentials: { type: Schema.Types.ObjectId, ref: 'Credentials', required: true }, // Reference to CredentialsModel
  registeredCompanyName: [{ type: String }]// Field to store the registered company name
});



adminSchema.statics.authMiddleware = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const [, token] = authHeader.split(' ');
 
    

    

    try {
        const decoded = verifyToken(token);
       
        // req.userData = decoded; // Store decoded token data in req.userData
        if (decoded.role === 'Admin') {
            next(); // If role is Admin, allow access to the next middleware or route handler
        } else {
            throw new Error('Unauthorized: Invalid role');
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }else{
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        next(error);
    }
};


adminSchema.statics.registerCompany = async function (req, res, next) {
  const{adminId,companyData}=req.body;
  
  try {
   
   
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      throw new Error('Admin not found');
    }
    const password=companyData.password;
    const hashedPassword = await generatePasswordHash(password); // Hash the company password

    const credentialsData = {
      username: companyData.username,
      password: hashedPassword, // Use the hashed password
      role: 'Company'
    };

    const companyCredentials = await CredentialsModel.create(credentialsData);
    companyData.credentials = companyCredentials._id;

    const company = await CompanyModel.create(companyData);
    admin.registeredCompanyName = companyData.companyName; // Update the registered company name for the admin
    await admin.save(); // Save the changes to the admin document

    res.status(200).send("Company Registration Successful");
   
  } catch (error) {
    
    // if (error.code === 11000) {
    //   // Duplicate key error, handle accordingly
    //   res.status(400).send("Duplicate entry: Company name or contact email already exists");
    // } else {
    //   // Other errors, pass to error handling middleware
    //   next(error);
    // }
    next(error);
  }
};


const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { generatePasswordHash, verifyPassword } = require('../utils/passwordHash'); // Import password hash utility functions
const { generateToken } = require('../utils/jwtToken'); // Import JWT token utility function
const CredentialsModel = require('./ credentialsModel');
const CompanyModel = require('./companyModel');

const adminSchema = new Schema({
  credentials: { type: Schema.Types.ObjectId, ref: 'Credentials', required: true }, // Reference to CredentialsModel
  registeredCompanyName: [{ type: String }]// Field to store the registered company name
});

adminSchema.statics.signup = async (req, res, next) =>  {
  const adminData=req.body;
  console.log(req.body);
  
  try {
    const hashedPassword = await generatePasswordHash(adminData.password); // Hash the password

    const credentialsData = {
      username: adminData.username,
      password: hashedPassword, // Use the hashed password
      role: adminData.role || 'Admin'
    };

    const credentials = await CredentialsModel.create(credentialsData);
    if (credentials) {
      const adminD = {
        credentials: credentials._id,
      };

      const admin = await AdminModel.create(adminD);
      res.status(200).send("Admin Registration Successful");

    }
  } catch (error) {
    
    next(error);
  }
};




adminSchema.statics.login = async (req, res, next) =>  {

  const {username,password,role}=req.body;


  try {
    const credentials = await CredentialsModel.findOne({ username , role });
    if (!credentials) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await verifyPassword(password, credentials.password); // Verify the password
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken({ userId: credentials._id, role:credentials.role  });
    const adminId = await AdminModel.findOne({ credentials: credentials._id });

    res.status(200).json({ adminId: adminId._id, token });


  } catch (error) {
    next(error);
  }
};

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;

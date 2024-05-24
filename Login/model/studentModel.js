const { generateToken, verifyToken } = require("../utils/jwtToken"); // Import the generateToken utility function
const {
  generatePasswordHash,
  verifyPassword,
} = require("../utils/passwordHash"); // Import the verifyPassword utility function
const CredentialsModel = require("./ credentialsModel");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true, unique: true },
  contactNumber: String,
  cgpa: Number,
  highestEducation: String,
  credentials: {
    type: Schema.Types.ObjectId,
    ref: "Credentials",
    required: true,
  },
});

// Signup method
studentSchema.statics.signup = async (req, res, next) => {
  const studentData = req.body;
  const hashpwd = await generatePasswordHash(req.body.password);
  const credentialsData = {
    username: req.body.username,
    password: hashpwd, // Hash the password
    role: req.body.role,
  };

  try {
    const credentials = await CredentialsModel.create(credentialsData);
    if (credentials) {
      studentData.credentials = credentials._id;
      const student = await StudentModel.create(studentData);
      console.log(student);
      res.status(200).send("Registration Successful");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

// Login method
studentSchema.statics.login = async (req, res, next) => {
  const { username, password, role } = req.body;

  try {
    const credentials = await CredentialsModel.findOne({ username, role }); // Find credentials by username and role
    if (!credentials) {
      throw new Error("Invalid User Name");
    }

    const isMatch = await verifyPassword(password, credentials.password); // Verify the password
    if (!isMatch) {
      throw new Error("Invalid Password");
    }

    // Generate JWT token
    const token = generateToken({
      userId: credentials._id,
      role: credentials.role,
    });

    const cred = credentials._id;

    const student = await StudentModel.findOne({
      credentials: credentials._id,
    });
    if (!student) {
      throw new Error("Student not found");
    }

    // res.status(200).json({ token, studentId: student._id });
    res.status(200).json({ token, studentId: student._id, student });
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid credentials");
  }
};

const StudentModel = mongoose.model("Student", studentSchema);

module.exports = StudentModel;

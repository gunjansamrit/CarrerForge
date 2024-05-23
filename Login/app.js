const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const db = require("./dbConnection");
const cors = require("cors");
const studentRouter = require("./routes/studentRouter");
const companyRouter = require("./routes/companyRouter");
const adminRouter = require("./routes/adminRouter");
const errlogger = require("./utils/errHandler");
const port = 3009;

app.use(express.json());
const corsOptions = {
  origin: "*", // Replace with the origin of your React app or "*" to allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Include the HTTP methods you need
  allowedHeaders: ["Content-Type", "Authorization"], // Include the headers you need
  credentials: true, // Include this if you're using cookies or sessions
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use("/student", studentRouter);
app.use("/admin", adminRouter);
app.use("/company", companyRouter);
app.use(errlogger);

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

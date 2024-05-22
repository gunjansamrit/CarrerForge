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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Include this if you're using cookies or sessions
  })
);

app.use("/student", studentRouter);
app.use("/admin", adminRouter);
app.use("/company", companyRouter);
app.use(errlogger);

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});

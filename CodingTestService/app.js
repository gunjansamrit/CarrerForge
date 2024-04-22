const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const db = require('./dbConnection');
const cors = require('cors');

const studentRouter = require('./routes/studentRouter');

const companyRouter = require('./routes/companyRouter');
const errlogger =require('./utils/errHandler');
const port = 3003;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Include this if you're using cookies or sessions
  }));

app.use('/company', companyRouter);
app.use('/student', studentRouter);
app.use(errlogger);

app.listen(port, () => {console.log(`Server started on port ${port}!`)});

const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const db = require('./dbConnection');

const companyRouter = require('./routes/companyRouter');
const studentRouter = require('./routes/studentRouter');

const errlogger =require('./utils/errHandler')
const port = 3002;

app.use(express.json());


app.use('/student', studentRouter);
app.use('/company', companyRouter);
app.use(errlogger);

app.listen(port, () => {console.log(`Server started on port ${port}!`)});

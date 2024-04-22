const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const db = require('./dbConnection');

const adminRouter = require('./routes/adminRouter');
const errlogger =require('./utils/errHandler');
const port = 3001;

app.use(express.json());


app.use('/admin', adminRouter);
app.use(errlogger);

app.listen(port, () => {console.log(`Server started on port ${port}!`)});

const fs = require('fs');

const errlogger = (err, req, res, next) => {
    const { path, method } = req;
    const timestamp = new Date(); // Corrected typo

    console.log("errorLogger",err.stack); // Corrected variable name

    const data = `${err.message} ${path} ${method}\n`; // Corrected variable name and added correct line break
    console.log("errorLogger",data);
    fs.appendFile('./errorLogs.txt', data, (logerror) => {
        if (logerror) {
            console.log(logerror);
        } else {
            const { message="request Failed", status=500 } = err;
            res.status(status);
            res.send({ message, success: false });
        }
    });
};

module.exports = errlogger; // Corrected export statement

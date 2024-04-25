var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'careerforge@gmail.com',
    pass: 'CareerForge@26'
  }
});

var mailOptions = {
  from: 'gunjansamrit613@gmail.com',
  to: 'varshasamrit83@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
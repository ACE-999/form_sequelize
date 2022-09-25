var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adityap129btechcse2023@kccitm.edu.in',
      pass: 'adityaPrakash123'
    },
  });
  
module.exports=transporter;
var nodemailer = require('nodemailer');

//turn on less secure apps access to use gmail.
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adityap129btechcse2023@kccitm.edu.in',
      pass: 'adityaPrakash123'
    },
  });
  
module.exports=transporter;
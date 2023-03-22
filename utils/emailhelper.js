const nodemailer = require("nodemailer")
require("dotenv").config()
const sendEmail=async (option)=>{

    let transporter = nodemailer.createTransport({
        host: process.env.Mail_Host,
        port:process.env.Mail_PORT,
        auth: {
          user: process.env.Mail_User, // generated ethereal user
          pass: process.env.Mail_Pass, // generated ethereal password
        },
      });

      MessageChannel=  {
            from: "mdmubarak78625@gmail.com", // sender address
            to: option.email, // list of receivers
            subject:option.subject, // Subject line
            text: option.message, // plain text body
          }
    
    await transporter.sendMail(MessageChannel);

}


module.exports = sendEmail
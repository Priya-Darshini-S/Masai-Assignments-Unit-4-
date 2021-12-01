const nodemailer = require("nodemailer");
module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "67ea59f0872472",
      pass: "8d415d0e55f4ec",
    },
  });



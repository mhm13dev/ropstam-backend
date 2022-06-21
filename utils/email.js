const nodemailer = require("nodemailer");

const transportOptions = {
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(transportOptions);

// verify connection configuration
transporter.verify(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email Server is ready to take our messages");
  }
});

function sendSignupMail({ user, password }) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: user.email,
    subject: "Ropstam - Signup Successful",
    html: `
        <h1>Hi 👋</h1>
        <p>You have successfully signed up for Ropstam Test. Below are your credentials:</p>
        <p><strong>Email</strong>: ${user.email}</p> 
        <p><strong>Password</strong>: ${password}</p> 
    `,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = { sendSignupMail };

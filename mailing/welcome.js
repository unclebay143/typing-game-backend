var nodemailer = require("nodemailer");

// Function to send welcome mail
exports.sendWelcomeMail = (receiver, receiverAddress) => {
  // Send mail authentication -gmail
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTHOR_EMAIL_ADDRESS,
      pass: process.env.AUTHOR_EMAIL_PASSWORD,
    },
  });

  // Mail contents
  var mailOptions = {
    from: "Developer Typing Game Creator -unclebigbay 👲",
    to: receiverAddress,
    subject: "Welcome on Board 👋",
    html: `Hi ${receiver}, we are glad you joined <strong>10+ developers</strong> using DevType to improve their typing speed. 
    <br />
    <br />
    Wishing you a warm ride on our platform 🚀.
    <br />
    <br />
    Thanks,
    <br />
    Ayodele Samuel Adebayo (unclebigbay) <br />
    - Founder DevType
    `,
  };

  // Send out mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

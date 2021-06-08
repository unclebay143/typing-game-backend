var nodemailer = require("nodemailer");

// Function to encrypt password - output pass****
const generatePasswordStar = (password) => {
  let passLength = password.length;
  const generateStar = new Array(passLength - 4).fill("*").join("");
  const encryptedPassword = password.slice(0, 4) + generateStar;
  console.log(encryptedPassword);
  return encryptedPassword;
};

// Function to send welcome mail
exports.sendWelcomeMail = (receiver, receiverAddress, receiverPassword) => {
  const encryptedReceiverPassword = generatePasswordStar(receiverPassword);
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
    html: `We are glad you joined <strong>10+ developers</strong> using DevType to improve their typing speed. 
    I am going to leave your login credentials here for referencing 
    <br />
    <ul>
        <li>Username: ${receiver}</li>
        <li>Email: ${receiverAddress}</li>
        <li>Password: ${encryptedReceiverPassword}</li>
    </ul>

    Wishing you a warm ride on our platform 🚀.
    <br />
    <br />
    Thanks,
    <br />
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
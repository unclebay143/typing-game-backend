require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_APP_CLIENT_ID,
    process.env.GOOGLE_APP_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_APP_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    try {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(" + err);
        }
        resolve(token);
      });
    } catch (error) {
      console.log(error);
    }
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.AUTHOR_EMAIL_ADDRESS,
      accessToken,
      clientId: process.env.GOOGLE_APP_CLIENT_ID,
      clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_APP_REFRESH_TOKEN,
    },
  });

  return transporter;
};

exports.sendEmail = async (receiver, receiverAddress) => {
  // Mail contents
  var mailOptions = {
    from: "Developer Typing Game Creator -unclebigbay 👲",
    to: receiverAddress,
    subject: "Welcome on Board AppMode-Testing-V2 👋",
    // subject: "Welcome on Board 👋",
    html: `Hi ${receiver}, we are glad you joined <strong>10+ developers</strong> using DevType to improve their typing speed. 
        <br />
        <br />
        Wishing you a warm ride on our platform 🚀.
        <br />
        <br />
        Thanks,
        <br />
        <i>This is a development email to testers -kindly report bugs to developer</i>
        <br />
        Ayodele Samuel Adebayo (unclebigbay) <br />
        - Founder DevType
        `,
  };

  try {
    let emailTransporter = await createTransporter();
    emailTransporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    return console.log(error);
  }
};

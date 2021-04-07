var nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const config = require("../../config/config");

sgMail.setApiKey(config.emailAuth.api);

module.exports = {
  async sendEmail({ email, subject, content }) {
    // var transporter = nodemailer.createTransport({
    //   service: "SendGrig",
    //   auth: config.emailAuth,
    // });

    // var mailOptions = {
    //   from: config.emailAuth.user,
    //   to: email,
    //   subject: subject,
    //   text: content,
    // };

    const msg = {
      to: email,
      from: config.emailAuth.user,
      subject: subject,
      text: content,
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    // sgMail.send(msg);
    // const response = await transporter.sendMail(mailOptions);
    const response = sgMail.send(msg);

    return response;
  },
};

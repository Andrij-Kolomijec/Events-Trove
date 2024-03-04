const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" });

function dateFormatter(date) {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return formattedDate;
}

async function send(email, id, event) {
  const html = !event
    ? `<h3>Hello there new subscriber!</h3><p>Thank you for subscribing to our newsletter, you will be notified when a new event is added.</p><br><p><p>Click <a href=${
        process.env.UNSUBSCRIBE + id
      }>here</a> to unsubscribe.</p>`
    : `<h3>Hello there Events Trove subscriber!</h3><p>There was a new event added - ${
        event.title
      }, ${dateFormatter(event.date)}.</p><br><p>Description:</p><p>${
        event.description
      }</p><br><p>Or check it out on the <a href=${
        process.env.EVENT + event.id
      }>Events Trove page</a>.</p><br>
      
    <p>Click <a href=${
      process.env.UNSUBSCRIBE + id
    }>here</a> to unsubscribe.</p>`;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `Events Trove<${process.env.EMAIL}>`,
      to: email,
      subject: "Newsletter",
      html: html,
    });

    console.log("Successful: " + info.accepted);
    console.log("Unsuccessful: " + info.rejected);
  } catch (error) {
    console.error("Error sending email(s):", error);
  }
}

async function sendEmail(subscribers, event = null) {
  console.log(subscribers);

  await subscribers.map((subscriber) =>
    send(subscriber.email, subscriber._id, event)
  );
}

module.exports = sendEmail;

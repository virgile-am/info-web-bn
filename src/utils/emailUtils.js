import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS, 
  },
});


/**
 * Send an email notification when a message is received.
 * @param {Object} messageDetails - The details of the message.
 * @param {string} messageDetails.name - The sender's name (user-provided).
 * @param {string} messageDetails.email - The sender's email (user-provided).
 * @param {string} messageDetails.subject - The subject of the message (user-provided).
 * @param {string} messageDetails.message - The message content (user-provided).
 */
export const sendEmailNotification = async ({ name, email, subject, message }) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Message Notification</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="/assets/mainlogos.png" alt="Your Logo" style="max-width: 200px; height: auto;">
      </div>
      <div style="background-color: #f4f4f4; border-radius: 5px; padding: 20px;">
        <h1 style="color: #0056b3;">New Message Received</h1>
        <p>You have received a new message with the following details:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Subject:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${subject}</td>
          </tr>
        </table>
        <h2 style="color: #0056b3; margin-top: 20px;">Message:</h2>
        <p style="background-color: #fff; padding: 15px; border-radius: 5px;">${message}</p>
      </div>
      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
        <p>This is an automated message. Please do not reply to this email.</p>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,  
    to: 'virgile405@gmail.com',
    subject: `New message from ${name}: ${subject}`,
    html: htmlTemplate,
    text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`, // Plain text fallback
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
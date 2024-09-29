import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendUserCreationEmail = async ({ username, email, password }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,  
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your account has been created',
      text: `Hello ${username},\n\nYour account has been created successfully. Below are your login credentials:\n\nUsername: ${email}\nPassword: ${password}\n\nPlease change your password after your first login.\n\nBest regards,\nYour Company`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

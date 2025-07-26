const express = require('express');
const nodemailer = require('nodemailer');
const { authenticate } = require('../middleware/authController');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nishansingh2480@gmail.com',
    pass: 'iedgvupemhpqjxvs', 
  },
});


router.post('/', authenticate, (req, res) => {
  const { movieName } = req.body;
  const email = req.user.email;

  const mailOptions = {
    from: 'nishansingh2480@gmail.com',
    to: email, 
    subject: `🎬 Rental Confirmation: ${movieName} Booked Successfully`, 
    text: `Hello,
    
  
  Thank you for renting *${movieName}* from MovieVault! 🎉
  
  Your rental has been successfully processed. You can now enjoy your movie anytime from your account dashboard.
  
  If you have any questions, feel free to contact our support team.
  
  Happy watching! 🍿
  
  - The MovieVault Team`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(200).json({ message: "done" });
  });
});

module.exports = router;

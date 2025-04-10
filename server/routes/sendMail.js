const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nishansingh2480@gmail.com',
    pass: 'gkvvddhrynsqbbel',
  },
});

router.post('/', (req, res) => {
  const {movieName} = req.body;
  const { email } = req.user.email;

  const mailOptions = {
    from: 'nishansingh2480@gmail.com',
    to: email,
    subject: `Successfully rented ${movieName}`,
    text: `Your OTP for registration is: ${123456}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(200).json({message:"done"});
  });
});

module.exports = router;
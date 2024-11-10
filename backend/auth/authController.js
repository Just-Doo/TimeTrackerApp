import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/connection.js';
import sendSMS from '../services/smsServices.cjs';

const router = express.Router();

// Register endpoint
router.post('/verify-phone', async (req, res) => {
    console.log("Received request to /verify-phone");

    const { phoneNumber } = req.body;
  
    try {
      // Send verification SMS
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      await sendSMS(phoneNumber, ``, `[${verificationCode}] 일단 해, 테스크타이머 `);
  
      res.status(200).send('Verification code sent successfully.');
    } catch (error) {
      console.error('Error sending verification code:', error);
      res.status(500).send('Server error');
    }
});
  
export default router;

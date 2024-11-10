import express from 'express';
import connection from '../db/connection.js';

const router = express.Router();

// End a task
router.post('/hi', (req, res) => {
    console.log("hi");
   
    return res.status(200).json({ 
        message: "Authorized" 
    });
});

export default router;
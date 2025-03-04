import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body;
    // Add your chatbot logic here
    res.json({ message: "I'm a simple chatbot. Advanced AI features coming soon!" });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
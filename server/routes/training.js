import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import TrainingSession from '../models/TrainingSession.js';

const router = express.Router();

// Get all trainers
router.get('/trainers', auth, async (req, res) => {
  try {
    const trainers = await User.find({ role: 'trainer' })
      .select('name specialty');
    res.json(trainers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Book a training session
router.post('/book', auth, async (req, res) => {
  try {
    const { trainerId, date, time, trainingType } = req.body;

    // Validate the booking time (you can add more validation as needed)
    const bookingDate = new Date(`${date}T${time}`);
    if (bookingDate < new Date()) {
      return res.status(400).json({ message: 'Cannot book sessions in the past' });
    }

    // You might want to check trainer availability here
    const trainer = await User.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    // Check if trainer is available at the requested time
    const existingSession = await TrainingSession.findOne({
      trainerId,
      date: bookingDate,
      status: { $ne: 'cancelled' }
    });

    if (existingSession) {
      return res.status(400).json({ message: 'Trainer is not available at this time' });
    }

    // Create a new booking
    const booking = new TrainingSession({
      userId: req.user.userId,
      trainerId,
      date: bookingDate,
      trainingType,
      status: 'pending' // pending, confirmed, cancelled
    });

    await booking.save();

    res.status(201).json({
      message: 'Training session booked successfully',
      booking
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's training sessions
router.get('/my-sessions', auth, async (req, res) => {
  try {
    const sessions = await TrainingSession.find({ userId: req.user.userId })
      .populate('trainerId', 'name')
      .sort({ date: 1 });
    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
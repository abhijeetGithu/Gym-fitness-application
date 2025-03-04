import express from 'express';
import auth from '../middleware/auth.js';
import Attendance from '../models/Attendance.js';

const router = express.Router();

// Get attendance history
router.get('/', auth, async (req, res) => {
  try {
    const attendance = await Attendance.find({ userId: req.user.userId })
      .sort({ date: -1 });
    res.json(attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark attendance
router.post('/', auth, async (req, res) => {
  try {
    const { date } = req.body;
    
    // Check if attendance already marked for this date
    const existingAttendance = await Attendance.findOne({
      userId: req.user.userId,
      date: new Date(date)
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already marked for this date' });
    }

    const attendance = new Attendance({
      userId: req.user.userId,
      date: date || new Date()
    });

    await attendance.save();
    res.json(attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
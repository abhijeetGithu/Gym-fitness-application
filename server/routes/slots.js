import express from 'express';
import auth from '../middleware/auth.js';
import Slot from '../models/Slot.js';

const router = express.Router();

// Get all slots
router.get('/', auth, async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Book a slot
router.post('/book/:slotId', auth, async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slot.currentMembers.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already booked this slot' });
    }

    if (slot.currentMembers.length >= slot.capacity) {
      return res.status(400).json({ message: 'Slot is full' });
    }

    slot.currentMembers.push(req.user.id);
    await slot.save();

    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Initialize slots
router.post('/initialize', auth, async (req, res) => {
  try {
    // Delete existing slots
    await Slot.deleteMany({});

    // Morning slots
    const morningSlots = [
      {
        name: 'Morning Session 1',
        startTime: '5:00',
        endTime: '6:30',
        capacity: 20,
        currentMembers: []
      },
      {
        name: 'Morning Session 2',
        startTime: '6:30',
        endTime: '8:00',
        capacity: 20,
        currentMembers: []
      }
    ];

    // Evening slots
    const eveningSlots = [
      {
        name: 'Evening Session 1',
        startTime: '16:00',
        endTime: '17:30',
        capacity: 20,
        currentMembers: []
      },
      {
        name: 'Evening Session 2',
        startTime: '17:30',
        endTime: '19:00',
        capacity: 20,
        currentMembers: []
      },
      {
        name: 'Evening Session 3',
        startTime: '19:00',
        endTime: '20:00',
        capacity: 20,
        currentMembers: []
      }
    ];

    // Create all slots
    await Slot.insertMany([...morningSlots, ...eveningSlots]);

    res.json({ message: 'Slots initialized successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
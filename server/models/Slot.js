import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    default: 20
  },
  currentMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Slot', slotSchema);
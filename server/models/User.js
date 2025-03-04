import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'trainer', 'admin'],
    default: 'user'
  },
  specialty: {
    type: String,
    required: function() {
      return this.role === 'trainer';
    }
  },
  membershipStatus: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  },
  assignedSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot'
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
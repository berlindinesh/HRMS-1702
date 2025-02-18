import mongoose from 'mongoose';

const rotatingWorktypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  employeeCode: {
    type: String,
    required: true
  },
  requestedWorktype: {
    type: String,
    required: true,
    enum: ['Full Time', 'Part Time', 'Contract']
  },
  currentWorktype: {
    type: String,
    default: 'Regular'
  },
  requestedDate: {
    type: Date,
    required: true
  },
  requestedTill: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  description: String,
  isPermanentRequest: {
    type: Boolean,
    default: false
  },
  isAllocated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('RotatingWorktype', rotatingWorktypeSchema);

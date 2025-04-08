import mongoose from 'mongoose';

const leaveBalanceSchema = new mongoose.Schema({
  employeeCode: {
    type: String,
    required: true,
    unique: true
  },
  annual: {
    total: { type: Number, default: 15 },
    used: { type: Number, default: 0 },
    pending: { type: Number, default: 0 }
  },
  sick: {
    total: { type: Number, default: 12 },
    used: { type: Number, default: 0 },
    pending: { type: Number, default: 0 }
  },
  personal: {
    total: { type: Number, default: 5 },
    used: { type: Number, default: 0 },
    pending: { type: Number, default: 0 }
  },
  maternity: {
    total: { type: Number, default: 90 },
    used: { type: Number, default: 0 },
    pending: { type: Number, default: 0 }
  },
  paternity: {
    total: { type: Number, default: 15 },
    used: { type: Number, default: 0 },
    pending: { type: Number, default: 0 }
  },
  casual: {
    total: { type: Number, default: 12 },
    used: { type: Number, default: 0 },
    pending: { type: Number, default: 0 }
  },
  earned: {
    total: { type: Number, default: 0 },
    used: { type: Number, default: 0 },
    pending: { type: Number, default: 0 }
  },
  lastAccrualDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('LeaveBalance', leaveBalanceSchema);

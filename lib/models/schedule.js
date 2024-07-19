import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Please provide a date'],
  },
  amountMl: {
    type: Number,
    required: [true, 'Please provide an amount in ml'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
});

export default mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema);

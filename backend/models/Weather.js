import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  location: String,
  temperature: Number,
  description: String,
  icon: String,
  date: Date
});

export default mongoose.model('Weather', weatherSchema);
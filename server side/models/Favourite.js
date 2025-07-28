import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // city name
});

export default mongoose.model('Favourite', favoriteSchema);

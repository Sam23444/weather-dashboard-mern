import mongoose from 'mongoose';

const connectDB = async () => {


    if (!process.env.MONGODB_URI) {
      throw new Error('❌ MONGODB_URI is not defined in .env file');
    }

    // ✅ Use the URI as is (do not append `/WORK` unless required)
    await mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully');
    });
  
};

export default connectDB;

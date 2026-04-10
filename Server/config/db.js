import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // This line actually "calls" MongoDB using the URI from your .env
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Connection Error: ${error.message}`);
    process.exit(1); // Stop the server if the connection fails
  }
};

export default connectDB;
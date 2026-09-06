import mongoose from 'mongoose';

async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB database connected")
    } catch (error) {
        console.log("❌ MongoDB Connection Error");
        process.exit(1);
    }
}

export default ConnectDB;
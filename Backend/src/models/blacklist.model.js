import mongoose from 'mongoose';

const blackListTokenSchema = new mongoose.Schema(
    {
        token: {
            type:String,
            required:[true,"token is required to be added in blacklist"]
        }
    },
    {
        timestamps:true
    }
)

export const BlackListToken = mongoose.model("BlackListToken",blackListTokenSchema);
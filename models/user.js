import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// export const userModel = mongoose.model("user", userSchema); // short way
const userModel =  mongoose.model("user", userSchema);
export default userModel;
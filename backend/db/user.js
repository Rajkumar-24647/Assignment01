import { Schema } from "mongoose";
import mongoose from "mongoose";


export const ConnectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connnected")
    } catch (error) {
        console.error("DB connection failed", error)
        process.exit(1);
    }
}


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export const UserModel = mongoose.model("User", UserSchema)

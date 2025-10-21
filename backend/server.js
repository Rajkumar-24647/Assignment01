import express from 'express'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { SignupSchema } from './Schemas/SignupSchema.js';
import { UserModel } from './db/user.js';
import { ConnectDB } from './db/user.js';
import { userAuthRouter } from './routes/userAuth.js';

const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use("/user", userAuthRouter)






(async() => {
    try {
        await ConnectDB();
        app.listen(PORT, () => {
            console.log(`Server is alive...`)
        })
    } catch (error) {
        console.error("Connection to DB failed....", error)
        process.exit(1);
    }

})();
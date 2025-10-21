import express from 'express'

export const userAuthRouter = express.Router();




userAuthRouter.post("/signup", async(req, res) => {

    const resultData = SignupSchema.safeParse(req.body);

    if(!resultData){
        res.send({
            msg: "All fields are required in proper formate"
        })
        return;
    }
    const parsedData = resultData.data;

    try {
        const ExistedUserWithEmail = await UserModel.findOne({
        email:  parsedData.email
    })
    if(ExistedUserWithEmail){
        res.send({
            msg: "User already exist with this email"
        })
        return;
    }

    const ExistedUserWithUsername =  await UserModel.findOne({
        username: parsedData.username
    })

    if(ExistedUserWithUsername){
        res.send({
            msg: "This username already exists"
        })
        return;
    }

    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    const user = await UserModel.create({
        name: parsedData.name,
        username: parsedData.username,
        email: parsedData.email,
        password: hashedPassword
    })

    return res.status(200).send({
        msg: "User successfully signedUp"
    })
    } catch (error) {
        console.error("Signup error is here", error)
    }  
})

userAuthRouter.post("/signin", async(req, res) => {

    const {email, password} = req.body;

    if(!email || !password){
        res.send({
            msg: "All inputs fields are required..."
        })
        return
    }

   try {
     const user =  await UserModel.findOne({email: email});
    if(!user){
        res.send({
            msg: "User not found with this email"
        })
        return;
    }

    const MatchedPassword = bcrypt.compare(password, user.password);

    if(MatchedPassword){
        const token = jwt.sign({
            userId: user._id
    },process.env.JWT_SECRET, {expiresIn: "15d"})
    return res.json({
        token: token
    })
    }else{
        res.json({
            msg: "Invalid Credentials..."
        })
    }
   } catch (error) {
    console.error("Something went wrong", error)
   }

})

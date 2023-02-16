import express from 'express';
import bcrypt from "bcryptjs";
import {  body, validationResult } from 'express-validator';

const userRouter:express.Router = express.Router();

userRouter.get('/', (req:express.Request, res:express.Response)=>{
    res.status(200).send(`<h3 style='color: green'>Welcome to Express User Router</h3>`)
})

userRouter.post('/login', (req:express.Request, res:express.Response)=>{
    let formData = req.body;
    res.status(200).json({data: formData})
})
userRouter.post('/logger',
body('email').isEmail(),
body('password').isLength({ min: 5 }),
async (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let {name, email, password} = req.body;
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt)
        res.status(200).json({user: {name, email, hashedPassword}})
    }catch(err){
        next(err)
    }
})


export default userRouter
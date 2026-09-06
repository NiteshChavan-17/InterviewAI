import {User} from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { BlackListToken } from '../models/blacklist.model.js'

async function registerUserController(req, res) {

    const {username, email, password} = req.body

    if(!username || !email || !password) {
        return res.status(400).json({
            message: "Please Provide username, email and password"
        })
    }

    const isUserAlreadyExists = await User.findOne({
        $or: [{username}, {email}]
    })

    if(isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account Already exists with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await User.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        {
            id: user._id, 
            username: user.username,
        },

        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token)

    res.status(201).json({
        message:"User Registerd Successfully",
        user: {
            id: user._id,
            username:user.username,
            email:user.email
        }
    })
}

async function loginUserController(req,res) {

    const {email, password} = req.body;

    const user = await User.findOne({
        email
    })

    if(!user) {
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            email:user.username,
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
        
    )

    res.cookie("token",token);
    res.status(200).json({
        message:"User Logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

async function logoutUserController(req,res) {
    const token = req.cookies.token;

    if(token) {
        await BlackListToken.create({token})
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "User logged out successfully"
    })
}

async function getMeController(req,res) {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        message: "User details fetched succesfully",
        user: {
            id: user._id,
            username:user.username,
            email:user.email
        }
    })
}

export default registerUserController
export {loginUserController}
export {logoutUserController}
export {getMeController}
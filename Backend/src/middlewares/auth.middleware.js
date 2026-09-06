import jwt from 'jsonwebtoken'
import { BlackListToken } from '../models/blacklist.model.js';
import { User } from '../models/user.model.js';

async function authUser(req,res,next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message:"Token not provided"
        })
    }

    const istokenBlackListed = await User.findOne({token})

    if(istokenBlackListed) {
        return res.status(401).json({
            message: "Token is Invalid"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err) {
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

export default authUser
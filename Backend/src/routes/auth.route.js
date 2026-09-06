import express from 'express'
import registerUserController, { logoutUserController } from '../controllers/auth.controller.js'
import { loginUserController } from '../controllers/auth.controller.js';
import authUser from '../middlewares/auth.middleware.js';
import { getMeController } from '../controllers/auth.controller.js';

const authRouter = express.Router(); 

authRouter.post('/register', registerUserController)
authRouter.post("/login", loginUserController)
authRouter.get('/logout', logoutUserController)
authRouter.get('/get-me',authUser,getMeController)

export default authRouter;
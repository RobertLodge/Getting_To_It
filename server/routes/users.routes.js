import { Router } from "express";
import UserController from "../controllers/users.controller.js";

const userRouter = Router()

userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)
userRouter.post('/logout', UserController.logout)
userRouter.get('/:id', UserController.getLoggedInUser)
userRouter.get('/get_all', UserController.getAllUsers)
export default userRouter;
import User from '../models/users.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const UserController = {
    //Create user
    register : async (req, res, next) => {
        try{
            console.log(req.body)
            const newUser = await User.create(req.body)
            const userToken = jwt.sign(
                {userId: newUser._id, username: newUser.username},
                process.env.SECRET_KEY
            )
            console.log(userToken)
            res.cookie('userToken', userToken, {httpOnly: true})
            return res.status(201).json(newUser)
        }catch(error){
            console.log(error)
            next(error)
        }
    },

    //Login and check if user exists. 
    login : async (req, res, next) => {
        try{
            const {email, password} = req.body
            //check user exists via email
            const potentialUser = await User.findOne({email : email})
            if(!potentialUser) {
                return res.status(404).json({message : { email: 'User not found'}})
            }

            //check password
            console.log(password, potentialUser);
            const isPasswordCorrect = await bcrypt.compare(password, potentialUser.password)
            if(!isPasswordCorrect) {
                return res.status(400).json({message : {password: 'Invalid Password'}})
            }

            //log user in 
            const userToken = jwt.sign(
                {userId:potentialUser._id, username:potentialUser.username},
                process.env.SECRET_KEY
            )
            console.log(userToken)
            res.cookie('userToken', userToken, {httpOnly:true})
            return res.status(201).json(potentialUser)
        }catch(error){
            console.log(error)
            next(error)
        }
    },

    logout : async (req, res, next) => {
        try{
            res.clearCookie('userToken')
            return res.status(200).json({message : 'Logged out Successful!'})
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    
    getLoggedInUser : async (req, res, next) => {
        try{
            const user = await User.findById(req.params.id)
            return res.status(200).json(user)
        }catch(error){
            console.log(error)
            next(error)
        }
    },
    
    getAllUsers : async (req, res, next) => {
        try{
            const allUsers = await User.find()
            return res.status(200).json(allUsers)
        }catch(error){
            console.log(error)
            next(error)
        }
    }
}

export default UserController;
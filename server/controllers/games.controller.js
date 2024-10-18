import Game from '../models/games.model.js'
import jwt from 'jsonwebtoken'


const gameController = {
    //Create Games
    createGame : async (req, res, next) => {
        try{
            const decodedToken = jwt.decode(req.cookies.userToken, {complete: true})
            console.log(decodedToken)
            const userId = decodedToken.payload.userId
            const newGame = {... req.body, userId}
            const game = await Game.create(newGame)
            return res.status(201).json(game)
        }catch (error){
            console.log(error)
            next(error)
        }
    },
    
    //Read All
    getAllGames: async (req, res, next) => {
        try{
            const allGames = await Game.find().populate('userId')
            res.status(200).json(allGames)
        }catch (error){
            console.log(error)
            next(error)
        }
    },

    //Read one
    getOneGame: async (req, res, next) => {
        try{
            const oneGame = await Game.findById(req.params.id).populate('userId')
            res.status(200).json(oneGame)
        }catch (error){
            console.log(error)
            next(error)
        }
    },

    //Update
    updateGame: async (req, res, next) => {
        const options = {
            new: true,
            runValidators:true,
        }
        try{
            const gameId = req.params.id
            const updatedGame = await Game.findByIdAndUpdate(
                gameId,
                {
                    name : req.body.name,
                    genre : req.body.genre,
                    time_to_beat : req.body.time_to_beat,
                    isUnderHour : req.body.isUnderHour,
                    isEndless : req.body.isEndless,
                    isCompleted : req.body.isCompleted,
                    $set : {userId : req.body.userId}
                },
                options
            )
            return res.status(200).json(updatedGame)
        }catch (error){
            console.log(error)
            next(error)
        }
    },

    //Delete
    deleteGame: async (req, res, next) => {
        try{
            const deleteGame = await Game.findByIdAndDelete(req.params.id)
            res.status(200).json(deleteGame)
        }catch (error){
            console.log(error)
            next(error)
        }
    },
}

export default gameController;
import { Router } from 'express'
import gameController from '../controllers/games.controller.js'
import authenticate from '../config/jwt.config.js'


const gameRouter = Router()

gameRouter.route("/", authenticate)
    .get(gameController.getAllGames)

gameRouter.route("/randomizer")
    .get(gameController.getAllGames)

gameRouter.route("/:id", authenticate)
    .get(gameController.getOneGame)
    .put(gameController.updateGame)
    .delete(gameController.deleteGame)

gameRouter.route("/add", authenticate)
    .post(gameController.createGame)
gameRouter.route("/create", authenticate)
    .get(gameController.createGame)

export default gameRouter
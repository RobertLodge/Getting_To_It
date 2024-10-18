import {model, Schema} from 'mongoose'

const GameSchema = new Schema (
    {
        name : {
            type: String,
            required: [true, "Game's name is required"],
            minlength:[2, "Must be a minimum of 2 characters"],
            maxlength:[100, "Must be less than 100 characters"]
        },
        genre : {
            type: String,
            required: [true, "Game's genre is required"],
            minlength:[2, "Must be a minimum of 2 characters"],
            maxlength:[100, "Must be less than 100 characters"]
        },
        time_to_beat : {
            type: Number,
            required:[true, "Time to beat game is required"],
            min:[1, "If time is less than 1 hour, select less than 1 hour option"],
            max:[999, "If time exceeds 999 hours to beat, select endless option"]
        },
        isUnderHour : {
            type: Boolean,
            default: false
        },
        isEndless : {
            type: Boolean,
            default: false
        },
        isCompleted : {
            type: Boolean,
            default: false
        },
        userId : {
            type : Schema.Types.ObjectId,
            ref : 'User', 
            required : [true, ' User Id is required']
        }
    },
    {timestamps:true}
)
const Game = model('Game', GameSchema)
export default Game;
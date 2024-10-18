import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET_KEY

const authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, SECRET, (err, payload) => {
        if(err){
            res.status(401).json({verified: false})
        }else{
            next()
        }
    })
}

export default authenticate;
import jwt from "jsonwebtoken"
const SECRETKEY = "clave"

const generateToken = async (data) => {
   
    const payload = {
        nombre: data.nombre,
        password: data.password
    }
 
    const tkn = await jwt.sign(payload, SECRETKEY, { expiresIn: '5m'})
    return tkn
}


const verifyToken = async (req, res, next) => {
 
    const tkn = req.body
    const decoded = await jwt.verify(tkn, SECRETKEY)
    if(!decoded) res.status(401).json({message: "Token inválido."})

    next()
}

export default {
    generateToken,
    verifyToken
}
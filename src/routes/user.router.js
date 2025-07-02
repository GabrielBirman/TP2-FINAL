import UsersController from "../controller/user.controller.js"
import express from "express"
import authMiddleware from "../middlewares/auth.js"

class Router {
    constructor() {
        this.controller = new UsersController()
        this.router = express.Router()
    }

    start(){
     
        this.router.post("/login", this.controller.loginUser)
        this.router.get("/",  this.controller.getUsers)
        this.router.post("/", this.controller.createUsuario)
        this.router.put("/update/all/:id", this.controller.putUsers)
        this.router.patch("/update/:id", this.controller.patchUsers)
        this.router.delete("/:id", this.controller.deleteUsers)

        return this.router
    }
}

export default Router
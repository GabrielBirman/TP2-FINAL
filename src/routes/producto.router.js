// src/route/producto.router.js

import express from 'express'
import productController from "../controller/producto.controller.js"
import { Router } from 'express'

class productoRouter{
    
    constructor(){
        this.controller = new productController()
        this.router = express.Router()
    }
    start () {
        this.router.get("/", this.controller.getProductos)
        this.router.post("/", this.controller.createProducto)
        this.router.put("/update/all/:id", this.controller.putProducto)
        this.router.patch("/update/:id", this.controller.patchProducto)    
        this.router.delete("/:id", this.controller.deleteProducto)
        return this.router
    }
    
}
export default productoRouter


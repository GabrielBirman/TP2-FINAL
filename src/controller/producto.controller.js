// src/controller/producto.controller.js

import productService from "../service/producto.service.js";

class productController {
    constructor() { this.service = new productService() }

    getProductos = async (req, res) => {
        const allProductos = await this.service.getProductos()
        if (allProductos) {
            res.status(200).send(allProductos)
        } else {
            res.status(204).send("no content")
        }
    }

    createProducto = async (req, res) => {
        const producto = req.body
        try {
            const postedProducto = await this.service.createProducto(producto)
            res.status(201).send(postedProducto)
        } catch (error) {


            if (error.codigo === 400 && error.detalles) {
                console.error(error.detalles)
                res.status(400).json({
                    mensaje: error.mensaje || "error de validación",
                    errores: error.detalles
                })
            } else {
                console.error("Error interno:", error)
                res.status(500).json({
                    mensaje: "Error interno del servidor",
                    detalle: process.env.NODE_ENV === "development" ? error.message : undefined
                })
            }
        }
    }
    putProducto = async (req, res) => {
        const id = req.params.id
        const data = req.body
        const update = await this.service.putProducto(id, data)
        if (update) {
            res.status(200).send(update)
        } else {
            res.status(404).send("not found")
        }
    }
    patchProducto = async (req, res) => {
        const id = req.params.id
        const data = req.body
        const update = await this.service.patchProducto(id, data)
        if (update) {
            res.status(200).send(update)
        } else {
            res.status(404).send("not found")
        }
    }
    deleteProducto = async (req, res) => {
        const id = req.params.id
        const productoDelete = await this.service.deleteProducto(id)
        if (productoDelete) {
            res.status(200).send(productoDelete)
        } else {
            res.status(404).send("not found")
        }
    }




}
export default productController
// src/model/DAO/product.model.fs.js

import fs from 'fs'

class productoModelFs {
    constructor() {
        this.path = "./src/data/productoFs.json"
    }

    getProductos = async () => {

        const allProductos = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(allProductos)

    }
    saveProducto = async (producto) => {
        const productos = await this.getProductos()
        productos.push(producto)
        await this.saveAllProductos(productos)
        return producto
    }

    saveAllProductos = async (productos) => {
        await fs.promises.writeFile(this.path, JSON.stringify(productos,null,2), "utf-8")

    }
}

export default productoModelFs
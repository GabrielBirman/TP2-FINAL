// src/model/DAO/product.model.memory.js

class productoModelMemory {

    constructor() {
        this.allProductos = [{ id: 1, nombre: "paracetamol", precio: 100, prueba }]
    }

    getProductos() {
        return this.allProductos
    }

}

export default productoModelMemory
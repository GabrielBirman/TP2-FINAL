// src/model/factory.model.js

import productoModelFs from "./DAO/producto.model.fs.js"
import productoModelMemory from "./DAO/producto.model.memory.js"
import productoModelMongo from "./DAO/producto.model.mongo.js"


class factoryModel{
    static get (persistence){
        switch (persistence) {
            case "fs":
                console.log("persistencia en archivo con FS")
                return new productoModelFs()

            case "mem":
                console.log("persistencia en memoria")
                return new productoModelMemory()    
            
            case "mongo":
                console.log("Persistiendo en MongoDB")
                return  new productoModelMongo() 

            
        
            default:
                console.log("persistencia por default: memoria")
                return new productoModelFs()
        }

    }
}
export default factoryModel
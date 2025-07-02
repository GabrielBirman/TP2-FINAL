import MongoConnection from "../mongoConnection.js"
import mongoConnection from "../mongo.connection.js"
import { ObjectId } from "mongodb"

class UsersModelMongo {
    constructor() {
        this.db = mongoConnection.db
    }

    loginUser = async (nombre, password) => {
        const user = await this.db.collection("usuarios").findOne({ nombre, password })
        return user
    }

    postUsers = async (user) => {
        const newUser = await this.db.collection("usuarios").insertOne(user)
        return newUser
    }

     getUsers= async () => {
        const users = await this.db.collection("usuarios").find({}).toArray()
        return users
    }

    putUsers = async (id, data) => {
        const update = await this.db.collection("usuarios").replaceOne(
            { _id: ObjectId.createFromHexString(id) }, data
        )
        return update
    }
 
    patchUsers = async (id, data) => {
        const update = await this.db.collection("usuarios").updateOne(
            { _id: ObjectId.createFromHexString(id) },
            { $set: data }
        )
        return update
    }

    deleteUsers = async (id) => {
        const userDelete = await this.db.collection("usuarios").deleteOne(
            { _id: ObjectId.createFromHexString(id) }
        )
        return userDelete
   
    }

    getUserByNombre = async (username) => {
        const user = await this.db.collection("usuarios").findOne({ username })
        return user
    }

}

export default UsersModelMongo

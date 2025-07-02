import userModelMongo from "./DAO/user.model.mongo.js"


class factoryUserModel{
    static get (persistence){
        switch (persistence) {
             
            case "mongo":
                console.log("Persistiendo en MongoDB")
                return  new userModelMongo() 

            default:
                console.log("Persistiendo en memoria")
                return  new userModelMongo()
         

    }
}
}
export default factoryUserModel
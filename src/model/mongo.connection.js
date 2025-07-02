import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()
let uri = process.env.BASE_EMI_URI;
let client = process.env.BASE_EMI_CLIENT

class mongoConnection {

    static client = new MongoClient(uri)
    
    static db = this.client.db(client)

    static connection = async () => {
        await this.client.connect()
    }
}

export default mongoConnection
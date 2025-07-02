import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()

let uri = process.env.BASE_LEO_URI 
let client = process.env.BASE_LEO_CLIENT


class MongoConnection { 

  
static client = new MongoClient(uri);
static db = this.client.db("tp2tpfinal");

static connection = async () => {
   await this.client.connect();
  }

}
export default MongoConnection;
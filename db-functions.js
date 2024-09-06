import { MongoClient } from "mongodb";

export  async function getDataBase(){
    let client = new MongoClient("mongodb://127.0.0.1:27017")
    let connection = await client.connect();
    let db = connection.db("lucifer");
    return db;
}
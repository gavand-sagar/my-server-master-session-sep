import { MongoClient } from "mongodb";

export  async function getDataBase(){
    let client = new MongoClient("mongodb+srv://admin:123@cluster0.dnyhi.mongodb.net/")
    let connection = await client.connect();
    let db = connection.db("lucifer");
    return db;
}
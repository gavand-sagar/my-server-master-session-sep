import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json()) // middleware need to add

app.get("/hi", (req, res) => {
    res.send("hello")
})


app.get("/what-is-your-name", (req, res) => {
    res.send("Hey, My name is Amit!")
})





app.get("/get-all-categories", async (req, res) => {

    let client = new MongoClient("mongodb://127.0.0.1:27017")
    let connection = await client.connect();
    let db = connection.db("lucifer");

    // actual db operation 
    /// fetch all the records
    let data = await db.collection('categories').find().toArray();

    return res.json(data)
})

app.post("/create-category", async (req, res) => {
    let client = new MongoClient("mongodb://127.0.0.1:27017")
    let connection = await client.connect();
    let db = connection.db("lucifer");

    //actual db operation
    // create a new record in categories collection
    let result = await db.collection('categories').insertOne(req.body);
    return res.json(result)

})




app.listen(4002)
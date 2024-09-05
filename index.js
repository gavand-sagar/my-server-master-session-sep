import express from 'express';

const app = express();
app.use(express.json()) // middleware need to add

app.get("/hi", (req, res) => {
    res.send("hello")
})


app.get("/what-is-your-name", (req, res) => {
    res.send("Hey, My name is Amit!")
})

let categories = []

app.get("/get-all-categories", (req, res) => {
    res.json(categories)
})

app.post("/create-category", (req, res) => {
    //someone from client side will send the object to server
    // where to find it?

    // in the req.body
    categories.push(req.body) // req.body is  null here
    res.json(categories)
})




app.listen(4002)
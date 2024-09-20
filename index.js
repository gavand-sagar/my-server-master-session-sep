import express from 'express';
import { authenticate, validateBody } from './middleware.js';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { mySecret } from './constants.js';
import { getDataBase } from './db-functions.js';
import cors from 'cors'

const app = express();
app.use(express.json()) // middleware need to add
app.use(cors())

app.get("/", async (req, res) => {
    return res.send("This app works")
})


app.get("/get-all-products", authenticate, async (req, res) => {
    let db = await getDataBase();
    let data = await db.collection('products').find().toArray();
    return res.json(data)
})


app.get("/get-all-categories", async (req, res) => {
    let db = await getDataBase();
    // actual db operation 
    /// fetch all the records
    let data = await db.collection('categories').find().toArray();
    return res.json(data)
})

app.post("/create-category",
    body("categoryName")
        .isString()
        .isLength({ min: 3, max: 30 })
        .withMessage("Category name must be 3-30 charectors long"),
    validateBody
    , async (req, res) => {

        let db = await getDataBase();
        //actual db operation
        // create a new record in categories collection
        let result = await db.collection('categories').insertOne(req.body);
        return res.json(result)
    })


app.get('/create-token', async (req, res) => {
    let db = await getDataBase();
    if (req.headers.myusername && req.headers.mypassword) {
        let alreadyExists = await db.collection('users')
            .findOne({
                username: req.headers.myusername,
                password: req.headers.mypassword
            })

        if (alreadyExists) {
            // sign a token
            let token = jwt.sign({
                username: req.headers.myusername
            },
                mySecret,
                {
                    expiresIn: '10h'
                });
            return res.json({ token })

        } else {
            return res.status(403).json({ message: 'un-authorized' })
        }
    } else {
        return res.status(403).json({ message: 'un-authorized' })
    }
})

app.post("/signup",
    body("username").isString()
        .isLength({ min: 5, max: 40 })
        .withMessage("username length must be in 5-50 letters"),

    body("password").isString()
        .isLength({ min: 8 })
        .withMessage("password should be atleast 8 letter long"),
    validateBody,
    async (req, res) => {

        let db = await getDataBase();
        //actual db operation
        // create a new record in users collection

        let alreadyExists = await db.collection('users')
            .findOne({ username: req.body.username })

        if (alreadyExists) {
            return res.status(400).json({ message: "username already taken." })
        }

        let result = await db.collection('users').insertOne(req.body);
        return res.json(result)

    })




app.listen(process.env.PORT || 4002, () => {
    console.log("Listening...")
})
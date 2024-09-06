import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import { mySecret } from "./constants.js";
export async function authenticate(req, res, next) {

    // verify the token
    try {
        jwt.verify(req.headers.token, mySecret);
        next();
    } catch (error) {
        return res.status(403).json({ message: "un-authorized" })
    }


}


export function validateBody(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}
// simple server

// 1. Setup
import express from 'express';
const app = express()
// json web token
import jwt from "jsonwebtoken"

// secret for encrytion
const jwt_secret = "pwefpfwejwje"
import { getCustomerByUsername} from "./db/customers.js"


// parse objects
app.use(express.json())

// avoid security certificate issues
// const cors = require("cors")
import cors from 'cors';
app.use(cors())

// for our ".env" file
import dotenv from 'dotenv';
dotenv.config()

// connect to database
import client from "./db/client.js";
client.connect()

app.get("/",(req,res)=>{
    // console.log("hello test")
    res.send("hello test")
})

// const {getAllCustomers} = require("./db")

// import {getAllCustomers} from "./db/customers.js"

// app.get("/customers",async(req,res)=>{
//     const allCustomers = await getAllCustomers()
//     console.log(allCustomers)
//     res.send(allCustomers)
// })
// app.get("/customers/info",(req,res)=>{
//     res.send("you are on customers route")
// })
// app.get("/admin",(req,res)=>{
//     res.send("you are on customers route")
// })
// app.get("/admin/route",(req,res)=>{
//     res.send("you are on customers route")
// })

// more here later

import apiRouter from "./api/index.js"


// middleware
// should not break with missing auth header
app.use(async(req,res,next)=>{
    console.log("this is my middleware")
    const prefix = "Bearer "
    const auth = req.header("Authorization")

    if(!auth){
        console.log("no auth header")
        // next()
    }
    else{
        // console.log(auth)
        const token = auth.slice(prefix.length)
        console.log(token)
    
        // parsing token (decipher)
        const parsedToken = jwt.verify(token, jwt_secret)
        console.log(parsedToken)
        // next()

        const username = parsedToken.username
        console.log(username)

        try{
            // verify user
            const customer = await getCustomerByUsername(username)

            // storing user object in request (for future use)
            if(customer){
                req.user = customer
                console.log("successfully stored customer object")
            }
        }
        catch(err){
            console.log("failed to get user", err)
        }
        // next()
    }
    next()

})

app.use("/api", apiRouter)

// route path so far >> /api/customers
// /layer1/layer2



// cart
// /api/customers/cart
// /api/admin/create
// /api

app.listen(8080, ()=>{
    console.log("Server is up and running :D")
})



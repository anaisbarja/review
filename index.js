// simple server

// 1. Setup
import express from 'express';
const app = express()

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



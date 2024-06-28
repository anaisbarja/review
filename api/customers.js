import express from 'express';
import {getAllCustomers, createCustomer, getCustomerByUsername} from "../db/customers.js"
const router = express.Router()
// import {compare} from "bcrypt"
// use => compare()

import bcrypt from "bcrypt"
// use = bcrypt.compare()

// json web token
import jwt from "jsonwebtoken"

// secret for encrytion
const jwt_secret = "pwefpfwejwje"

// /api/customers
// get all customer info
router.get("/",async(req,res)=>{
    const allCustomers = await getAllCustomers()
    console.log(allCustomers)
    res.send(allCustomers)
})

router.post("/",async(req,res)=>{
    try{
        const {username, password} = req.body
        const result = await createCustomer({username, password})
        res.send(result)
    }catch(err){
        console.log("oh nose, failed to create custommer", err)
    }
})

router.post("/buySomething",(req,res)=>{

    // get user
    console.log(req.user)
    
    if(!req.user){
        res.status(401)
        res.send({message:"You need to have a valid token"})
    }

    // get product the user wants to buy

    // add product order to database addOrder(user, product)

    // if successfull
    res.send({message:"Yay you bought something!"})
})


router.post("/login", async (req,res)=>{
    try{
        // how do we "log in"?
        
        // receieve data
        // json object - username - "raw" password 
        const {username, password} = req.body
        
        // once data received:
        // verify user
        const customer = await getCustomerByUsername(username)
        
        if(customer){
            // res.send("success")
            // verify password:
            // use bcrypt.compare
            // check if username and "excrypted" password match exsiting user

            //                        raw       encyrpted
            if(await bcrypt.compare(password, customer.password)){
                const token = jwt.sign(
                    // {},
                    {id: customer.id, username: customer.username},
                    jwt_secret,
                    {expiresIn: "1w"}
                )
                res.send({message: "login success", token:token})
                // send back
                // option1: user found, password matches
                // res.send({message:"success!!", token:token})
            }else{

                // res.send("password fail")
                // option2: user found, password does not match
                res.send({message:"password does not match!!"})
            }
        }else{
            // option3: user not found
            res.send({message:"user not found!!"})
            // res.send("fail")
        }
        console.log(customer)
        // res.send(customer)

    }catch(err){
        console.log("oh nose, failed to login", err)
    }
        
})
    
// we need to update out express app to allow for customer creation
// note: if we go to /customer path and send object, 
// we should be able to creare a new customer in database


// // /api/customers/cart
// router.get("/cart",(req,res)=>{
//     res.send("this is cart")
// })

// // /api/customers/info
// router.get("/info",(req,res)=>{
//     res.send("this is info")
// })


// Yukun
// 1. logged in
// 2. computer stores token
// 3. token just has expire date

// 1. copy token from local storage
// 2. send a purchase request
// 3. 
// {
// name:anais,
// 2step: my phone,
// token: Yukun's token
// }


export default router
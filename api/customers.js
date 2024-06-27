import express from 'express';
import {getAllCustomers, createCustomer, getCustomerByUsername} from "../db/customers.js"
const router = express.Router()
import {compare} from "bcrypt"
// use => compare()
import bcrypt from "bcrypt"
// use = bcrypt.compare()

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
            if(await compare(password, customer.password)){
                res.send("password success")

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
        res.send(customer)
        
       

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


export default router
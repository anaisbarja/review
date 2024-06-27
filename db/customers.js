// const client = require("./client")

import client from "./client.js"
import bcrypt from "bcrypt"
const salt_count = 10


async function getAllCustomers(){
    try{
        const {rows} = await client.query(`select * from customers`)
        console.log("selected customers",rows)
        return rows
    }catch(err){
        console.log("failed getting customer", err)
    }
}


async function getCustomerByUsername(username){
    try{
        const {rows} = await client.query(`select * from customers where username = $1`,[username])
        console.log("selected customers",rows)
        return rows[0]
    }catch(err){
        console.log("failed getting customer", err)
    }
}

async function createCustomer({username, password}){
    try{
        const hashedPassword = await bcrypt.hash(password, salt_count)

        const {rows} = await client.query(`
            insert into customers (username, password)
            values ($1, $2)
            returning *
        `,[username, hashedPassword])

        return rows[0]

    }catch(err){
        console.log("oh nose, failed creating customer")
    }
}
export {
    createCustomer,
    getAllCustomers,
    getCustomerByUsername
}
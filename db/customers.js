// const client = require("./client")

import client from "./client.js"


async function getAllCustomers(){
    try{
        const {rows} = await client.query(`select * from customers`)
        console.log("selected customers",rows)
        return rows
    }catch(err){
        console.log("failed getting customer", err)
    }
}

async function createCustomer({username, password}){
    try{
        await client.query(`
            insert into customers (username, password)
            values ($1, $2)
        `,[username, password])

    }catch(err){
        console.log("oh nose, failed creating customer")
    }
}
export {
    createCustomer,
    getAllCustomers
}
import client from "./client.js"

import {createCustomer} from "./customers.js"

// drop
async function dropTables(){
    try{
        await client.query("drop table if exists orders")
        await client.query("drop table if exists customers")
    }catch(error){
        console.log("oh nose! failed dropping tables")
    }
}

// create
async function createTables(){
    try{
        await client.query(`
        create table customers (
            id serial primary key,
            username varchar(255),
            password varchar(255)
        )
        `)
        await client.query(`
        create table orders (
            id serial primary key,
            item varchar(255),
            quantity integer,
            customerid integer references customers(id)
        )
        `)

    }catch(error){
        console.log("oh nose, failed creating tables!")
    }
}

// inittialze test data
async function createInitialData(){
    try{
        let newCustomerObj = {username: "anais",password: "pass123"}
        await createCustomer(newCustomerObj)

        await createCustomer({
            username: "Amadeo",
            password: "easyPass"
        })

        
    }catch(err){
        console.error("oh nose! failed to init data")
    }
}

// run it all

async function rebuild (){
    try{
        await client.connect()
        await dropTables()
        await createTables()
        await createInitialData()
    }catch(err){
        console.log("oh nose, failed rebuilding db", err)
    }
}

rebuild().finally(()=>client.end())
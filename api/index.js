// const express = require("express")
import express from 'express';
const apiRouter = express.Router()


import customers from "./customers.js"
apiRouter.use("/customers", customers)


export default apiRouter
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express()
//use __dirname when set "type": "module" in package.json to use "import" instead of require
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

import mysql from 'mysql2/promise';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))


app.use(express.static('public'))
//create prefix /static ROUTE and join path 'public'
app.use('/static', express.static(path.join(__dirname, 'public')))
const db = await mysql.createPool({
    user: "cs157a-remote",
    host: "192.168.86.28",
    password:"Giangpass1",
    database: "ecommerce"
})

// Query to fetch data from the customers table
const query = 'SELECT * FROM Products';

// A simple SELECT query

const [results, fields] = await db.query(query);

console.log(results); // results contains rows returned by server
console.log(fields); // fields contains extra meta data about results, if available


app.get('/home', (req, res)=>{
    res.render('index')
})

app.get('/dashboard', (req, res)=>{
    res.render('dashboard')
})

app.listen(3000,()=>{
    console.log('ON PORT 3000')
})
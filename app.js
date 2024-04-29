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
//TODO: if have time, create .env file
const db = await mysql.createPool({
    user: "cs157a-remote",
    host: "192.168.86.28",
    password:"Giangpass1",
    database: "ecommerce"
})


// Get Products
const [products] = await db.query("SELECT * FROM Products");
const [categories] = await db.query("SELECT * FROM Product_Categories")

// console.log(products); // results contains rows returned by server
// // console.log(products3); // results contains rows returned by server
// console.log(categories)

//Database for dashboard

const totalByCategory = `SELECT
pc.product_category  AS category_name,
p.product_category,
SUM(oi.subtotal) AS total_amount
FROM Order_Items oi
JOIN products p ON oi.product_id = p.product_id
JOIN product_categories pc ON p.product_category  = pc.category_id 
GROUP BY p.product_category; `;

export const [totalByCategoryQ] = await db.query(totalByCategory);

console.log(totalByCategoryQ)



app.get('/home', (req, res)=>{
    res.render('index')
})

app.get('/products', (req, res)=>{
    res.render('products', {products, categories})
})

app.get('/dashboard', (req, res)=>{
    res.render('dashboard', {totalByCategoryQ})
})

app.listen(3000,()=>{
    console.log('ON PORT 3000')
})
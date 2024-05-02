import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
// import path from 'path'
// dotenv.config({ 
//     path: path.resolve(__dirname, './.env') 
//  })
console.log(process.env.M_USERNAME,process.env.M_PWD,process.env.M_DB )

//TODO: if have time, create .env file
const db = await mysql.createPool({
    user: process.env.USERNAME,
    host: process.env.HOST,
    password:process.env.PWD,
    database: process.env.DB
})

// Get Products
export const [products] = await db.query("SELECT * FROM Products");
export const [categories] = await db.query("SELECT * FROM Product_Categories")

// console.log(products); // results contains rows returned by server
// console.log(products3); // results contains rows returned by server
// console.log(categories)

//Database for dashboard

const totalByCategory = `SELECT
pc.product_category  AS category_name,
p.product_category,
SUM(oi.subtotal) AS total_amount
FROM Order_Items oi
JOIN products p ON oi.product_id = p.product_id
JOIN product_categories pc ON p.product_category  = pc.category_id 
GROUP BY p.product_category;
`;

export const [totalByCategoryQ] = await db.query(totalByCategory);
console.log("from db file")
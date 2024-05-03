import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
// import path from 'path'
dotenv.config()


//TODO: if have time, create .env file
const db = await mysql.createPool({
    user: process.env.USERNAME,
    host: process.env.HOST,
    password: process.env.PASS,
    database: process.env.DB
})

// Get Products
export const [products] = await db.query("SELECT * FROM Products");
export const [categories] = await db.query("SELECT * FROM Product_Categories")

// console.log(products); // results contains rows returned by server
// console.log(products3); // results contains rows returned by server
// console.log(categories)

//Database for dashboard

const totalByCategoryQ = `SELECT
pc.product_category  AS category_name,
p.product_category,
SUM(oi.subtotal) AS total_amount
FROM Order_Items oi
JOIN products p ON oi.product_id = p.product_id
JOIN product_categories pc ON p.product_category  = pc.category_id 
GROUP BY p.product_category;
`;
const salesByMonthsQ=`SELECT 
MONTH(order_date) AS month,
SUM(total_sales) AS total_sales
FROM (
SELECT 
    o.order_id,
    o.order_date,
    SUM(oi.subtotal) AS total_sales
FROM 
    orders o
JOIN 
    order_items oi ON o.order_id = oi.order_id
GROUP BY 
    o.order_id, o.order_date
) AS order_totals
GROUP BY 
MONTH(order_date)
ORDER BY 
month;`

export const [totalByCategory] = await db.query(totalByCategoryQ);
export const [salesByMonths] = await db.query(salesByMonthsQ);

console.log(salesByMonths)
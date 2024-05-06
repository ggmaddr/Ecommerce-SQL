import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
// import path from 'path'
dotenv.config()


//TODO: if have time, create .env file
const db = await mysql.createPool({
    user: process.env.USERNAME,
    host: '10.251.220.188',
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
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.order_date
) AS order_totals
GROUP BY MONTH(order_date) ORDER BY month;`

const breadQ = `SELECT 
SUM(oi.subtotal) AS sales
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE p.product_category = 1 GROUP BY MONTH(o.order_date) ORDER BY MONTH(o.order_date);`
const puddingQ = `SELECT 
SUM(oi.subtotal) AS sales
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE p.product_category = 2
GROUP BY MONTH(o.order_date) ORDER BY MONTH(o.order_date);
`
const crepesQ = `SELECT SUM(oi.subtotal) AS sales
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE p.product_category = 3 GROUP BY MONTH(o.order_date) ORDER BY MONTH(o.order_date);
`
const boxsetQ = `SELECT 
SUM(oi.subtotal) AS sales
FROM 
order_items oi
JOIN 
products p ON oi.product_id = p.product_id
JOIN 
orders o ON oi.order_id = o.order_id
WHERE 
p.product_category = 4
GROUP BY MONTH(o.order_date) ORDER BY MONTH(o.order_date);`


export const [totalByCategory] = await db.query(totalByCategoryQ);
export const [salesByMonths] = await db.query(salesByMonthsQ);

export let [bread]= await db.query(breadQ);
export let [pudding]= await db.query(puddingQ);
export let [crepes]= await db.query(crepesQ);
export let [boxset]= await db.query(boxsetQ);

bread = bread.map(item=>item.sales)
pudding = pudding.map(item=>item.sales)
crepes = crepes.map(item=>item.sales)
boxset = boxset.map(item=>item.sales)
export const salesByCats = {
    bread: bread,
    pudding: pudding,
    crepes: crepes,
    boxset: boxset

}

const recentCusQ=`
SELECT 
    c.name AS name,
    DATE_FORMAT(MAX(o.order_date), '%Y-%m-%d') AS date
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
ORDER BY date DESC
LIMIT 10;`
export const [recentCus] = await db.query(recentCusQ);

//Best Selling products by quantity
const bestProdQ=`
SELECT
    p.name AS name,
    pc.product_category AS category,
    SUM(oi.quantity) AS quantity,
    SUM(oi.subtotal) AS amount
FROM Order_Items oi
JOIN products p ON oi.product_id = p.product_id
JOIN Product_Categories pc on p.product_category = pc.category_id 
GROUP BY p.product_id
ORDER BY quantity DESC
LIMIT 10;`

export const [bestProd] = await db.query(bestProdQ);
const numCustomersQ=`SELECT COUNT(*) AS count FROM Customers;`
const quantitiesQ=`SELECT SUM(quantity) AS count FROM Order_Items;`
const earningQ=`SELECT SUM(subtotal) AS count FROM Order_Items;`
export const [numCustomers] = await db.query(numCustomersQ);
export const [quantities] = await db.query(quantitiesQ);
export const [earning] = await db.query(earningQ);

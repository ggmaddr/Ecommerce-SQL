import express, { json } from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { products, categories, totalByCategoryQ } from './db.js';
const app = express()
//use __dirname when set "type": "module" in package.json to use "import" instead of require
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))


app.use(express.static('public'))
//create prefix /static ROUTE and join path 'public'
app.use('/static', express.static(path.join(__dirname, 'public')))


app.get('/home', (req, res)=>{
    res.render('index')
})

app.get('/products', (req, res)=>{
    res.render('products', {products, categories})
})

app.get('/dashboard', (req, res)=>{
    res.render('dashboard', {totalByCategoryQ})
})

app.get('/data/totalByCategoryQ',(req, res)=>{
    res.send(totalByCategoryQ)
})


app.listen(3000,()=>{
    console.log('ON PORT 3000')
})
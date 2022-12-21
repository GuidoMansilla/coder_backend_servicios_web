import express from 'express';
import productManager from './productManager.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Hola mundo');
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const products = productManager.getProducts();

  const product = products.find(product => product.id == id);

  if(!product) {
    return res.send('Producto no encontrado');
  }

  res.json(product);

}) 

app.get('/products', (req, res) => {

  const products = productManager.getProducts();
  let limit = req.query.limit;

  if(!limit) return res.json(products);
 
  let productosFiltrados = products.filter(prod=>prod.id <= limit);

  res.json(productosFiltrados);
 
})


app.listen(8080, () => console.log('Listening on port 8080'));
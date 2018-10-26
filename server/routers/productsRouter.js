
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

const store = new SimpleJsonStore('./data.json', { products: [] });

//get all
router.get('/', (req, res, next) => {
  console.log('Index page only');
  next();
}, (req, res) => {
  res.json(store.get('products'));
  
});

//get 
router.get('/:id', (req, res) => {
  let product = {};
  const products = store.get('products');
  product = products.find(products => products.id === req.params.id);
  res.json(product);
});



//ADD product
router.post('/', (req, res) => {
  const products = store.get('products');
  const newProducts = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    quantity: req.body.quantity
    

  };

  products.push(newProducts);
  store.set('products', products);

  res.json(products);
});



//UPDATE
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const products = store.get('products');

  for(let i = 0; i < products.length; i++) {
    if(products[i].id === id) {
      products[i].name = req.body.name;
      ptoducts[i].description = req.body.description;
      break;
    }
  }   

  store.set('products', products);
  res.json(store.get('products'));
});


//delete
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const products = store.get('products');
  const newProducts = products.filter(product => Number(product.id) !== Number(id));

  store.set('products', newProducts);
  res.json(newProducts);
});

module.exports = router;

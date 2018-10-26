/**
 * aboutRouter
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line

router.get('/', (req, res) => {
  res.render('update.pug', {});
});
//get id
router.get('/:id', (req, res) => {
    let product = {};
    const products = store.get('products');
    product = products.find(products => products.id === req.params.id);
    res.json(product);
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

module.exports = router;

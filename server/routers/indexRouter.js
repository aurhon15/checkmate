
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

// add data into jsonstore
const store = new SimpleJsonStore('./data-2.json', { notes: [] });

router.get('/', function getIndexPage(req, res) {
  let viewModel = req.viewModel;
 
  viewModel.products = store.get('products');
  res.render('index.pug', viewModel);
});



module.exports = router;

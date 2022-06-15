const router = require('express').Router();


router.get('/', async (req, res) => {
    // find all customers
   
  });
  
  router.get('/:id', async (req, res) => {
    // find one customer by its `id` value
    
  });
  
  router.post('/', async (req, res) => {
    // create a new customer
  });
  
  router.put('/:id', async (req, res) => {
    // update a customer by its `id` value
  });

  module.exports = router;
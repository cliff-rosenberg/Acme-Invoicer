const { Customer } = require('../../models');

const router = require('express').Router();

// find all customers
router.get('/', async (req, res) => {
    try {
        const customerData = await Customer.findall;
            res.status(200).json(customerData);
        
    } catch (err) {
        res.status(400).json(err);
    }
   
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
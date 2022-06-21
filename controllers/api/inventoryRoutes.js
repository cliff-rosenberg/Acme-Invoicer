const router = require('express').Router();
const { Inventory } = require('../../models');


//find all products
router.get('/', async (req, res) => {
  try {
      const inventoryData = await Inventory.findAll();
      //res.status(200).json(inventoryData);
      const rendered = inventoryData.map((data) => data.get({ plain: true }));
      console.log(rendered);
      res.render('inventory', {
        rendered,
        logged_in: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});
  
  // find products by their `id` value
  router.get('/:id', async (req, res) => {
    try {
        const inventoryData = await Inventory.findByPk(req.params.id);
        if (!inventoryData) {
            res.status(404).json({ message: 'no product with this id' });
            return;
        }
        res.status(200).json(inventoryData);
    } catch (err) {
        res.status(500).json(err);
    }
    
  });
  
  // create a new product
  router.post('/', async (req, res) => {
    try {
        if (!req.body.item_name) {
            res.render('error', {
                errMsg: 'Please enter an item name',
                logged_in: req.session.loggedIn,
                });
        } else {
        console.log(req.body);
        const body = req.body
        const inventoryData = await Inventory.create(body);
        res.status(200).json(inventoryData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
  });
  
  // update a product by its `id` value
  router.put('/:id', async (req, res) => {
    try {
        const inventoryData = await Inventory.update(req.body, {
            where: req.params.id
        });
        if (!inventoryData[0]) {
            res.status(404).json({ message: 'no product with this id' });
            return;
        }
        res.status(200).json(inventoryData);
    } catch (err) {
        res.status(500).json(err);
    }
    
  });

  module.exports = router;
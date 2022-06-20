const router = require('express').Router();
const { Inventory } = require('../../models');


//find all products
router.get('/', async (req, res) => {
  try {
      const inventoryData = await Inventory.findAll();
      let rendered = inventoryData.map((data) => data.get({ plain: true }));
      console.log(rendered);
      res.render('inventory', {
        rendered,
        });
      //res.status(200).json(inventoryData);
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
        const inventoryData = await Inventory.create(req.body);
        res.status(200).json(inventoryData);
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
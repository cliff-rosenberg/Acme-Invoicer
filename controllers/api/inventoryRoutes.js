//*
//* These are the Express routes for Inventory functions
//* all routes have the '/api/inventory' prefix in the URL
//*
// require Inventory model
const { Inventory } = require('../../models');
// set up Express router
const router = require('express').Router();

//* Express route to find all Inventory items
router.get('/', async (req, res) => {
  try {
    // retrieve all Inventory items in database
      const inventoryData = await Inventory.findAll();
      // format the returned JSON
      const rendered = inventoryData.map((data) => data.get({ plain: true }));
      console.log(rendered);
      res.render('inventory', {
        tblCaption: 'All Inventory Items',
        rendered,
        logged_in: req.session.loggedIn,
        });
    } catch (err) {
        // returns a Client error response
        res.status(400).json(err);
    }
});

//* Express route to find Inventory items by their `inventory_id` value
router.post('/find', async (req, res) => {
    console.log(req.body);
    try {
        const body = req.body;
        // search the databse for relevant Inventory item data
        const inventoryData = await Inventory.findAll({
            where: {
                inventory_id: body.dataval
            }
        });
        if (!inventoryData) {
            res.status(404).json({ message: 'no product with this id' });
            return;
        }
        // format the returned JSON
        const rendered = inventoryData.map((data) => data.get({ plain: true }));
        //console.log(rendered);
        // render using Handlebars
        res.render('inventory', {
            tblCaption: 'Single Inventory Item',
            rendered,
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        // returns a Server error response
        res.status(500).json(err);
    }
});
  
//* Express route to create a new Inventory item
router.post('/', async (req, res) => {
    //console.log(req.body);
    try {
        if (!req.body.item_name) {
            res.render('error', {
                errMsg: 'Please enter an item name',
                url: '/api/forms/inventoryform',
                logged_in: req.session.loggedIn,
                });
        } else {
        const body = req.body;
        const inventoryData = await Inventory.create(body);
        res.status(200).json(inventoryData);
        };
    } catch (err) {
        // returns a Client error response
        res.status(400).json(err);
    }
});
  
//* Express route to delete a single Inventory item from Database
router.post('/delete', async (req, res) => {
    console.log(req.body);
    try {
        const body = req.body;
        const inventoryData = await Inventory.destroy({
            where: {
                inventory_id: body.dataval
            }
        });
        const invUpdated = await Inventory.findAll();
        const rendered = invUpdated.map((data) => data.get({ plain: true }));
        res.render('inventory', {
            tblCaption: 'Updated Inventory Items',
            rendered,
            logged_in: req.session.loggedIn,
            });
    } catch (err) {
        // returns a Server error response
        res.status(500).json(err);
    }
});

// TODO: Express route to update an Inventory item by its `inventory_id` value
router.put('/:id', async (req, res) => {
    try {
        const inventoryData = await Inventory.update(req.body, {
            where: req.params.id
        });
        if (!inventoryData) {
            res.status(404).json({ message: 'no product with this id' });
            return;
        }
        res.status(200).json(inventoryData);
    } catch (err) {
        // returns a Server error response
        res.status(500).json(err);
    }
});

  module.exports = router;
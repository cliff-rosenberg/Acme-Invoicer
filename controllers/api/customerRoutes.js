const { Customer } = require('../../models');

const router = require('express').Router();

// find all customers
router.get('/', async (req, res) => {
    try {
        const customerData = await Customer.findAll();
            //res.status(200).json(customerData);
            // serialize the Sequelize query return
            const rendered = customerData.map((data) => data.get({ plain: true }));
            console.log(rendered);
            res.render('customers', {
                rendered,
                logged_in: req.session.loggedIn,
            });
    } catch (err) {
        res.status(400).json(err);
    }
});
  
  // find one customer by its `id` value
  router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const customerData = await Customer.findByPk(req.params.id);
        if (!customerData) {
            res.status(404).json({ message: 'no customer with this id' });
            return;
        }
        //res.status(200).json(customerData);
        const rendered = customerData.map((data) => data.get({ plain: true }));
            console.log(rendered);
            res.render('customers', {
                rendered,
                logged_in: req.session.loggedIn,
            });
    } catch (err) {
        res.status(500).json(err);
    }
  });
  
  // create a new customer
  router.post('/', async (req, res) => {
    try {
        const customerData = await Customer.create(req.body);
        res.status(200).json(customerData);
    } catch (err) {
        res.status(400).json(err);
    }
  });
  
  // update a customer by its `id` value
  router.put('/:id', async (req, res) => {
    try {
        const customerData = await Customer.update(req.body, {
            where: req.params.id
        });
        if (!customerData[0]) {
            res.status(404).json({ message: 'no customer with this id' });
            return;
        }
        res.status(200).json(customerData);
    } catch (err) {
        res.status(500).json(err);
    }
    
  });

  module.exports = router;
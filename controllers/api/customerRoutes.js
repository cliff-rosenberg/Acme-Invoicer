//*
//* These are the Express routes for Customer functions
//*
// require Customer model
const { Customer } = require('../../models');
// set up Express router
const router = require('express').Router();

//* find all Customers
router.get('/', async (req, res) => {
    try {
        // retrieve all Customers in database
        const customerData = await Customer.findAll();
            // format the returned JSON
            const rendered = customerData.map((data) => data.get({ plain: true }));
            //console.log(rendered);
            // render using Handlebars
            res.render('customers', {
                tblCaption: 'All current Customers',
                rendered,
                logged_in: req.session.loggedIn,
            });
    } catch (err) {
        res.status(400).json(err);
    }
});
  
//* find one customer by the `customer_id` value
router.post('/find', async (req, res) => {
    console.log(req.body);
    try {
        const body = req.body;
        // search the database for relevant Customer data
        const customerData = await Customer.findAll({
            where: {
                customer_id: body.dataval
            }
        });
        if (!customerData) {
            res.status(404).json({ message: 'no customer with this id' });
            return;
        }
        // format the returned JSON
        const rendered = customerData.map((data) => data.get({ plain: true }));
        //console.log(rendered);
            // render using Handlebars
            res.render('customers', {
                tblCaption: 'Single Customer Data',
                rendered,
                logged_in: req.session.loggedIn,
            });
    } catch (err) {
        res.status(500).json(err);
    }
});
  
//* create a new Customer in database
router.post('/', async (req, res) => {
    //console.log(req.body)
    try {
        if (!req.body.company_name) {
            res.render('error', {
                errMsg: 'Please enter a Customer name',
                url: '/api/forms/customerform',
                logged_in: req.session.loggedIn,
                });
        } else {
            const body = req.body;
            // create the new Customer in database
            customerData = await Customer.create(body);
            // read back Customer table with new Customer data added
            const customerNew = await Customer.findAll();
            // serialize the Sequelize query return
            const rendered = customerNew.map((data) => data.get({ plain: true }));
            console.log(rendered);
            // render using Handlebars
            res.render('customers', {
                tblCaption: 'All current Customers',
                rendered,
                logged_in: req.session.loggedIn,
            });
        };
    } catch (err) {
        res.status(400).json(err);
    }
});

//* delete a single Customer
router.post('/delete', async (req, res) => {
    console.log(req.body);
    try {
        const body = req.body;
        // remove single Customer's data from database
        const customerData = await Customer.destroy({
            where: {
                customer_id: body.dataval
            }
        });
        //console.log(body);
        // render using Handlebars
        res.render('success', {
            formData: body.dataval,
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: update a Customer by its `id` value
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

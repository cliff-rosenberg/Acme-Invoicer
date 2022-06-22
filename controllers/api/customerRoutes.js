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
    console.log(req.body)
    try {
        if (!req.body.company_name) {
            res.render('error', {
                errMsg: 'Please enter a Customer name',
                url: '/api/forms/customerform',
                logged_in: req.session.loggedIn,
                });
        } else {
            const body = req.body;
            customerData = await Customer.create(body);
            // read back with new customer added
            const customerNew = await Customer.findAll();
            // serialize the Sequelize query return
            const rendered = customerNew.map((data) => data.get({ plain: true }));
            console.log(rendered);
            res.render('customers', {
                rendered,
                logged_in: req.session.loggedIn,
            });
        };
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete a customer
router.post('/delete', async (req, res) => {
    console.log(req.body);
    try {
        const body = req.body;
        const customerData = await Customer.destroy({
            where: {
                customer_id: body.dataval
            }
        });
        console.log(body);
        res.render('success', {
            formData: body.dataval,
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
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
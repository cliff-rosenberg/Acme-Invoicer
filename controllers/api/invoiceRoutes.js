//*
//* These are the Express routes for Invoice functions
//* all routes have the '/api/invoice' prefix in the URL
//*
// require databse models for Sequelize queries
const { Invoice, Customer } = require('../../models');
const { Inventory, Invoice_details } = require('../../models');
// set up Express router
const router = require('express').Router();

//* Express route to find all Invoices in database
router.get('/', async (req, res) => {
  try {
    // this will return all Invoice data in table
    const queryData = await Invoice.findAll({
      include: Customer,
    });
    //res.status(200).json(invoiceData);
    console.log(queryData);
    let rendered = queryData.map((data) => data.get({ plain: true }));
    console.log(rendered);
            res.render('invoices', {
                rendered,
                tblCaption: 'All current Invoices',
                logged_in: req.session.loggedIn,
            });
  } catch (err) {
    // returns a '400 Bad Request' response
    res.status(400).json(err);
  }
});

// TODO: find all Invoices by their `id` value
//* Express route to find all Invoices by their `id` value
router.get('/:id', async (req, res) => {
  //console.log(req.params.id)
  try {
    // includes the data in the 'Customer' table,
    // where Invoice Id has a matching Customer Id value in column
    const invoiceData = await Invoice.findByPk(req.params.id, {
      include: Customer,
    });
    // if NULL is returned, no invoice matching the given 'id' was found
    if (!invoiceData) {
        res.status(404).json({ message: 'no invoice found with this id' });
        return;
    }

    res.status(200).json(invoiceData);
  } catch (err) {
    // returns a '500 Internal Server Error' response
    res.status(500).json(err);
  }
});

// TODO:
//* Express route to find all Invoices by their `id` value,
//* and include all details as well
router.get('/details/:id', async (req, res) => {
  //console.log(req.params.id)
  try {
    // includes the data in the 'Customer' table,
    // where Invoice Id has a matching Customer Id value in column
    const invoiceData = await Invoice.findByPk(req.params.id, {
      include: {model: Invoice_details, required: true}
    });
    // if NULL is returned, no invoice matching the given 'id' was found
    if (!invoiceData) {
        res.status(404).json({ message: 'no invoice found with this id' });
        return;
    }
    let rendered = invoiceData.map((data) => data.get({ plain: true }));
    console.log(rendered);
    res.status(200).json(rendered);
  } catch (err) {
    // returns a '500 Internal Server Error' response
    res.status(500).json(err);
  }
});
  
// TODO: create a new Invoice in database
router.post('/', async (req, res) => {
  try {
    // body must contain 'invoice_date' (in 'yyyy-mm-dd' format),
    // and numeric 'customer_id' the invoice belongs to.
    // the 'id' index for Invoice is auto-created by MySQL
    const invoiceData = await Invoice.create(req.body);
    res.status(200).json(invoiceData);
  } catch (err) {
    // returns a '400 Bad Request' response
    res.status(400).json(err);
  }
});
  
 module.exports = router;
 
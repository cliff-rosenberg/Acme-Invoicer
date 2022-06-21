const router = require('express').Router();
const { Invoice, Customer } = require('../../models');
const { Inventory, Invoice_details } = require('../../models');



//find all invoices
router.get('/', async (req, res) => {
  try {
    // this will return all Invoice data in table
    const queryData = await Invoice.findAll();
    //res.status(200).json(invoiceData);
    let rendered = queryData.map((data) => data.get({ plain: true }));
            console.log(rendered);
            res.render('invoice', {
                rendered,
                logged_in: req.session.loggedIn,
            });
  } catch (err) {
    res.status(400).json(err);
  }
});
  
// find invoices by their `id` value
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
    res.status(500).json(err);
  }
});

// find invoices by their `id` value and include all details
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
    //res.status(200).json(invoiceData);
    let rendered = invoiceData.map((data) => data.get({ plain: true }));
    console.log(rendered);
    
  } catch (err) {
    res.status(500).json(err);
  }
});
  
// create a new invoice
router.post('/', async (req, res) => {
  try {
    // body must contain 'invoice_date' (in 'yyyy-mm-dd' format),
    // and numeric 'customer_id' the invoice belongs to.
    // the 'id' index for Invoice is auto-created by MySQL
    const invoiceData = await Invoice.create(req.body);
    res.status(200).json(invoiceData);
  } catch (err) {
    res.status(400).json(err);
  }
});
  
 module.exports = router;
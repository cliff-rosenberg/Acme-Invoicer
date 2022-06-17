const router = require('express').Router();
const { Invoice } = require('../../models');
const { Invoice_details } = require('../../models');



//find all invoices
router.get('/', async (req, res) => {
  try {
      const invoiceData = await Invoice.findAll();
          res.status(200).json(invoiceData);
      
  } catch (err) {
      res.status(400).json(err);
  }
 
});
  
  // find invoices by their `id` value
  router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const invoiceData = await Invoice.findByPk(req.params.id);
        if (!invoiceData) {
            res.status(404).json({ message: 'no invoice with this id' });
            return;
        }
        res.status(200).json(invoiceData);
    } catch (err) {
        res.status(500).json(err);
    }
    
  });
  
  // create a new invoice
  router.post('/', async (req, res) => {
    try {
        const invoiceData = await Invoice.create(req.body);
        res.status(200).json(invoiceData);
    } catch (err) {
        res.status(400).json(err);
    }
  });
  
 module.exports = router;
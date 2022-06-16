const { Invoice } = require('../models');

const invoiceData = [
    {
        customer_id: 1,
        invoice_date: '2021-04-12'
    },
    {
        customer_id: 2,
        invoice_date: '2021-03-23'
    },
    {
        customer_id: 2,
        invoice_date: '2021-06-16'
    },
    {
        customer_id: 3,
        invoice_date: '2021-05-05'
    }
];

const seedInvoice = () => Invoice.bulkCreate(invoiceData);

module.exports = seedInvoice;

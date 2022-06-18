const { Invoice_details } = require('../models');

const detailsData = [
    {
        quantity: 2,
        extended_price: 24.99,
        invoice_id: 1,
        inventory_id: 1
    },
    {
        quantity: 2,
        extended_price: 19.99,
        invoice_id: 1,
        inventory_id: 2
    },
    {
        quantity: 2,
        extended_price: 9.99,
        invoice_id: 2,
        inventory_id: 4
    },
    {
        quantity: 2,
        extended_price: 19.99,
        invoice_id: 2,
        inventory_id: 2
    },
    {
        quantity: 2,
        extended_price: 19.99,
        invoice_id: 3,
        inventory_id: 6
    },
    {
        quantity: 1,
        extended_price: 48.99,
        invoice_id: 3,
        inventory_id: 5
    },
    {
        quantity: 100,
        extended_price: 7.99,
        invoice_id: 4,
        inventory_id: 3
    }
];

const seedInvoice_details = () => Invoice_details.bulkCreate(detailsData);

module.exports = seedInvoice_details;

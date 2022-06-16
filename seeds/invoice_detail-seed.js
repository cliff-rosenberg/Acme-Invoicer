const { Invoice_details } = require('../models');

const detailsData = [
    {
        quantity: 8,
        extended_price: 19.99,
        invoice_id: 1,
        inventory_id: 1
    }
];

const seedInvoice_details = () => Invoice_details.bulkCreate(detailsData);

module.exports = seedInvoice_details;

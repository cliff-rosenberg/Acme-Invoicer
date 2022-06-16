const { Customer } = require('../models');

const customerData = [
    {
        company_name: 'Davis Industries',
        contact_name: 'David Edwards',
        address: '127 Miller Rd, Bethesda MD 20814',
        phone_number: '240-555-1212',
        email_address: 'd.edwards@davisind.com'
    },
    {
        company_name: 'Miller and Assoc.',
        contact_name: 'Fran Heller',
        address: '224 Kingston Ave, Columbus OH 43228',
        phone_number: '614-555-1212',
        email_address: 'fran.heller@millerassoc.com' 
    },
    {
        company_name: 'Top Notch Properties',
        contact_name: 'Phil Hemsworth',
        address: '98700 Center Rd, Milwaukee WI 53205',
        phone_number: '414-555-1212',
        email_address: 'phil.h@topnotchprop.com'
    }
];

const seedCustomer = () => Customer.bulkCreate(customerData);

module.exports = seedCustomer;

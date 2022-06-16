const { Inventory } = require('../models');

const inventoryData = [
    {
        item_name: 'Duct Tape, 100ft Roll',
        inventory_quan: 25.00,
        cost: 14.63,
        price: 24.99
    },
    {
        item_name: 'Staples, 100ct Box',
        inventory_quan: 215.00,
        cost: 9.44,
        price: 19.99
    },
    {
        item_name: 'Shipping Box, 12in x 12in x 12in',
        inventory_quan: 800.00,
        cost: 2.33,
        price: 7.99
    },
    {
        item_name: 'Coffee Filters, 24ct Box',
        inventory_quan: 312.00,
        cost: 4.61,
        price: 9.99
    },
    {
        item_name: 'Printer Ink, HP 950XL Black',
        inventory_quan: 20.00,
        cost: 23.48,
        price: 48.99
    },
    {
        item_name: 'USB 2.0 Printer Cable, 10ft, Black',
        inventory_quan: 48.00,
        cost: 8.11,
        price: 19.99  
    }
];

const seedInventory = () => Inventory.bulkCreate(inventoryData);

module.exports = seedInventory;

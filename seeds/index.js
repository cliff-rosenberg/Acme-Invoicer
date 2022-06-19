require('dotenv').config({ path: __dirname + `/../.env` });

const seedCustomer = require('./customer-seed');
const seedInventory = require('./inventory-seed');
const seedInvoice = require('./invoice-seed');

const sequelize = require('../config/connection');
const seedInvoice_details = require('./invoice_detail-seed');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedCustomer();
    console.log('\n----- CUSTOMER SEEDED -----\n');

    await seedInventory();
    console.log('\n----- INVENTORY SEEDED -----\n');

    await seedInvoice();
    console.log('\n----- INVOICE SEEDED -----\n');

    await seedInvoice_details();
    console.log('\n----- INVOICE LINE ITEMS SEEDED -----\n');

   process.exit(0);
};

seedAll();

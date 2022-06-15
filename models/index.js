'use strict';

const Sequelize = require('sequelize');
const CustomerModel = require('./models/customer.js');
const InventoryModel = require('./models/inventory.js');
const InvoiceModel = require('./models/invoice.js');

const sequelize = new Sequelize({
  dialect: 'mysql',
  store: ':memory',
  define: {
    timestamps: false
  }
});

const Customer = CustomerModel(sequelize, Sequelize);
const Inventory = InventoryModel(sequelize, Sequelize);
const Invoice = InvoiceModel(sequelize, Sequelize);

Customer.hasMany(Invoices, {
  foreignKey: 'customersId'
});

Invoice.belongsTo(Customers, {
  foreignKey: 'invoicesId'
});

module.exports = {
  sequelize,
  Sequelize,
  Customer,
  Inventory,
  Invoice
}
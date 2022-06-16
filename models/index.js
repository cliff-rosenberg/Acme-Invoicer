// import models
const Customer = require('./Customer');
const Inventory = require('./Inventory');
const Invoice = require('./Invoice');
const Invoice_details = require('./Invoice_details');

// associations made here

//Customer has many Invoices
// but only one Customer per Invoice
Invoice.belongsTo(Customer, {
  foreignKey: 'customer_id'
});

// Customer has many Invoices
Customer.hasMany(Invoice, {
  foreignKey: 'customer_id'
});

// Invoice has many line items
Invoice.hasMany(Invoice_details, {
  foreignKey: 'invoice_id'
});

Inventory.hasMany(Invoice_details, {
  foreignKey: 'inventory_id'
});

module.exports = {
  Customer,
  Inventory,
  Invoice,
  Invoice_details
};

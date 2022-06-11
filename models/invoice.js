'use strict';

module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('invoice', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    customerId: {
      type: DataTypes.INTEGER
    },
    itemId: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, { tableName: 'invoice' });

  return Invoice;
};

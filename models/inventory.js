'use strict';

module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('inventory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inventoryQuan: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, { tableName: 'inventory' });

  return Inventory;
};

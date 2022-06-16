const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Inventory extends Model {}

Inventory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inventory_quan: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  },
  {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'inventory', 
  }
);

  module.exports = Inventory;

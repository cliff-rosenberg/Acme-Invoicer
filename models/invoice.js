const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const Customer = require('./customer');

class Invoice extends Model {}

Invoice.init(
    {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    invoice_date: {
      type: DataTypes.DATEONLY
    }
    }, 
    { 
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'invoice' 
    }
  );

  module.exports = Invoice;

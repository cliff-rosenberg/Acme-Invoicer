const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Invoice extends Model {}

Invoice.init(
    {
    invoice_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    invoice_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
    }, 
    { 
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Invoice' 
    }
  );

  module.exports = Invoice;

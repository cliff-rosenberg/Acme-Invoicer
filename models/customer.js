const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const Invoice = require('./invoice')

// Model basics: https://sequelize.org/docs/v6/core-concepts/model-basics/
class Customer extends Model {}

Customer.init(
  {
    //define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_name: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_address: {
      type: DataTypes.STRING
    }
  },
  {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'customer',
  }
);

  module.exports = Customer;

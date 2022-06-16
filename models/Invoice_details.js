const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const Invoice = require('./invoice');

class Invoice_details extends Model {}

Invoice_details.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    quantity: {
        type: DataTypes.DECIMAL(10,2)
    },
    extended_price: {
        type: DataTypes.DECIMAL(10,2)
    }
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'invoice_details'
    }
);

module.exports = Invoice_details;

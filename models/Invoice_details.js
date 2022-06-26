const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

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
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    extended_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Invoice_details'
    }
);

module.exports = Invoice_details;

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactName: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailAddress: {
      type: DataTypes.STRING
    }
  }, { tableName: 'customer' });

  return Customer;
};

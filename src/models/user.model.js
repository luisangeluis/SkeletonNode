// {
//     "id": "d9dbc589-36ff-4773-a77f-f0112834d7f4",
//     "first_name": "luis",
//     "last_name": "zepeda",
//     "email": "luis@correo.com",
//     "password": "$2b$10$ZPDohrvpVF6DE1HIYd4yTO/gmZkvD4/b50hPqOGdhNZ7WNJWioFd6",
//     "phone": "1234567890",
//     "birthday_date": "22/10/2000",
//     "rol": "normal",
//     "profile_image": "localhost:3000/api/v1/uploads1661728653826-proyecto.png",
//     "country": "mexico",
//     "active": true,
//     "verified": false
//   }

const { DataTypes } = require('sequelize');
const { validate } = require('uuid');
const { db } = require('../utils/database');

const Users = db.define('users', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'first_name'
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name'
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
    
  },
  birthdayDate: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field:'birthday_date'

  },
  dni:{
    type: DataTypes.STRING
  },
  roleId: {
    allowNull: false,
    type: DataTypes.UUID,
    field:'role_id'
  },
  address:{
    type: DataTypes.STRING
  },
  profileImage: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    },
    field:'profile_image'
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING,

  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'active' //active, non-active, deleted, suspended
  },
  verified: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at'
    }

});

module.exports = Users;


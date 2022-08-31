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
  first_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  last_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING(30),
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
  birthday_date: {
    allowNull: false,
    type: DataTypes.DATEONLY,

  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'normal'
  },
  profile_image: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    }
  },
  country: {
    allowNull: false,
    type: DataTypes.STRING,

  },
  is_active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  verified: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

});

module.exports =Users;


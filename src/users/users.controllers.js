const uuid = require('uuid');
const { hashPassword } = require('../utils/crypt');

const userDB = [
  {
    "id": "d9dbc589-36ff-4773-a77f-f0112834d7f4",
    "first_name": "luis",
    "last_name": "zepeda",
    "email": "luis@correo.com",
    "password": "$2b$10$ZPDohrvpVF6DE1HIYd4yTO/gmZkvD4/b50hPqOGdhNZ7WNJWioFd6",
    "phone": "1234567890",
    "birthday_date": "22/10/2000",
    "rol": "normal",
    "profile_image": "a",
    "country": "mexico",
    "active": true,
    "verified": false
  },
  {
    "id": "6db40652-e47a-4edb-81c6-335a32923e00",
    "first_name": "angel",
    "last_name": "gonzalez",
    "email": "angel@correo.com",
    "password": "$2b$10$3utjg6sAnMzdW956.Vd2JeOxql.QCro4KELFqHiKTzmSkddiK1ZqW",
    "phone": "1234567890",
    "birthday_date": "22/10/1999",
    "rol": "normal",
    "profile_image": "a",
    "country": "mexico",
    "active": true,
    "verified": false
  }
];

const getAllUsers = () => {
  return userDB;
  //select * from users;
}

const getUserById = (id) => {
  const data = userDB.filter(item => item.id === id);
  return data.length > 0 ? data[0] : false;

}

const createUser = (data) => {
  const newUser = {
    id: uuid.v4(), //obligatorio
    first_name: data.first_name,//obligatorio
    last_name: data.last_name,//obligatorio
    email: data.email,//obligatorio y unico
    password: hashPassword(data.password),//obligatorio
    phone: data.phone ? data.phone : '',//unico
    birthday_date: data.birthday_date,//obligatorio
    rol: 'normal',//obligatorio y por defecto normal
    profile_image: data.profile_image ? data.profile_image : '',
    country: data.country,//obligatorio
    active: true,//obligatorio y por defecto true
    verified: false,//obligatorio y por defecto false
  }

  userDB.push(newUser);
  return newUser;
}

const editUser = (id, data) => {
  const index = userDB.findIndex(user => user.id === id);

  if (index !== -1) {
    userDB[index] = {
      id: id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: userDB[index].password,
      phone: data.phone,
      birthday_date: data.birthday_date,
      rol: data.rol,
      profile_image: data.profile_image ? data.profile_image : '',
      country: data.country,
      active: data.active,
      verified: false,
    }
    return userDB[index];
  } else {
    return createUser(data);
  }
}

const deleteUser = (id) => {
  const index = userDB.findIndex(user => user.id === id);

  if (index !== -1) {
    userDB.splice(index, 1);
    return true;
  } else {
    return false;
  }

}

const getUserByEmail = (email) => {
  const data = userDB.filter(item => item.email === email);
  return data.length > 0 ? data[0] : false;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  getUserByEmail
}

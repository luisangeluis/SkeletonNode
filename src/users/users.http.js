const userControllers = require('./users.controllers');

const getAll = (req, res) => {
  userControllers.getAllUsers()
    .then(response => {
      res.status(200).json({ items: response.length, users: response });
    })
    .catch(err => {
      res.status(400).json({ err })
    });
};

const getById = (req, res) => {
  const id = req.params.id;
  userControllers.getUserById(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(404).json({ message: `El usuario con el id ${id} no existe` });
    })


  // const data = userControllers.getUserById(id);

  // if (data) {
  //   res.status(200).json(data);
  // } else {
  //   res.status(404).json({ message: `El usuario con el id ${id} no existe` });
  // }
};

const register = (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).json({ message: 'Missing data' });
  }

  if (
    !data.firstName ||
    !data.lastName ||
    !data.email ||
    !data.password ||
    !data.birthdayDate ||
    !data.country
  ) {
    return res.status(400).json({
      message: 'All fields must be completed',
      fields: {
        first_name: 'string',
        last_name: 'string',
        email: 'example@example.com',
        password: 'string',
        birthday_date: 'DD/MM/YYYY',
        country: 'string',
      },
    });
  } else {
    userControllers.createUser(data)
      .then(response => {
        res.status(201).json({
          message: `User created sucefully with id:${response.id}`,
          user: response,
        })
      })
      .catch(err => {
        res.status(400).json({ message: err.errors[0].message })
      })

  }
};

const remove = (req, res) => {
  const id = req.params.id;
  userControllers.deleteUser(id)
    .then(response => {
      if (response) {
        return res.status(204).json();
      }
      else {
        return res.status(400).json({ message: 'Invalid Id' });
      }
    })
};

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.phone ||
    !data.rol ||
    !data.profile_image ||
    !data.birthday_date ||
    !data.country ||
    !data.active
  ) {
    return res.status(400).json({
      message: 'All fields must be completed',
      fields: {
        first_name: 'string',
        last_name: 'string',
        email: 'example@example.com',
        phone: '+521234567890',
        rol: 'normal',
        profile_image: 'example.com/image/example.png',
        birthday_date: 'DD/MM/YYYY',
        country: 'string',
        active: true,
      },
    });
  } else {
    const response = userControllers.editUser(id, data);

    res.status(200).json({
      message: 'User edited succesfully',
      user: response,
    });
  }
};

const editMyUser = (req, res) => {
  const id = req.user.id;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.phone ||
    !data.profile_image ||
    !data.birthday_date ||
    !data.country ||
    !data.active
  ) {
    return res.status(400).json({
      message: 'All fields must be completed',
      fields: {
        first_name: 'string',
        last_name: 'string',
        email: 'example@example.com',
        password: 'string',
        phone: '+521234567890',
        rol: 'normal',
        profile_image: 'example.com/image/example.png',
        birthday_date: 'DD/MM/YYYY',
        country: 'string',
        active: true,
      },
    });
  } else {
    const response = userControllers.editUser(id, data);

    res.status(200).json({
      message: 'User edited succesfully',
      user: response,
    });
  }
};

const getMyUser = (req, res) => {
  const id = req.user.id;
  const data = userControllers.getUserById(id);

  if (data) {
    res.status(200).json({ data });
  } else {
    res.status(404).json({ message: `The user with ${id} doesn't exist` });
  }
};

const removeMyUser = (req, res) => {
  const id = req.user.id;
  const data = userControllers.deleteUser(id);

  if (data) {
    return res.status(204).json();
  } else {
    return res.status(400).json({ message: 'Invalid ID' });
  }
};

const postProfileImg = (req, res) => {
  const userId = req.user.id;
  const imgPath = req.hostname + ':3000' + '/api/v1/uploads/' + req.file.filename;
  const data = userControllers.editProfileImg(userId, imgPath);

  res.status(200).json(data);

}
module.exports = {
  getAll,
  getById,
  register,
  remove,
  edit,
  editMyUser,
  getMyUser,
  removeMyUser,
  postProfileImg
};

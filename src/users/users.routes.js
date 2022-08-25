const router = require('express').Router();
//PARA PROTEGER LAS RUTAS
const passport = require('passport');
require('../middleware/auth.middleware')(passport);

const usersServices = require('./users.http');

router.route('/') //* /api/v1/users/
  .get(usersServices.getAll)
  .post(usersServices.register)

  //TO DO GET Y DELETE
router.route('/me')
  .put(passport.authenticate('jwt', { session: false }), usersServices.editMyUser)

router.route('/:id')
  .get(usersServices.getById)
  .delete(usersServices.remove)
  .put(usersServices.edit)

exports.router = router;
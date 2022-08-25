const router = require('express').Router();
//PARA PROTEGER LAS RUTAS
const passport = require('passport');
const { roleAdminMiddleware } = require('../middleware/adminRole.middleware');
require('../middleware/auth.middleware')(passport);

const usersServices = require('./users.http');

router
  .route('/') //* /api/v1/users/
  .get(usersServices.getAll)

//TO DO GET Y DELETE
router
  .route('/me')
  .put(passport.authenticate('jwt', { session: false }),usersServices.editMyUser)
  .get(passport.authenticate('jwt', { session: false }),usersServices.getMyUser)
  .delete(passport.authenticate('jwt', { session: false }),usersServices.removeMyUser);

router
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }),usersServices.getById)
  .delete(passport.authenticate('jwt', { session: false }),roleAdminMiddleware,usersServices.remove)
  .put(passport.authenticate('jwt', { session: false }),roleAdminMiddleware,usersServices.edit);

exports.router = router;

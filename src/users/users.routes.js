const router = require('express').Router();
//PARA PROTEGER LAS RUTAS
const passport = require('passport');
const { roleAdminMiddleware } = require('../middleware/adminRole.middleware');
const { upload } = require('../utils/multer');
require('../middleware/auth.middleware')(passport);

const usersServices = require('./users.http');

router
  .route('/') //* /api/v1/users/
  .get(usersServices.getAll)

// router.post('/upload', upload.single('image'), (req, res) => {
//   res.status(200).json({
//     message: 'Image uploaded succesfully',
//     data: req.file
//   });
// })
//TO DO GET Y DELETE
router
  .route('/me')
  .put(passport.authenticate('jwt', { session: false }), usersServices.editMyUser)
  .get(passport.authenticate('jwt', { session: false }), usersServices.getMyUser)
  .delete(passport.authenticate('jwt', { session: false }), usersServices.removeMyUser);

router
  .route('/me/profile-img')
  .post(passport.authenticate('jwt', { session: false }),upload.single('profile_img'),)

router
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), usersServices.getById)
  .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, usersServices.remove)
  .put(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, usersServices.edit);

exports.router = router;

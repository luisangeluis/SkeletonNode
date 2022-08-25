//Dependencies
const express = require('express');
const passport = require('passport');
const { verbMiddleware } = require('./middleware/examples/verbs');
require('./middleware/auth.middleware')(passport);
//Archivos de rutas
const usersRouter = require('./users/users.routes').router
const authRouter = require('./auth/auth.routes').router
//Configuraciones iniciales
const app = express();
//para que el body de la peticion no salga undefined
app.use(express.json());

app.get('/', verbMiddleware,(req, res) => {
  res.status(200).json({ message: 'status ok' })
})

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);

app.get('/ejemplo',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({ message: 'Felicidades, tienes credenciales para entrar aqui',email:req.user.email });
  })

app.listen(3000, () => {
  console.log('server started at port:3000');
});

module.exports={
  app
}
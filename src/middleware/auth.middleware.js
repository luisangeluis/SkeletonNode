const Users = require("../models/user.model");
const { getUserById } = require("../users/users.controllers");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: "academlo" // debe estar en una variable de entorno
  };
  passport.use(
    new JwtStrategy(opts, (decoded, done) => {
      Users.find({ where: { id: decoded.id } }, (error, user) => {
        if (error)
          return done(error, false);
        if (user)
          return done(null, user);
        else
          return done(null, false);
      })

      // const data = getUserById(decoded.id);

      // if (data) {
      //   console.log("decoded jwt", decoded);
      //   return done(null, decoded); // decoded sera el que retornaremos cuando se ejecute exitosamente la autenticacion
      // } else {
      //   return done(null, false);

      // }
    })
  );
};
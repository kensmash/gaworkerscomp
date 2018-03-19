const passport = require("passport");
const User = require("../models/user");
const keys = require("../config/keys");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

//Create local strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  //verify username and password
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    //compare passwords
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: keys.secret
};

//Create JwtStrategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //See if user ID in payload argument exists in database
  User.findById(payload.sub, function(err, user) {
    //error
    if (err) return done(err, false);
    //no error
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//Tell Passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

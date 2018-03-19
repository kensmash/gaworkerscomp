const jwt = require("jwt-simple");
const User = require("../models/user");
const keys = require("../config/keys");

tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
};

exports.signin = (req, res) => {
  res.send({ token: tokenForUser(req.user), username: req.user.firstname });
};

exports.signup = (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }
  //see if a user with the given email exists
  User.findOne({ email: email }, (error, existingUser) => {
    if (error) {
      return next(error);
    }
    //if a user with email exists, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }
    //if email does not exist, create and save user record
    const user = new User({
      email: email,
      password: password,
      firstname: "",
      lastname: ""
    });
    user.save(error => {
      if (error) {
        return next(error);
      }
      //respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};

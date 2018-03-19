const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

//Define the model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  firstname: String,
  lastname: String,
});

//On Save hook, encrypt password
userSchema.pre("save", function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });
});

//compare passwords on login
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

//create the model
const User = mongoose.model("user", userSchema);

//export
module.exports = User;

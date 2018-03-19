const passportService = require("../services/passport");
const passport = require("passport");

module.exports = {
  requireSignin: passport.authenticate("local", { session: false }),
  requireAuth: passport.authenticate("jwt", { session: false })
};

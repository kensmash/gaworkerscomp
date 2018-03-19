const AuthenticationController = require("../controllers/authController");
const { requireSignin } = require("../middleware/authMiddleware");

module.exports = app => {
  app.post("/api/signup", AuthenticationController.signup);
  app.post("/api/signin", requireSignin, AuthenticationController.signin);
};

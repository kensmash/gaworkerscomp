const authorController = require("../controllers/authorController");
const { requireAuth } = require("../middleware/authMiddleware");

module.exports = app => {
  app.get("/api/authors", authorController.fetchall);
  app.get("/api/authors/page/:page", authorController.fetchpage);
  app.get("/api/authors/:id", authorController.fetchone);
  app.post("/api/authors/search", authorController.search);
  app.post("/api/authors", requireAuth, authorController.create);
  app.put("/api/authors/:id", requireAuth, authorController.edit);
  app.delete("/api/authors/:id", requireAuth, authorController.delete);
};

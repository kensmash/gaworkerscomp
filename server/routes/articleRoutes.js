const articleController = require("../controllers/articleController");
const { requireAuth } = require("../middleware/authMiddleware");

module.exports = app => {
  app.get("/api/articles/page/:page", articleController.fetchpage);
  app.get("/api/admin/articles/page/:page", articleController.fetchadminpage);
  app.get("/api/articles/:id", articleController.fetchone);
  app.post("/api/articles/searchtitle", articleController.searchtitle);
  app.post("/api/articles/searchauthor", articleController.searchauthor);
  app.post("/api/articles", requireAuth, articleController.create);
  app.put("/api/articles/:id", requireAuth, articleController.edit);
  app.delete("/api/articles/:id", requireAuth, articleController.delete);
};

const Article = require("../models/article");

module.exports = {
  async fetchpage(req, res) {
    const perPage = 10;
    const page = req.params.page || 1;
    try {
      const articles = await Promise.all([
        Article.find({ published: { $eq: true } })
          .sort({ dateadded: -1 })
          .skip(perPage * page - perPage)
          .limit(perPage)
          .populate("author"),
        Article.find({ published: { $eq: true } }).count()
      ]);
      const articleResults = articles[0];
      const articleCount = articles[1];
      res.send({
        articles: articleResults,
        pages: Math.ceil(articleCount / perPage),
        totalrecords: articleCount
      });
    } catch (err) {
      res.status(422).send(err);
    }
  },

  async fetchadminpage(req, res) {
    const perPage = 10;
    const page = req.params.page || 1;
    try {
      const articles = await Promise.all([
        Article.find()
          .sort({ dateadded: -1 })
          .skip(perPage * page - perPage)
          .limit(perPage)
          .populate("author"),
        Article.count()
      ]);
      const articleResults = articles[0];
      const articleCount = articles[1];
      res.send({
        articles: articleResults,
        pages: Math.ceil(articleCount / perPage),
        totalrecords: articleCount
      });
    } catch (err) {
      res.status(422).send(err);
    }
  },

  async fetchone(req, res) {
    const articleId = req.params.id;
    const article = await Article.findOne({ _id: articleId }).populate(
      "author"
    );
    res.send(article);
  },

  async searchtitle(req, res) {
    const articleTitle = req.body.searchterm;
    try {
      const results = await Article.find({
        $text: { $search: articleTitle },
        published: { $eq: true }
      })
        .sort({ dateadded: -1 })
        .limit(20)
        .populate("author");
      res.send(results);
    } catch (err) {
      res.status(422).send(err);
    }
  },

  async searchauthor(req, res) {
    const authorId = req.body.authorid;
    try {
      const results = await Article.find({
        author: authorId,
        published: { $eq: true }
      })
        .sort({ dateadded: -1 })
        .limit(20)
        .populate("author");
      res.send(results);
    } catch (err) {
      res.status(422).send(err);
    }
  },

  async create(req, res) {
    const { title, subhead, content, footnotes, author, published } = req.body;
    const article = new Article({
      title,
      subhead,
      content,
      footnotes,
      author,
      published,
      dateadded: Date.now(),
      dateupdated: Date.now()
    });
    try {
      const newArticle = await article.save();
      res.send(newArticle);
    } catch (err) {
      res.status(422).send(err);
    }
  },

  async edit(req, res) {
    const articleId = req.params.id;
    const { title, subhead, content, footnotes, author, published } = req.body;
    try {
      const editArticle = await Article.findOneAndUpdate(
        { _id: articleId },
        {
          $set: {
            title,
            subhead,
            content,
            author,
            footnotes,
            published,
            dateupdated: Date.now()
          }
        },
        { new: true }
      );
      res.send(editArticle);
    } catch (err) {
      res.status(422).send(err);
    }
  },

  async delete(req, res) {
    const articleId = req.params.id;
    try {
      const deleteArticle = await Article.findByIdAndRemove({
        _id: articleId
      });
      res.send(deleteArticle);
    } catch (err) {
      res.status(422).send(err);
    }
  }
};

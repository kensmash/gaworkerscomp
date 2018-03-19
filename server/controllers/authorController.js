const Author = require("../models/author");

module.exports = {
  async fetchpage(req, res) {
    const perPage = 10;
    const page = req.params.page || 1;
    try {
      const authors = await Promise.all([
        Author.find({})
          .sort({ name: 1 })
          .skip(perPage * page - perPage)
          .limit(perPage),
        Author.count()
      ]);
      const authorResults = authors[0];
      const authorCount = authors[1];
      res.send({
        authors: authorResults,
        pages: Math.ceil(authorCount / perPage),
        totalrecords: authorCount
      });
    } catch (err) {
      res.status(422).send(err);
    }
  },

  async fetchone(req, res) {
    const authorId = req.params.id;
    const author = await Author.findOne({ _id: authorId });
    res.send(author);
  },

  async fetchall(req, res) {
    const allauthors = await Author.find({});
    res.send({ authors: allauthors });
  },

  async search(req, res) {
    const authorName = req.body.name;
    try {
      const results = await Author.find({ $text: { $search: authorName } })
        .sort({ name: 1 })
        .limit(20);
      res.send(results);
    } catch (err) {
      res.status(422).send(err);
    }
  },

  async create(req, res) {
    const { name, lawfirm, bio } = req.body;
    const author = new Author({
      name,
      lawfirm,
      bio
    });
    try {
      const newAuthor = await author.save();
      res.send(newAuthor);
    } catch (err) {
      res.status(422).send(err);
    }
  },

  async edit(req, res) {
    const authorId = req.params.id;
    const { name, lawfirm, bio } = req.body;
    try {
      const editAuthor = await Author.findOneAndUpdate(
        { _id: authorId },
        {
          $set: {
            name,
            lawfirm,
            bio
          }
        },
        { new: true }
      );
      res.send(editAuthor);
    } catch (err) {
      res.status(422).send(err);
    }
  },

  async delete(req, res) {
    const authorId = req.params.id;
    try {
      const deleteAuthor = await Author.findByIdAndRemove({
        _id: authorId
      });
      res.send(deleteAuthor);
    } catch (err) {
      res.status(422).send(err);
    }
  }
};

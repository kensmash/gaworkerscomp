const mongoose = require("mongoose");
const { Schema } = mongoose;
require("mongoose-html").loadType(mongoose);
var Html = mongoose.Types.Html;

const articleSchema = new Schema({
  title: { type: String, required: true, minlength: 2, trim: true },
  subhead: { type: String, trim: true, default: "null" },
  content: {
    type: Html,
    required: true,
    setting: {
      allowedTags: [
        "p",
        "b",
        "i",
        "em",
        "strong",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "ol",
        "ul",
        "li",
        "sub",
        "sup",
        "a"
      ],
      allowedAttributes: {
        a: ["href"]
      }
    }
  },
  author: [{ type: Schema.Types.ObjectId, ref: "author" }],
  published: { type: Boolean, default: false },
  footnotes: { type: Array, default: [] },
  dateadded: Date,
  dateupdated: Date
});

//Create the model class
const Article = mongoose.model("article", articleSchema);

//Export the model
module.exports = Article;

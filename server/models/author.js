const mongoose = require("mongoose");
const { Schema } = mongoose;
require("mongoose-html").loadType(mongoose);
var Html = mongoose.Types.Html;

const authorSchema = new Schema({
  name: { type: String, required: true, minlength: 2, trim: true },
  lawfirm: { type: String, required: true, minlength: 2, trim: true },
  bio: {
    type: Html,
    required: true,
    setting: {
      allowedTags: ["p", "b", "i", "em", "strong", "a"],
      allowedAttributes: {
        a: ["href"]
      }
    }
  }
});

//Create the model class
const Author = mongoose.model("author", authorSchema);

//Export the model
module.exports = Author;

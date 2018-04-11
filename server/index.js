const express = require("express");
const { Nuxt, Builder } = require("nuxt");
var cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;
//redirect to https on live site
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;

//connect mongoose to MongoDB
mongoose.connect(keys.mongoURI);

app.set("port", port);

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  var whitelist = [
    "https://www.gaworkerscomp.com",
    "http://www.gaworkerscomp.com"
  ];
  var corsOptions = {
    origin: function(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  };

  app.use(cors());
  // Don't redirect if the hostname is `localhost:port` or the route is `/insecure`
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/]));
  app.use(bodyParser.json({ type: "*/*" }));

  //Routes
  require("./routes/authRoutes")(app);
  require("./routes/authorRoutes")(app);
  require("./routes/articleRoutes")(app);

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  console.log("Server listening on http://" + host + ":" + port); // eslint-disable-line no-console
}
start();

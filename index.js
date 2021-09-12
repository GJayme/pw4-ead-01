var express = require("express");
var i18n = require("i18n");

var app = express();
var port = "8080";

i18n.configure({
  defaultLocale: "pt-BR",
  locales: ["pt-BR", "en-US", "de"],
  directory: "./locales",
  extension: ".json",
  cookie: "lang",
});

app.use(i18n.init);

app.use((req, res, next) => {
  console.log(`Idiomas suportados: ${req.acceptsLanguages()}`);
  let local = req.acceptsLanguages()[0];
  req.setLocale(local);
  res.setLocale(local);
  next();
});

app.get("/", (req, res) => {
  res.send(res.__("hello"));
});

app.listen(port, () => {
  console.log("Port: " + port);
});

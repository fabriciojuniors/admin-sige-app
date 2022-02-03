const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(__dirname + "/dist/admin-sige-app"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/admin-sige-app/index.html"));
});
app.listen(process.env.PORT || 8080);
console.log(`App rodando na porta ${process.env.PORT || 8080}`);

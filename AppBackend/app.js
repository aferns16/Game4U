const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
var cors = require("cors");
const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "1236")
);
const session = driver.session();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*const personName = 'Alice';
const resultPromise = session.run(
  'CREATE (a:Person {name: $name}) RETURN a',
  {name: personName}
);*/

app.post("/getGames", function(req, res) {
  var platform = req.body.platform;
  var search = req.body.busqueda;
  var result = [];
  var query = "MATCH (v: Videogame)";
  if (platform != "Cualquiera") {
    query = query.concat("WHERE v.platform = '" + platform + "'");
  }

  if (search != "" && platform != "Cualquiera") {
    query = query.concat(" AND (v.name CONTAINS '" + search + "') ");
  } else if (search != "") {
    query = query.concat("WHERE (v.name CONTAINS '" + search + "') ");
  }
  query = query.concat(
    "RETURN v AS videogame ORDER BY v.year DESC, v." +
      req.body.critic +
      " DESC LIMIT 20"
  );
  const resultPromise = session.run(query).subscribe({
    onNext: function(record) {
      if (record.get("videogame").properties.year == undefined) {
        var element = record.get("videogame").properties;
        element.year = { low: "--" };
        result.push(element);
      } else {
        result.push(record.get("videogame").properties);
      }
    },
    onCompleted: function() {
      if (result.length < 1) result = [{ message: "Error" }];
      res.send(result);
      console.log(result);
      session.close();
    },
    onError: function(error) {
      console.log(error);
    }
  });
});

app.listen(port, function() {
  console.log("Example app listening on port " + 3000);
});

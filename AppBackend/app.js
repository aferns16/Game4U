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
  var critic = req.body.critic;
  var limit = req.body.limit;
  var genre = req.body.genre;
  var modern = req.body.modern;
  var result = [];
  if (genre != "Cualquiera") {
    query = "MATCH(v: Videogame) –[* 1] - (: Genre { name: '" + genre + "' })";
  } else {
    query = "MATCH (v: Videogame)";
  }
  if (platform != "Cualquiera") {
    query = query.concat("WHERE v.platform = '" + platform + "'");
  }

  if (search != "" && platform != "Cualquiera") {
    query = query.concat(" AND (v.name CONTAINS '" + search + "') ");
  } else if (search != "") {
    query = query.concat("WHERE (v.name CONTAINS '" + search + "') ");
  }

  if (modern) {
    query = query.concat(
      "RETURN v AS videogame ORDER BY v.year DESC, v." +
        critic +
        " DESC LIMIT " +
        limit
    );
  } else {
    query = query.concat(
      "RETURN v AS videogame ORDER BY v." +
        critic +
        " DESC, v.year DESC LIMIT " +
        limit
    );
  }

  const resultPromise = session.run(query).subscribe({
    onNext: function(record) {
      var element = record.get("videogame").properties;

      if (element.platform == "PS") {
        element.color = "#cab9b6";
      } else if (element.platform == "PS2") {
        element.color = "#b3a3a0";
      } else if (element.platform == "PS3") {
        element.color = "#8b8382";
      } else if (element.platform == "PS4") {
        element.color = "#736d6d";
      } else if (element.platform == "PSP") {
        element.color = "#afa9a9";
      } else if (element.platform == "GB") {
        element.color = "#6c6d9b";
      } else if (element.platform == "GBA") {
        element.color = "#8586b8";
      } else if (element.platform == "SNES") {
        element.color = "#cccce5";
      } else if (element.platform == "N64") {
        element.color = "#afafaf";
      } else if (element.platform == "Wii") {
        element.color = "#d9eeea";
      } else if (element.platform == "DS") {
        element.color = "#d5d5d5";
      } else if (element.platform == "3DS") {
        element.color = "#9af4ed";
      } else if (element.platform == "WiiU") {
        element.color = "#539993";
      } else if (element.platform == "X360") {
        element.color = "#9eff86";
      } else if (element.platform == "XOne") {
        element.color = "#5ba24c";
      } else {
        element.color = "#b196b7";
      }

      if (element.year == undefined) {
        element.year = { low: "--" };
        result.push(element);
      } else {
        result.push(element);
      }
    },
    onCompleted: function() {
      if (result.length < 1) result = [{ message: "Error" }];
      res.send(result);
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

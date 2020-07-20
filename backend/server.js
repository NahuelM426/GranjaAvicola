express = require("express");
bodyParser = require("body-parser");
var cors = require('cors');
const GalponHome = require("./src/mongo/galponHome");

// GalponHome = require("./src/mongo/galponHome");
var homes = {}

function register(home) {
  console.log(`registering handlers for ${home.type}`)
  homes[home.type] = home 
}

function init() {
  var server = express();
  server.use(bodyParser.json());

  server.use("(/:type/*)|(/:type)", (req, res, next) => {
      if (!homes[req.params.type]) {
          console.log(` home de ${req.params.type} no existe`  )
          res.status(404).end()
      }
      else {
        console.log(` home de ${req.params.type} si existe `  )
        next()
      }
  })

  server.use(cors())

  server.get("/:type", (req, res) => {
    home = homes[req.params.type]
    home.all((allObjects) => {
        res.json(allObjects) 
        res.end() })       
  })

  server.get("/:type/:id", (req, res) => {
    home = homes[req.params.type]
    home.get(req.params.id, (myObject) => { 
      res.json(myObject) 
      res.end() })  
  })

  server.put("/:type", (req, res) => {
    home = homes[req.params.type]
    console.log("agragar",req.body)
    home.update(req.body)
    res.status(204).end();  
  })

  server.put("/galpones/:id", (req, res) => {
    galponId = req.params.id;
    tx = req.body;
    console.log("tx",tx)
    galponHome.agregarTx(galponId, tx, (result, galpon) => {
      if (result == "error") {
        res.status(400).end();
      } else {
        res.status(200).send(galpon);
      }
    });
  });
  server.put("/galpones/recoleccion/:id", (req, res) => {
    galponId = req.params.id;
    tx = req.body;
    console.log("tx",tx)
    galponHome.agregarRecolecion(galponId, tx, (result, galpon) => {
      if (result == "error") {
        res.status(400).end();
      } else {
        res.status(200).send(galpon);
      }
    });
  });
  server.post("/galpones/:id", (req, res) => {
    galponHome = new GalponHome(db)
    galponId = req.params.id
    console.log("servel",galponId)
    tx = req.body
    galponHome.agregarTx(galponId, tx, (result, galpon) => {
      if (result == "error") {
        res.status(400).end();
      } else {
        res.status(200).send(galpon);
      }
    }) 
  })

  server.post("/:type", (req, res) => {
    home = homes[req.params.type]
    home.insert(req.body)
    res.status(204).end();  
  })

  server.delete("/galpones/:id", (req, res) => {
    galponId = req.params.id;
    console.log("erro",galponId)
    galponHome.borrarGalpon(galponId, (result, galpon) => {
      if (result == "error") {
        res.status(400).end();
      } else {
        res.status(200);
      }
    });
  });
  server.listen(8888, () => {
    console.log("Server running on port 8888");
  });
}

exports.init = init;
exports.register = register;

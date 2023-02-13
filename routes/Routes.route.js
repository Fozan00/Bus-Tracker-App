
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
// require Schema
let RoutesSchema = require('../models/Route');


// Making Post route for requesting data from api
// Storing data to database
router.route('/createRoute').post((req, res, next) => {
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  // Making http GET request to bus tracker
  endpoint = "http://ctabustracker.com/bustime/api/v2/getroutes?key=ujAhaYu9dy6TAF2VgMLWK5nnV&format=json";
  let httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", endpoint);
  httpRequest.send();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4) {
      if (httpRequest.status == 200) {
        // If request is successful
        var obj = JSON.parse(httpRequest.responseText);
        var Pdata = Object.values(obj);
        Pdata = Pdata[0];
        // Traversing through data array
        for (let i = 0; i < Pdata.routes.length; i++) {
          // Storing data according to the schema
          RoutesSchema.create(Pdata.routes[i], (error, data) => {
            if (error) {
              return next(error)
            } else {
              console.log(data)

            }
          })
        }
        // Post request respose
        res.json("Data Loaded Successfully");
      }
      else {
        console.log(httpRequest.status);
      }
    }
  }



});
// Making route for GET request based on id

router.route('/:rt').get((req, res) => {

  RoutesSchema.find({ rt: req.params.rt }, (error, data) => {
    if (error) {
      res.send("Error Finding");
    } else {
      res.json(data)
    }
  })
})

// Making route for GET request of complete data
router.route('/').get((req, res) => {

  RoutesSchema.find((error, data) => {
    if (error) {
      res.json("Error Finding");
    } else {
      res.json(data)
    }
  })
})
// Making route for updating Data involving two parameters
router.route('/updateRoute/:rt/:newid').put((req, res, next) => {
  var query = { 'rt': req.params.rt };
  RoutesSchema.findOneAndUpdate(query, {
    rt: req.params.newid

  }, (error, data) => {
    if (error) {
      res.send("error");
      console.log(error)
    } else {
      console.log(req.params.rt);
      res.json(data)
      console.log('Route successfully updated')
    }
  })
})

// Making route for Deleting Data using id

router.route('/deleteRoute/:rt').delete((req, res, next) => {
  var query = { 'rt': req.params.rt };
  RoutesSchema.findOneAndDelete(query, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = router;
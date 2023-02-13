
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

// require Schema
let PatternSchema = require('../models/Pattern');

// Making Post route for requesting data from api
// Storing data to database
router.route('/createPattern').post((req, res, next) => {
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  // Making http GET request to bus tracker
  endpoint = "https://ctabustracker.com/bustime/api/v2/getpatterns?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&pid=954&format=json";
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
        for (let i = 0; i < Pdata.ptr.length; i++) {
            // Storing data according to the schema
            PatternSchema.create(Pdata.ptr[i], (error, data) => {
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
router.route('/:pid').get((req, res) => {

    PatternSchema.find({ pid: req.params.pid }, (error, data) => {
    if (error) {
      res.send("Error Finding");
    } else {
      res.json(data)
    }
  })
})
// Making route for GET request of complete data
router.route('/').get((req, res) => {

    PatternSchema.find((error, data) => {
    if (error) {
      res.json("Error Finding");
    } else {
      res.json(data)
    }
  })
})
// Making route for updating Data involving two parameters
router.route('/updatePattern/:pid/:newid').put((req, res, next) => {
  var query = { 'pid': req.params.pid };
  PatternSchema.findOneAndUpdate(query, {
    pid: req.params.newid

  }, (error, data) => {
    if (error) {
      res.send("error");
      console.log(error)
    } else {
      console.log(req.params.pid);
      res.json(data)
      console.log('Pattern updated successfully !')
    }
  })
})
// Making route for Deleting Data using id
router.route('/deletePattern/:pid').delete((req, res, next) => {
  var query = { 'pid': req.params.pid };
  PatternSchema.findOneAndDelete(query, (error, data) => {
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
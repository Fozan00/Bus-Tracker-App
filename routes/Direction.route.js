

let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

// require Schema
let DirectionSchema = require('../models/Direction');

// Making Post route for requesting data from api
// Storing data to database
router.route('/createDirection').post((req, res, next) => {
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  // Making http GET request to bus tracker
  endpoint = "http://ctabustracker.com/bustime/api/v2/getdirections?key=ujAhaYu9dy6TAF2VgMLWK5nnV&rt=20&format=json";
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
        // Making object to store store direction bothways
        const directionObject = {
          dir1: Pdata.directions[0].dir,
          dir2: Pdata.directions[1].dir
        };
        console.log(directionObject);

        // Storing data according to the schema
        DirectionSchema.create(directionObject, (error, data) => {
          if (error) {
            return next(error)
          } else {
            console.log(data)

          }
        })
        // Post request respose
        res.json("Data Loaded Successfully");
      }
      else {
        console.log(httpRequest.status);
      }
    }
  }



});
// Making route for GET request of complete data

router.route('/').get((req, res) => {

  DirectionSchema.find((error, data) => {
    if (error) {
      res.json("Error Finding");
    } else {
      res.json(data)
    }
  })
})

// Making route for updating Data involving two parameters
router.route('/updateDirection/:id/:newDir').put((req, res, next) => {
  DirectionSchema.findByIdAndUpdate(req.params.id, {
    dir1: req.params.newDir

  }, (error, data) => {
    if (error) {
      res.send("error");
      console.log(error)
    } else {
      console.log(req.params.id);
      res.json(data)
      console.log('Direction updated successfully !')
    }
  })
})
// Making route for Deleting Data using id

router.route('/deleteDirection/:id').delete((req, res, next) => {
  DirectionSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
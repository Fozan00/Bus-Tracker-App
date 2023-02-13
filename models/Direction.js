const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let DirectionSchema = new Schema({
    dir1: {
    type: String
  },
  dir2: {
    type: String
  },
 
 
}, {
    collection: 'Directions'
  })
module.exports = mongoose.model('Direction', DirectionSchema)
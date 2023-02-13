const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let RoutesSchema = new Schema({
    rt: {
    type: String
  },
  rtnm: {
    type: String
  },
  rtclr: {
    type: String
  },
  rtdd: {
    type: String
  },
 
}, {
    collection: 'Routes'
  })
module.exports = mongoose.model('Route', RoutesSchema)
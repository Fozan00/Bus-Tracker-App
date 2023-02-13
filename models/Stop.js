const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Getstop = new Schema({
    stpid: {
    type: String
  },
  stpnm: {
    type: String
  },
  lat: {
    type:mongoose.Types.Decimal128
  },
  lon: {
    type:mongoose.Types.Decimal128
  },

}, {
    collection: 'Stops'
  })
module.exports = mongoose.model('Stop', Getstop)
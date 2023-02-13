const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let timeSchema = new Schema({
  tm: {
    type: String
  },
}, {
    collection: 'Times'
  })
module.exports = mongoose.model('Time', timeSchema)
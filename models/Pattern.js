const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let GetPattern = new Schema({
  pid: {
    type: Number,
    required: [true, "PIDRequired"],
    unique: [true, "PID is Unique"]
    
  },
  ln: {
    type: Number
  },
  rtdir: {
    type: String
  },
  pt: [
    {
      seq: {
        type: Number,
        default: 0
      },
      lat: {
        type: Number,
        default: 0
      },
      lon: {
        type: Number,
        default: 0
      },
      typ: {
        type: String,
        default: null
      },
      stpid: {
        type: String,
        default: null
      },
      stpnm: {
        type: String,
        default: null
      },
      pdist: {
        type: Number,
        default: 0
      },

    }
  ]

},
  {
    collection: "Patterns"
  });
module.exports = mongoose.model('Pattern', GetPattern);
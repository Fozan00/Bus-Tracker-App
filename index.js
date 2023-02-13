let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');


const DirectionRoute = require('../i190507_A_Assignment_03/routes/Direction.route');
const Routesroute = require('../i190507_A_Assignment_03/routes/Routes.route');
const StopRoute = require('../i190507_A_Assignment_03/routes/Stop.route');
const VehicleRoute = require('../i190507_A_Assignment_03/routes/Vehicle.route');
const PatternRoute = require('../i190507_A_Assignment_03/routes/Pattern.route');

// Connecting mongoDB Database
mongoose
  .connect('mongodb://127.0.0.1:27017/BusTracker')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// Routes
app.use('/Stop', StopRoute);
app.use('/Direction', DirectionRoute);
app.use('/Pattern', PatternRoute);
app.use('/Route', Routesroute);
app.use('/Vehicle', VehicleRoute);


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})


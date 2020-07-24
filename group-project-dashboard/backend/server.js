const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
const app = require('express')();

const API_PORT = 3001;

var login_details = [{
  username: "username",
  password: "password"
}]


let server = require('http').Server(app);
app.use(cors());
let io = require('socket.io')(server);
const router = express.Router();



// launch our backend into a port
server.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

var webClient = null;

var clients = [];
var otherPlayers = [];

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://Alex:Team2VRGroup@group2-vr-i4w1s.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res, next) => {
  Data.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error)
      return next(error);

    } else {
      res.json(data)
      console.log(data)
      console.log('Question updated successfully !')
    }
  })
})

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const {question1, question2, question3, question4, question5, question6, question7, question8, question9, question10 } = req.body;

  if (!question1) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.question1 = question1;
  data.question2 = question2;
  data.question3 = question3;
  data.question4 = question4;
  data.question5 = question5;
  data.question6 = question6;
  data.question7 = question7;
  data.question8 = question8;
  data.question9 = question9;
  data.question10 = question10;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

io.on('connection', function(socket){

  var currentPlayer = {};
  currentPlayer.name = 'unknownName';

  if (webClient !== null)
      webClient.emit("new_game", currentPlayer.name)
      
  socket.on("clientType", (data) => {
    if (data == "web") {
      webClient = socket;
      console.log("lecturer has connected");
    }
  })

  socket.on("login_details", (details) => {
    var found = false;
    login_details.forEach(detail => {
      if (detail.username == details[0] && detail.password)
        found = true;
    })

    socket.emit("login_success", found);
  })

  socket.on("getDetails", (data) => {
    socket.emit("details", login_details);
  })

  socket.on("save", (details) => {
    login_details = login_details.concat(details);
  })

  socket.on('player connect', function(){
    console.log(currentPlayer.name+ ' connected    socket.on (player connect)');
    for(var i = 0; i<clients.length; i++){
      var playerConnected = {
        name:clients[i].name,
      };
      socket.emit('player connect', playerConnected);
      console.log(currentPlayer.name+' is the current player and .....other player connected: '+JSON.stringify(playerConnected));
    }

  });

  socket.on('play', function(data){
    console.log(currentPlayer.name+ ' socket.on(play): ' + JSON.stringify(data));
    //if this is the first person to join the game init the other players
    currentPlayer = {
      name:data.name
    };
    clients.push(currentPlayer);
    // in current game, tell YOu that YOu have joined.
    console.log(currentPlayer.name + ' socket.on(play_: ' + JSON.stringify(currentPlayer));
    if (webClient !== null)
      webClient.emit("new_game", currentPlayer.name)
    
    socket.emit('play', currentPlayer);
    //in your current game, tell OTHER player about you...

    socket.broadcast.emit('other player connected', currentPlayer);
  });

  socket.on('disconnect', function(){
    if (webClient !== null)
      webClient.emit("gameDisconnect", currentPlayer.name);

    console.log(currentPlayer.name + ' has disconnected');
    socket.broadcast.emit('player disconnected', currentPlayer); 
    console.log(JSON.stringify(currentPlayer) + ' disconnected (JSON object)');
    for(var i = 0; i<clients.length; i++){
      if(clients[i].name === currentPlayer.name) {
        clients.splice(i,1);
      }
    }
  })

});

// append /api for our http requests
app.use('/api', router);


console.log('----------Server is running------------');


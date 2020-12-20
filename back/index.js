const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env'});

//create server
const app = express();

//connect to nodeSend DB
connectDB();

// Configure Cross Origin
app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

// Habilitar Cors
app.use(cors({origin: process.env.FRONT_URL}));

//app port
const port = process.env.PORT || 4000;

//enabled body-parser
app.use(express.json());

app.use( express.static('uploads') );

//users routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));

//listen port
app.listen( port, '0.0.0.0', () => {
    console.warn(`Listening port ${port}`)    
});
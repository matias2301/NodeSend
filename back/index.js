const express = require('express');
const connectDB = require('./config/db.js');

//create server
const app = express();

//connect to nodeSend DB
connectDB();

//app port
const port = process.env.PORT || 4000;

//enabled body-parser
app.use(express.json());

//users routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'))

//listen port
app.listen( port, '0.0.0.0', () => {
    console.log(`Listening port ${port}`)
});
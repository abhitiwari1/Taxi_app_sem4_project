const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectToDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const cors = require('cors');
app.use(cors());
app.use(cookieParser());


connectToDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);



module.exports = app;
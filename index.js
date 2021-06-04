const express = require('express');
const app = express();

// Import Routes
const authRoute = require('./routes/auth');

// Route Middlewares
app.use('/api/user', authRoute);


const PORT = 1111
app.listen(PORT, ()=>console.log('server is on port' + PORT));
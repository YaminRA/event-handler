if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// Initialize app
const app = express();
require('./database');

// App settings
app.set('port', process.env.PORT || 3000);

// Midlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// REST APIs
app.use('/api/events', require('./routes/events'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})
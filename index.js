'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const userRoutes = require('./routes/user-routes');
const cropDataRoutes = require('./routes/cropData-routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes.routes);
app.use('/data', cropDataRoutes.routes);

app.listen(config.port, () => console.log('API is running on http://localhost:' + config.port));
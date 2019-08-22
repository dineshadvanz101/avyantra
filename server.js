import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
require('custom-env').env()
const app = express();

const proutes = require('./routes/patientRoutes')

console.error(process.env.API_PORT)
const API_PORT = process.env.API_PORT || 8081;

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/patient',proutes)

require('./routes/loginUser')(app);
require('./routes/patient')(app);
require('./routes/get_tabs')(app);
// require('./routes/findUsers1')(app);
// require('./routes/deleteUser')(app);
// require('./routes/updateUser1')(app);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;

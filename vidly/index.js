const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers')
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connected to db'))
    .catch(err => console.log('could not connect to db'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
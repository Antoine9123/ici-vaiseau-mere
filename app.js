const express = require('express');

const app = express();
const PORT =  3001;

app.listen(PORT, () => console.log(`Running Express Server on ${PORT}`));

const homeRoute = require('./src/routes/mainRoutes');
app.use('/', homeRoute);
app.use(express.static('public'));

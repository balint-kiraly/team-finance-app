const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('static'));

require('./routing/entry')(app);
require('./routing/transaction')(app);
require('./routing/team')(app);

app.use((err, req, res, next) => {
    res.end('Something went wrong.');
    console.log(err);
});

app.listen(3000, () => {
    console.log("Listening on port:3000");
});
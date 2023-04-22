const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('static'));

require('./routing/entry')(app);
require('./routing/transaction')(app);
require('./routing/team')(app);

app.listen(3000, () => {
    console.log("Listening on port:3000");
});
const express = require('express');
const app = express();

//app.use(express.static('static'));

require('./routing/entry')(app);
require('./routing/transaction')(app);
require('./routing/team')(app);

const server = app.listen(3000, () => {
    console.log("Listening on port:3000");
});
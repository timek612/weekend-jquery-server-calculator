const express = require('express');


const app = express();
const PORT = 5000;

app.use(express.urlencoded({extended: true}));

app.use(express.static('server/public'));

app.listen(PORT, function() {
    console.log('listening on port', PORT);
    onStart();
})

let calculationHistory = [];

function onStart() {
    console.log('WORKING');
}


app.get('/history', function(req, res) {
    console.log('in GET /history');
    res.send(calculationHistory)
})
const express = require('express');


const app = express();
const PORT = 5000;

app.use(express.urlencoded({extended: true}));

app.use(express.static('server/public'));

app.listen(PORT, function() {
    console.log('listening on port', PORT);
    onStart();
})

let currentCalculation = [];
let calculationHistory = [];

function onStart() {
    console.log('WORKING');
}

function calculate(num1, num2) {
    console.log('in calculate');
    let total = 0;
    total = num1 *= num2;
    console.log(total);

}

app.get('/history', function(req, res) {
    console.log('in GET /history');
    res.send(calculationHistory)
});

app.get('/newData', function(req, res) {
    console.log('in GET /newData');
    res.send(currentCalculation);
})

app.post('/newData', function (req, res) {
    console.log('in POST /newData');
    console.log(req.body);
    currentCalculation.push(req.body);
    calculate(currentCalculation[0].numbers[0], currentCalculation[0].numbers[1]);

    res.sendStatus(200);
});
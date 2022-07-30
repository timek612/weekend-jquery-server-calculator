const express = require('express');

let total = 0;

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

function calculate(num1, num2, operator) {
    console.log('in calculate');
    
    if (operator === '+') {
        total = num1+=num2;
        console.log(total);
    }
    if (operator === '-') {
        total = num1-=num2;
        console.log(total);
    }
    if (operator === '*') {
        total = num1*=num2;
        console.log(total);
    }
    if (operator === '/') {
        total = num1/=num2;
        console.log(total);
    }
    return total;

}

app.get('/history', function(req, res) {
    console.log('in GET /history');
    console.log(calculationHistory);
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
    currentCalculation[0].numbers[0] = parseInt(currentCalculation[0].numbers[0]);
    currentCalculation[0].numbers[1] = parseInt(currentCalculation[0].numbers[1]);
    
    calculate(currentCalculation[0].numbers[0], currentCalculation[0].numbers[1], currentCalculation[0].operator);
    calculationHistory.push(total);
    total = 0;

    res.sendStatus(200);
});
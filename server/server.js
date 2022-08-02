const express = require('express');

let total = 0;

const app = express();
const PORT = process.env.PORT || 5000;

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

function calculate(num1, num2, operator) {// this is where all the math logic and calculations happen
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
    return total; // global total is updated

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

app.post('/newData', function (req, res) {// data comes in and gets sent to be calculated
    console.log('in POST /newData');
    console.log(req.body);
    currentCalculation.push(req.body);
    currentCalculation[0].numbers[0] = parseInt(currentCalculation[0].numbers[0]);
    currentCalculation[0].numbers[1] = parseInt(currentCalculation[0].numbers[1]);
    
    calculate(currentCalculation[0].numbers[0], currentCalculation[0].numbers[1], currentCalculation[0].operator);
    currentCalculation.pop();
    calculationHistory.push(total);
    currentCalculation.push(total);
    total = 0;

    res.sendStatus(200);
});

app.get('/currentSender', function (req, res) {
    console.log('in sender');
    res.send(currentCalculation);
    currentCalculation.pop();
})

app.post('/deleteData', function (req, res) {
    console.log('gonna delete this data');
    calculationHistory = [];
    console.log(calculationHistory);
    res.send(200);
})
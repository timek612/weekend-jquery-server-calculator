$(readyNow);
let numberInputsAndOperator = [];
let operator;
function readyNow() {
    getHistory(); //first get request on jquery ready
    $('#additionBtn').on('click', storeFirstInputAddition); //click listeners
    $('#subtractBtn').on('click', storeFirstInputSubtract);
    $('#multiplyBtn').on('click', storeFirstInputMultiply);
    $('#divisionBtn').on('click', storeFirstInputDivision);

    $('#equalsBtn').on('click', storeSecondInput);
    $('#clearBtn').on('click', clearHistory);
}

function getHistory() { // function grabs history of calculations
    console.log('in history');

    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function(responseFromServer) {//responseFromServer is calculationHistory
        console.log('History:', responseFromServer);

        renderToList(responseFromServer);
    })
}
function getCurrent() { // function gets current calculation info
    console.log('in getCurrent');
    $.ajax({
        method:'GET',
        url: '/currentSender'
    }).then(function(package) {
        console.log('Current calculation:', package);
        renderToHeader(package);
    })
}

function renderToList(history) { // function puts history onto DOM
    // console.log('in render');
    
    $('#history').empty();


    for (let taco of history) {
        $('#history').append(`
            <li>${taco}</li>
        `)
    }
};

function renderToHeader(package) { // function puts current calculation onto DOM
    $('#newestCalculation').empty();
    $('#newestCalculation').append(package)
    
}


function storeSecondInput() { // function packages inputs and sends to server
    let first = $('#firstNumInput').val();
    let second = $('#secondNumInput').val();
    if (first == "" || second == "" ) {
    alert('Both fields must take inputs');
   }
   else {
    
    console.log('in storeSecond');
    let secondNumber = parseInt($('#secondNumInput').val());
    $('#secondNumInput').val('');
    $('#firstNumInput').val('');
    console.log('Second number:', secondNumber);
    numberInputsAndOperator.push(secondNumber);
    console.log(numberInputsAndOperator);

    $.ajax({
        method: 'POST',
        url: '/newData',
        //data is req.body on the server
        data: {
            numbers: numberInputsAndOperator,
            operator: operator
        }
        
    }).then(function(responseFromServer) {
        console.log(responseFromServer); 

        getHistory();
        getCurrent();

    })
numberInputsAndOperator.pop();
numberInputsAndOperator.pop();
   }

}

function storeFirstInputAddition() {// function if addition
    operator = '+';
    console.log(operator);
    console.log('in storeFirst');
    let firstNumber = parseInt($('#firstNumInput').val());
    
    console.log('First number:', firstNumber);
    numberInputsAndOperator.push(firstNumber);

};

function storeFirstInputSubtract() {// function if subtraction
    operator = '-'
    console.log(operator);
    console.log('in storeFirst');
    let firstNumber = parseInt($('#firstNumInput').val());
  
    console.log('First number:', firstNumber);
    numberInputsAndOperator.push(firstNumber);

};

function storeFirstInputMultiply() {// function if multiplication
    operator = '*'
    console.log(operator);
    console.log('in storeFirst');
    let firstNumber = parseInt($('#firstNumInput').val());
   
    console.log('First number:', firstNumber);
    numberInputsAndOperator.push(firstNumber);

};

function storeFirstInputDivision() { // function if division
    operator = '/'
    console.log(operator);
    console.log('in storeFirst');
    let firstNumber = parseInt($('#firstNumInput').val());
    
    console.log('First number:', firstNumber);
    numberInputsAndOperator.push(firstNumber);

};

function clearHistory() { // clears current DOM data
    $('#history').empty();
    $('#newestCalculation').empty();

    $.ajax({
        method: 'POST',
        url: '/deleteData'
    }).then(function (response){
        console.log(response);
    })
}


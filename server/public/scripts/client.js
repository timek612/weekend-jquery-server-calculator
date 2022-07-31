$(readyNow);
let numberInputsAndOperator = [];
let operator;
function readyNow() {
    getHistory();
    $('#additionBtn').on('click', storeFirstInputAddition);
    $('#subtractBtn').on('click', storeFirstInputSubtract);
    $('#multiplyBtn').on('click', storeFirstInputMultiply);
    $('#divisionBtn').on('click', storeFirstInputDivision);

    $('#equalsBtn').on('click', storeSecondInput);
    $('#clearBtn').on('click', clearHistory);
}

function getHistory() {
    console.log('in history');

    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function(responseFromServer) {//responseFromServer is calculationHistory
        console.log('History:', responseFromServer);

        renderToList(responseFromServer);
    })
}
function getCurrent() {
    console.log('in getCurrent');
    $.ajax({
        method:'GET',
        url: '/currentSender'
    }).then(function(package) {
        console.log('Current calculation:', package);
        renderToHeader(package);
    })
}

function renderToList(history) {
    // console.log('in render');
    // $('#newestCalculation').empty(); //for the h2
    // $('#newestCalculation').append(currentCalculation);
    $('#history').empty();


    for (let taco of history) {
        $('#history').append(`
            <li>${taco}</li>
        `)
    }
};

function renderToHeader(package) {
    $('#newestCalculation').empty();
    $('#newestCalculation').append(package)
    
}


function storeSecondInput() {
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

function storeFirstInputAddition() {
    operator = '+';
    console.log(operator);
    console.log('in storeFirst');
    let firstNumber = parseInt($('#firstNumInput').val());
    
    console.log('First number:', firstNumber);
    numberInputsAndOperator.push(firstNumber);

};

function storeFirstInputSubtract() {
    operator = '-'
    console.log(operator);
    console.log('in storeFirst');
    let firstNumber = parseInt($('#firstNumInput').val());
  
    console.log('First number:', firstNumber);
    numberInputsAndOperator.push(firstNumber);

};

function storeFirstInputMultiply() {
    operator = '*'
    console.log(operator);
    console.log('in storeFirst');
    let firstNumber = parseInt($('#firstNumInput').val());
   
    console.log('First number:', firstNumber);
    numberInputsAndOperator.push(firstNumber);

};

function storeFirstInputDivision() {
    operator = '/'
    console.log(operator);
    console.log('in storeFirst');
    let firstNumber = parseInt($('#firstNumInput').val());
    
    console.log('First number:', firstNumber);
    numberInputsAndOperator.push(firstNumber);

};

function clearHistory() {
    $('#history').empty();
    $('#newestCalculation').empty();

    $.ajax({
        method: 'POST',
        url: '/deleteData'
    }).then(function (response){
        console.log(response);
    })
}


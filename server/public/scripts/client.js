
$(readyNow);
let array = [];
let operator;
function readyNow() {
    getHistory();
    $('#additionBtn').on('click', storeFirstInputAddition);
    $('#subtractBtn').on('click', storeFirstInputSubtract);
    $('#multiplyBtn').on('click', storeFirstInputMultiply);
    $('#divisionBtn').on('click', storeFirstInputDivision);

    $('#equalsBtn').on('click', storeSecondInput);

}

function getHistory() {
    console.log('in history');

    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function(responseFromServer) {
        console.log(responseFromServer);

        renderToDOM(responseFromServer)
    })
}

function renderToDOM(calculations) {
    console.log('in render');
    $('#newestCalculation').empty();
    $('#newestCalculation').append(calculations);


    for (let taco of calculations) {
        $('#history').append(`
            <li>${taco.math}</li>
        `)
    }
};


function storeSecondInput() {
    console.log('in storeSecond');
    let secondNumber = parseInt($('#secondNumInput').val());
    $('#secondNumInput').val('');
    console.log('Second number:', secondNumber);
    array.push(secondNumber);
    console.log(array);

    $.ajax({
        method: 'POST',
        url: '/newData',
        //data is req.body on the server
        data: {
            numbers: array,
            operator: operator
        }
        
    }).then(function(responseFromServer) {
        console.log(responseFromServer); 

        getHistory();
    })
array.pop();
array.pop();
}

function storeFirstInputAddition() {
    operator = '+';
    console.log(operator);
    console.log('in storeFirst');
    let firstNumber = parseInt($('#firstNumInput').val());
    $('#firstNumInput').val('');
    console.log('First number:', firstNumber);
    array.push(firstNumber);

};

function storeFirstInputSubtract() {
    operator = '-'
    console.log(operator);
    console.log('in storeFirst');
    let firstNumber = parseInt($('#firstNumInput').val());
    $('#firstNumInput').val('');
    console.log('First number:', firstNumber);
    array.push(firstNumber);

};

function storeFirstInputMultiply() {
    operator = '*'
    console.log(operator);
    console.log('in storeFirst');
    let firstNumber = parseInt($('#firstNumInput').val());
    $('#firstNumInput').val('');
    console.log('First number:', firstNumber);
    array.push(firstNumber);

};

function storeFirstInputDivision() {
    operator = '/'
    console.log(operator);
    console.log('in storeFirst');
    let firstNumber = parseInt($('#firstNumInput').val());
    $('#firstNumInput').val('');
    console.log('First number:', firstNumber);
    array.push(firstNumber);

};



$(readyNow);
let array = [];
function readyNow() {
    getHistory();
    $('#additionBtn').on('click', storeFirstInput);
    $('#subtractBtn').on('click', storeFirstInput);
    $('#multiplyBtn').on('click', storeFirstInput);
    $('#divisionBtn').on('click', storeFirstInput);

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

    for (let taco of calculations) {
        $('#history').append(`
            <li>${taco.math}</li>
        `)
    }
};

function storeFirstInput() {
    
    console.log('in storeFirst');
    let firstNumber = parseInt($('#firstNumInput').val());
    $('#firstNumInput').val('');
    console.log('First number:', firstNumber);
    array.push(firstNumber);
    // $.ajax({
    //     method: 'POST',
    //     url: '/newData',
    //     //data is req.body on the server
    //     data: {
    //         number: firstNumber
    //     }
    // }).then(function(responseFromServer) {
    //     console.log(responseFromServer); //this is the sendStatus response

    //     getHistory();
    // })

};

function storeSecondInput() {
    console.log('in storeSecond');
    let secondNumber = parseInt($('#secondNumInput').val());
    $('#secondNumInput').val('');
    console.log('Second number:', secondNumber);
    array.push(secondNumber);

    $.ajax({
        method: 'POST',
        url: '/newData',
        //data is req.body on the server
        data: {
            numbers: array
        }
        
    }).then(function(responseFromServer) {
        console.log(responseFromServer); 

        getHistory();
    })
array.pop();
array.pop();
}


// let expression = {
//     firstNumber: firstNumber,
//     secondNumber: secondNumber
// }
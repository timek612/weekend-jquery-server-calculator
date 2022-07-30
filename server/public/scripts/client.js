
$(readyNow);

function readyNow() {
    getHistory();
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
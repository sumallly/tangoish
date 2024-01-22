var sentWords = [];
var judgedCharJSON

function time() {
    document.getElementById("t1").innerHTML = new Date().toLocaleString();
}

function submit() {
    var inputData = $('#input_data').val();
    sentWords.unshift(inputData)
    document.getElementById("input").innerHTML = sentWords;
    $.ajax({
        type: 'POST',
        url: '/guess',
        data: {'guessWord': inputData }
    }).done(function (response) {
        $('#result').html(response);
    }).fail(function () {
        alert('error!!!');
    });
}

window.addEventListener('load', () => {
    setInterval(time, 1000);
    document.getElementById("t2").innerHTML = window.navigator.userProfile;
})
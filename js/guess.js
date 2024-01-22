function time() {
    document.getElementById("t1").innerHTML = new Date().toLocaleString();
    }

function submit() {
    var inputData = $('#input_data').val();
    document.getElementById("input").innerHTML = inputData;
    $.ajax({
        type: 'POST',
        url: '/ajaxtest',
        data: {'input_data': inputData }
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
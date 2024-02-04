const keyLayout =
    [["わ", "ら", "や", "ま", "は", "な", "た", "さ", "か", "あ"],
    ["を", "り", "　", "み", "ひ", "に", "ち", "し", "き", "い"],
    ["ん", "る", "ゆ", "む", "ふ", "ぬ", "つ", "す", "く", "う"],
    ["　", "れ", "　", "め", "へ", "ね", "て", "せ", "け", "え"],
    ["　", "ろ", "よ", "も", "ほ", "の", "と", "そ", "こ", "お"],
    ["ー", "　", "ゃ", "ぱ", "ば", "　", "だ", "ざ", "が", "ぁ"],
    ["　", "　", "　", "ぴ", "び", "　", "ぢ", "じ", "ぎ", "ぃ"],
    ["　", "　", "ゅ", "ぷ", "ぶ", "っ", "づ", "ず", "ぐ", "ぅ"],
    ["　", "　", "　", "ぺ", "べ", "　", "で", "ぜ", "げ", "ぇ"],
    ["　", "　", "ょ", "ぽ", "ぼ", "　", "ど", "ぞ", "ご", "ぉ"]];
var sentWords = [];
var charsJSON = { "あ": { "hrgn": "あ", "ktkn": "ア", "color": "y" }, "い": { "hrgn": "い", "ktkn": "イ", "color": "y" }, "う": { "hrgn": "う", "ktkn": "ウ", "color": "y" }, "え": { "hrgn": "え", "ktkn": "エ", "color": "y" }, "お": { "hrgn": "お", "ktkn": "オ", "color": "y" }, "か": { "hrgn": "か", "ktkn": "カ", "color": "y" }, "き": { "hrgn": "き", "ktkn": "キ", "color": "y" }, "く": { "hrgn": "く", "ktkn": "ク", "color": "y" }, "け": { "hrgn": "け", "ktkn": "ケ", "color": "y" }, "こ": { "hrgn": "こ", "ktkn": "コ", "color": "y" }, "さ": { "hrgn": "さ", "ktkn": "サ", "color": "y" }, "し": { "hrgn": "し", "ktkn": "シ", "color": "y" }, "す": { "hrgn": "す", "ktkn": "ス", "color": "y" }, "せ": { "hrgn": "せ", "ktkn": "セ", "color": "y" }, "そ": { "hrgn": "そ", "ktkn": "ソ", "color": "y" }, "た": { "hrgn": "た", "ktkn": "タ", "color": "y" }, "ち": { "hrgn": "ち", "ktkn": "チ", "color": "y" }, "つ": { "hrgn": "つ", "ktkn": "ツ", "color": "y" }, "て": { "hrgn": "て", "ktkn": "テ", "color": "y" }, "と": { "hrgn": "と", "ktkn": "ト", "color": "y" }, "な": { "hrgn": "な", "ktkn": "ナ", "color": "y" }, "に": { "hrgn": "に", "ktkn": "ニ", "color": "y" }, "ぬ": { "hrgn": "ぬ", "ktkn": "ヌ", "color": "y" }, "ね": { "hrgn": "ね", "ktkn": "ネ", "color": "y" }, "の": { "hrgn": "の", "ktkn": "ノ", "color": "y" }, "は": { "hrgn": "は", "ktkn": "ハ", "color": "y" }, "ひ": { "hrgn": "ひ", "ktkn": "ヒ", "color": "y" }, "ふ": { "hrgn": "ふ", "ktkn": "フ", "color": "y" }, "へ": { "hrgn": "へ", "ktkn": "ヘ", "color": "y" }, "ほ": { "hrgn": "ほ", "ktkn": "ホ", "color": "y" }, "ま": { "hrgn": "ま", "ktkn": "マ", "color": "y" }, "み": { "hrgn": "み", "ktkn": "ミ", "color": "y" }, "む": { "hrgn": "む", "ktkn": "ム", "color": "y" }, "め": { "hrgn": "め", "ktkn": "メ", "color": "y" }, "も": { "hrgn": "も", "ktkn": "モ", "color": "y" }, "や": { "hrgn": "や", "ktkn": "ヤ", "color": "y" }, "　": { "hrgn": "　", "ktkn": "　", "color": "y" }, "ゆ": { "hrgn": "ゆ", "ktkn": "ユ", "color": "y" }, "よ": { "hrgn": "よ", "ktkn": "ヨ", "color": "y" }, "ら": { "hrgn": "ら", "ktkn": "ラ", "color": "y" }, "り": { "hrgn": "り", "ktkn": "リ", "color": "y" }, "る": { "hrgn": "る", "ktkn": "ル", "color": "y" }, "れ": { "hrgn": "れ", "ktkn": "レ", "color": "y" }, "ろ": { "hrgn": "ろ", "ktkn": "ロ", "color": "y" }, "わ": { "hrgn": "わ", "ktkn": "ワ", "color": "y" }, "を": { "hrgn": "を", "ktkn": "ヲ", "color": "y" }, "ん": { "hrgn": "ん", "ktkn": "ン", "color": "y" }, "ぁ": { "hrgn": "ぁ", "ktkn": "ァ", "color": "y" }, "ぃ": { "hrgn": "ぃ", "ktkn": "ィ", "color": "y" }, "ぅ": { "hrgn": "ぅ", "ktkn": "ゥ", "color": "y" }, "ぇ": { "hrgn": "ぇ", "ktkn": "ェ", "color": "y" }, "ぉ": { "hrgn": "ぉ", "ktkn": "ォ", "color": "y" }, "が": { "hrgn": "が", "ktkn": "ガ", "color": "y" }, "ぎ": { "hrgn": "ぎ", "ktkn": "ギ", "color": "y" }, "ぐ": { "hrgn": "ぐ", "ktkn": "グ", "color": "y" }, "げ": { "hrgn": "げ", "ktkn": "ゲ", "color": "y" }, "ご": { "hrgn": "ご", "ktkn": "ゴ", "color": "y" }, "ざ": { "hrgn": "ざ", "ktkn": "ザ", "color": "y" }, "じ": { "hrgn": "じ", "ktkn": "ジ", "color": "y" }, "ず": { "hrgn": "ず", "ktkn": "ズ", "color": "y" }, "ぜ": { "hrgn": "ぜ", "ktkn": "ゼ", "color": "y" }, "ぞ": { "hrgn": "ぞ", "ktkn": "ゾ", "color": "y" }, "だ": { "hrgn": "だ", "ktkn": "ダ", "color": "y" }, "ぢ": { "hrgn": "ぢ", "ktkn": "ヂ", "color": "y" }, "づ": { "hrgn": "づ", "ktkn": "ヅ", "color": "y" }, "で": { "hrgn": "で", "ktkn": "デ", "color": "y" }, "ど": { "hrgn": "ど", "ktkn": "ド", "color": "y" }, "っ": { "hrgn": "っ", "ktkn": "ッ", "color": "y" }, "ば": { "hrgn": "ば", "ktkn": "バ", "color": "y" }, "び": { "hrgn": "び", "ktkn": "ビ", "color": "y" }, "ぶ": { "hrgn": "ぶ", "ktkn": "ブ", "color": "y" }, "べ": { "hrgn": "べ", "ktkn": "ベ", "color": "y" }, "ぼ": { "hrgn": "ぼ", "ktkn": "ボ", "color": "y" }, "ぱ": { "hrgn": "ぱ", "ktkn": "パ", "color": "y" }, "ぴ": { "hrgn": "ぴ", "ktkn": "ピ", "color": "y" }, "ぷ": { "hrgn": "ぷ", "ktkn": "プ", "color": "y" }, "ぺ": { "hrgn": "ぺ", "ktkn": "ペ", "color": "y" }, "ぽ": { "hrgn": "ぽ", "ktkn": "ポ", "color": "y" }, "ゃ": { "hrgn": "ゃ", "ktkn": "ャ", "color": "y" }, "ゅ": { "hrgn": "ゅ", "ktkn": "ュ", "color": "y" }, "ょ": { "hrgn": "ょ", "ktkn": "ョ", "color": "y" }, "ー": { "hrgn": "ー", "ktkn": "ー", "color": "y" } };
var flags = {};
var alertText = '';
var historyPosCnt = 0;
var historyPosRow = 0;
const wordLen = 6;
var roomid;

function time() {
    document.getElementById("t1").innerHTML = new Date().toLocaleString();
}

// 定期的に聞いてそのたびに人数を集計
// オールヒットでユーザIDも通知

function joining() {
    $.ajax({
        type: 'POST',
        url: '/joining',
        data: { 'roomid': roomid }
    }).done(function (res) {
        document.getElementById('roomNum').textContent = 'people : ' + res
    }).fail(function () {
        alert('error!!! (/joining)');
    });
}

function checkWord(inputData) {
    return new Promise((resolve, reject) => {
        // 入力がひらがな・カタカナか判定
        $.ajax({
            type: 'POST',
            url: '/check',
            data: { 'word': inputData }
        }).done(function (res) {
            $('#response').html(res);
            var resJSON = JSON.parse(res);
            evalNum = resJSON['eval'];
            var alertText = '';
            if (evalNum == 0) {
                resolve(resJSON['hrgn']);
            }
            else {
                alertText = '';
                if (evalNum & 1)
                    alertText += 'キーボードにある文字のみを入力してください\n';
                if (evalNum & 2)
                    alertText += 'test2\n';
                if (evalNum & 4)
                    alertText += 'test4\n';
                resolve(null);
            }
        }).fail(function () {
            alert('error!!! (/checkWord)');
            reject(false);
        });
    });
}

const sleep = (second) => new Promise(resolve => setTimeout(resolve, second * 1000))

async function reflectColor(guessWord, colors) {
    var i = 0;
    for (const char of guessWord) {
        charsJSON[char]['color'] = colors[i];
        var key = document.getElementById(char)
        key.classList.replace('jg_y', 'jg_' + charsJSON[char]['color']);
        key.classList.replace('jg_w', 'jg_' + charsJSON[char]['color']);
        key.classList.replace('jg_b', 'jg_' + charsJSON[char]['color']);

        var historyUnit = document.getElementById('history_' + (historyPosRow - 1).toString() + '_' + i.toString());
        historyUnit.classList.add('jg_' + charsJSON[char]['color']);
        await sleep(1); i += 1;
    }
}

function reflectInputToHistory() {
    var input = document.getElementById('input_data');
    for (var i = 0; i < wordLen; i++) {
        var historyUnit = document.getElementById('history_' + historyPosRow.toString() + '_' + i.toString());
        if (i < input.value.length)
            historyUnit.textContent = input.value[i];
        else
            historyUnit.textContent = '　';
    }
}

function addHistoryRow() {
    historyPosRow += 1;
    var history = document.querySelector('#history');
    var row = document.createElement('div');
    row.classList.add('history_row');
    for (var i = 0; i < wordLen; i++) {
        var char = document.createElement('button');
        char.textContent = '';
        char.classList.add('history_char');
        char.id = 'history_' + historyPosRow.toString() + '_' + i.toString();
        row.appendChild(char);
    }
    history.appendChild(row);
}

function swapKeyboardCharType() {
    var currentType = ('あ' == document.getElementById('あ').textContent);
    for (var i in keyLayout) {
        for (var j in keyLayout[i]) {
            var key = document.getElementById(keyLayout[i][j]);
            if (currentType)
                key.textContent = charsJSON[keyLayout[i][j]]['ktkn'];
            else
                key.textContent = charsJSON[keyLayout[i][j]]['hrgn'];
        }
    }
}

function clickKeyboard(e) {
    var input = document.getElementById('input_data');
    if (e.target.id != '　')
        input.value = input.value + e.target.id;
    reflectInputToHistory();
}

function clickKeyboardHeader(e) {
    switch (e.target.id) {
        case 'giveup':
            // give up process
            break;
        case 'swap':
            swapKeyboardCharType();
            break;
        case 'clear':
            document.getElementById('input_data').value = '';
            reflectInputToHistory();
            break;
        case 'delete':
            input = document.getElementById('input_data');
            input.value = input.value.slice(0, -1);
            reflectInputToHistory();
            break;
        case 'submit':
            addHistoryRow();
            submit();
            break;
        default:
            break;
    }
}

async function submit() {
    const guessWord = $('#input_data').val();
    document.getElementById('input_data').value = '';
    var hrgn = await checkWord(guessWord);
    var resJSON;
    console.log('hrgn',hrgn);
    if (!hrgn) {
        alert(alertText);
        return 0;
    }
    sentWords.unshift(guessWord)
    document.getElementById("input").innerHTML = sentWords;
    await $.ajax({
        type: 'POST',
        url: '/guess',
    }).done(function (res) {
        resJSON = JSON.parse(res);
        $('#result').html(res);
    }).fail(function () {
        alert('error!!!');
    });
    // else not match
    ret = reflectColor(hrgn, resJSON['colors']);
}

window.addEventListener('load', () => {
    setInterval(time, 1000);
    document.getElementById("t2").innerHTML = window.navigator.userProfile;

    // draw first row of history
    var history = document.querySelector('#history');
    var row = document.createElement('div');
    row.classList.add('history_row');
    for (var i = 0; i < wordLen; i++) {
        var char = document.createElement('button');
        char.textContent = '';
        char.classList.add('history_char');
        char.id = 'history_0_' + i.toString();
        row.appendChild(char);
    }
    history.appendChild(row);

    // draw software keyboard
    var keyboard = document.querySelector('#keyboard');
    row = document.createElement('div');
    row.classList.add('keyboard_row');
    var keyboardHeaderTextContent = ['降参', 'あ/ア', 'clear', 'del', 'submit'];
    var keyboardHeaderId = ['giveup', 'swap', 'clear', 'delete', 'submit'];
    for (var i = 0; i < 5; i++) {
        var key = document.createElement('button');
        key.type = 'button';
        key.textContent = keyboardHeaderTextContent[i];
        key.classList.add('key_head', 'jg_y');
        key.id = keyboardHeaderId[i];
        key.addEventListener('click', clickKeyboardHeader);
        row.appendChild(key);
    }
    keyboard.appendChild(row)

    var blank = document.createElement('div', );
    blank.classList.add('blank');
    keyboard.appendChild(blank);
    for (var i in keyLayout) {
        row = document.createElement('div');
        row.classList.add('keyboard_row');
        for (var j in keyLayout[i]) {
            var char = keyLayout[i][j];
            var key = document.createElement('button');
            key.type = 'button';
            key.textContent = charsJSON[char]['hrgn'];
            key.classList.add('key_bt');
            key.classList.add('jg_' + charsJSON[char]['color']);
            key.id = char;
            key.addEventListener('click', clickKeyboard);
            row.appendChild(key);
        }
        keyboard.appendChild(row);

        if (i == 4) {
            var blank = document.createElement('div',);
            blank.classList.add('blank');
            keyboard.appendChild(blank);
        }
    }

    roomid = prompt('enter room number', '192');
    document.getElementById('roomID').textContent = roomid;
    document.getElementById('userName').textContent = prompt('enter user name', 'sumallly');
    joining();
    setInterval(joining, 5000);
})

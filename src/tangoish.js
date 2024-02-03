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
var charsJSON = { "あ": { "hrgn": "あ", "ktkn": "ア", "color": "h" }, "い": { "hrgn": "い", "ktkn": "イ", "color": "b" }, "う": { "hrgn": "う", "ktkn": "ウ", "color": "w" }, "え": { "hrgn": "え", "ktkn": "エ", "color": "y" }, "お": { "hrgn": "お", "ktkn": "オ", "color": "y" }, "か": { "hrgn": "か", "ktkn": "カ", "color": "y" }, "き": { "hrgn": "き", "ktkn": "キ", "color": "y" }, "く": { "hrgn": "く", "ktkn": "ク", "color": "y" }, "け": { "hrgn": "け", "ktkn": "ケ", "color": "y" }, "こ": { "hrgn": "こ", "ktkn": "コ", "color": "y" }, "さ": { "hrgn": "さ", "ktkn": "サ", "color": "y" }, "し": { "hrgn": "し", "ktkn": "シ", "color": "y" }, "す": { "hrgn": "す", "ktkn": "ス", "color": "y" }, "せ": { "hrgn": "せ", "ktkn": "セ", "color": "y" }, "そ": { "hrgn": "そ", "ktkn": "ソ", "color": "y" }, "た": { "hrgn": "た", "ktkn": "タ", "color": "y" }, "ち": { "hrgn": "ち", "ktkn": "チ", "color": "y" }, "つ": { "hrgn": "つ", "ktkn": "ツ", "color": "y" }, "て": { "hrgn": "て", "ktkn": "テ", "color": "y" }, "と": { "hrgn": "と", "ktkn": "ト", "color": "y" }, "な": { "hrgn": "な", "ktkn": "ナ", "color": "y" }, "に": { "hrgn": "に", "ktkn": "ニ", "color": "y" }, "ぬ": { "hrgn": "ぬ", "ktkn": "ヌ", "color": "y" }, "ね": { "hrgn": "ね", "ktkn": "ネ", "color": "y" }, "の": { "hrgn": "の", "ktkn": "ノ", "color": "y" }, "は": { "hrgn": "は", "ktkn": "ハ", "color": "y" }, "ひ": { "hrgn": "ひ", "ktkn": "ヒ", "color": "y" }, "ふ": { "hrgn": "ふ", "ktkn": "フ", "color": "y" }, "へ": { "hrgn": "へ", "ktkn": "ヘ", "color": "y" }, "ほ": { "hrgn": "ほ", "ktkn": "ホ", "color": "y" }, "ま": { "hrgn": "ま", "ktkn": "マ", "color": "y" }, "み": { "hrgn": "み", "ktkn": "ミ", "color": "y" }, "む": { "hrgn": "む", "ktkn": "ム", "color": "y" }, "め": { "hrgn": "め", "ktkn": "メ", "color": "y" }, "も": { "hrgn": "も", "ktkn": "モ", "color": "y" }, "や": { "hrgn": "や", "ktkn": "ヤ", "color": "y" }, "　": { "hrgn": "　", "ktkn": "　", "color": "y" }, "ゆ": { "hrgn": "ゆ", "ktkn": "ユ", "color": "y" }, "よ": { "hrgn": "よ", "ktkn": "ヨ", "color": "y" }, "ら": { "hrgn": "ら", "ktkn": "ラ", "color": "y" }, "り": { "hrgn": "り", "ktkn": "リ", "color": "y" }, "る": { "hrgn": "る", "ktkn": "ル", "color": "y" }, "れ": { "hrgn": "れ", "ktkn": "レ", "color": "y" }, "ろ": { "hrgn": "ろ", "ktkn": "ロ", "color": "y" }, "わ": { "hrgn": "わ", "ktkn": "ワ", "color": "y" }, "を": { "hrgn": "を", "ktkn": "ヲ", "color": "y" }, "ん": { "hrgn": "ん", "ktkn": "ン", "color": "y" }, "ぁ": { "hrgn": "ぁ", "ktkn": "ァ", "color": "y" }, "ぃ": { "hrgn": "ぃ", "ktkn": "ィ", "color": "y" }, "ぅ": { "hrgn": "ぅ", "ktkn": "ゥ", "color": "y" }, "ぇ": { "hrgn": "ぇ", "ktkn": "ェ", "color": "y" }, "ぉ": { "hrgn": "ぉ", "ktkn": "ォ", "color": "y" }, "が": { "hrgn": "が", "ktkn": "ガ", "color": "y" }, "ぎ": { "hrgn": "ぎ", "ktkn": "ギ", "color": "y" }, "ぐ": { "hrgn": "ぐ", "ktkn": "グ", "color": "y" }, "げ": { "hrgn": "げ", "ktkn": "ゲ", "color": "y" }, "ご": { "hrgn": "ご", "ktkn": "ゴ", "color": "y" }, "ざ": { "hrgn": "ざ", "ktkn": "ザ", "color": "y" }, "じ": { "hrgn": "じ", "ktkn": "ジ", "color": "y" }, "ず": { "hrgn": "ず", "ktkn": "ズ", "color": "y" }, "ぜ": { "hrgn": "ぜ", "ktkn": "ゼ", "color": "y" }, "ぞ": { "hrgn": "ぞ", "ktkn": "ゾ", "color": "y" }, "だ": { "hrgn": "だ", "ktkn": "ダ", "color": "y" }, "ぢ": { "hrgn": "ぢ", "ktkn": "ヂ", "color": "y" }, "づ": { "hrgn": "づ", "ktkn": "ヅ", "color": "y" }, "で": { "hrgn": "で", "ktkn": "デ", "color": "y" }, "ど": { "hrgn": "ど", "ktkn": "ド", "color": "y" }, "っ": { "hrgn": "っ", "ktkn": "ッ", "color": "y" }, "ば": { "hrgn": "ば", "ktkn": "バ", "color": "y" }, "び": { "hrgn": "び", "ktkn": "ビ", "color": "y" }, "ぶ": { "hrgn": "ぶ", "ktkn": "ブ", "color": "y" }, "べ": { "hrgn": "べ", "ktkn": "ベ", "color": "y" }, "ぼ": { "hrgn": "ぼ", "ktkn": "ボ", "color": "y" }, "ぱ": { "hrgn": "ぱ", "ktkn": "パ", "color": "y" }, "ぴ": { "hrgn": "ぴ", "ktkn": "ピ", "color": "y" }, "ぷ": { "hrgn": "ぷ", "ktkn": "プ", "color": "y" }, "ぺ": { "hrgn": "ぺ", "ktkn": "ペ", "color": "y" }, "ぽ": { "hrgn": "ぽ", "ktkn": "ポ", "color": "y" }, "ゃ": { "hrgn": "ゃ", "ktkn": "ャ", "color": "y" }, "ゅ": { "hrgn": "ゅ", "ktkn": "ュ", "color": "y" }, "ょ": { "hrgn": "ょ", "ktkn": "ョ", "color": "y" }, "ー": { "hrgn": "ー", "ktkn": "ー", "color": "y" } };
var flags = {};

function time() {
    document.getElementById("t1").innerHTML = new Date().toLocaleString();
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
            var alertText = '';
            if (res == 0)
                resolve(true);
            else {
                if (res & 1)
                    alertText += 'キーボードにある文字のみを入力してください\n';
                if (res & 2)
                    alertText += 'test2\n';
                if (res & 4)
                    alertText += 'test4\n';
                alert(alertText);
                resolve(false);
            }
        }).fail(function () {
            alert('error!!! (/checkWord)');
            reject(false);
        });
    });
}
function reflectColor(colors) {
    return new Promise((resolve) => {
        console.log(colors);
        for (var char in colors) {
            charsJSON[char]['color'] = colors[char]
        }
        console.log(charsJSON);
        resolve(colors);
    })
}

async function submit() {
    const inputData = $('#input_data').val();
    var valid = await checkWord(inputData);
    if (valid) {
        sentWords.unshift(inputData)
        document.getElementById("input").innerHTML = sentWords;
        $.ajax({
            type: 'POST',
            url: '/guess',
        }).done(function (res) {
            resJSON = JSON.parse(res);
            // else not match
            console.log(resJSON)
            reflectColor(resJSON['colors']);
            $('#result').html(res);
        }).fail(function () {
            alert('error!!!');
        });
    }
}

window.addEventListener('load', () => {
    setInterval(time, 1000);
    document.getElementById("t2").innerHTML = window.navigator.userProfile;

    var keyboard = document.querySelector('.keyboard');
    for (var i in keyLayout) {
        for (var j in keyLayout[i]) {
            var char = keyLayout[i][j];
            var key = document.createElement('button');
            key.type = 'button';
            key.textContent = charsJSON[char]['hrgn'];
            key.classList.add('key_bt');
            key.classList.add('jg_' + charsJSON[char]['color']);
            console.log(key);
            keyboard.appendChild(key);
        }
        keyboard.appendChild(document.createElement('br'));
    }
    console.log(charsJSON)
})

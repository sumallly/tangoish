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
var charsJSON = { "あ": { "hrgn": "あ", "ktkn": "ア", "color": 0 }, "い": { "hrgn": "い", "ktkn": "イ", "color": 0 }, "う": { "hrgn": "う", "ktkn": "ウ", "color": 0 }, "え": { "hrgn": "え", "ktkn": "エ", "color": 0 }, "お": { "hrgn": "お", "ktkn": "オ", "color": 0 }, "か": { "hrgn": "か", "ktkn": "カ", "color": 0 }, "き": { "hrgn": "き", "ktkn": "キ", "color": 0 }, "く": { "hrgn": "く", "ktkn": "ク", "color": 0 }, "け": { "hrgn": "け", "ktkn": "ケ", "color": 0 }, "こ": { "hrgn": "こ", "ktkn": "コ", "color": 0 }, "さ": { "hrgn": "さ", "ktkn": "サ", "color": 0 }, "し": { "hrgn": "し", "ktkn": "シ", "color": 0 }, "す": { "hrgn": "す", "ktkn": "ス", "color": 0 }, "せ": { "hrgn": "せ", "ktkn": "セ", "color": 0 }, "そ": { "hrgn": "そ", "ktkn": "ソ", "color": 0 }, "た": { "hrgn": "た", "ktkn": "タ", "color": 0 }, "ち": { "hrgn": "ち", "ktkn": "チ", "color": 0 }, "つ": { "hrgn": "つ", "ktkn": "ツ", "color": 0 }, "て": { "hrgn": "て", "ktkn": "テ", "color": 0 }, "と": { "hrgn": "と", "ktkn": "ト", "color": 0 }, "な": { "hrgn": "な", "ktkn": "ナ", "color": 0 }, "に": { "hrgn": "に", "ktkn": "ニ", "color": 0 }, "ぬ": { "hrgn": "ぬ", "ktkn": "ヌ", "color": 0 }, "ね": { "hrgn": "ね", "ktkn": "ネ", "color": 0 }, "の": { "hrgn": "の", "ktkn": "ノ", "color": 0 }, "は": { "hrgn": "は", "ktkn": "ハ", "color": 0 }, "ひ": { "hrgn": "ひ", "ktkn": "ヒ", "color": 0 }, "ふ": { "hrgn": "ふ", "ktkn": "フ", "color": 0 }, "へ": { "hrgn": "へ", "ktkn": "ヘ", "color": 0 }, "ほ": { "hrgn": "ほ", "ktkn": "ホ", "color": 0 }, "ま": { "hrgn": "ま", "ktkn": "マ", "color": 0 }, "み": { "hrgn": "み", "ktkn": "ミ", "color": 0 }, "む": { "hrgn": "む", "ktkn": "ム", "color": 0 }, "め": { "hrgn": "め", "ktkn": "メ", "color": 0 }, "も": { "hrgn": "も", "ktkn": "モ", "color": 0 }, "や": { "hrgn": "や", "ktkn": "ヤ", "color": 0 }, "　": { "hrgn": "　", "ktkn": "　", "color": 0 }, "ゆ": { "hrgn": "ゆ", "ktkn": "ユ", "color": 0 }, "よ": { "hrgn": "よ", "ktkn": "ヨ", "color": 0 }, "ら": { "hrgn": "ら", "ktkn": "ラ", "color": 0 }, "り": { "hrgn": "り", "ktkn": "リ", "color": 0 }, "る": { "hrgn": "る", "ktkn": "ル", "color": 0 }, "れ": { "hrgn": "れ", "ktkn": "レ", "color": 0 }, "ろ": { "hrgn": "ろ", "ktkn": "ロ", "color": 0 }, "わ": { "hrgn": "わ", "ktkn": "ワ", "color": 0 }, "を": { "hrgn": "を", "ktkn": "ヲ", "color": 0 }, "ん": { "hrgn": "ん", "ktkn": "ン", "color": 0 }, "ぁ": { "hrgn": "ぁ", "ktkn": "ァ", "color": 0 }, "ぃ": { "hrgn": "ぃ", "ktkn": "ィ", "color": 0 }, "ぅ": { "hrgn": "ぅ", "ktkn": "ゥ", "color": 0 }, "ぇ": { "hrgn": "ぇ", "ktkn": "ェ", "color": 0 }, "ぉ": { "hrgn": "ぉ", "ktkn": "ォ", "color": 0 }, "が": { "hrgn": "が", "ktkn": "ガ", "color": 0 }, "ぎ": { "hrgn": "ぎ", "ktkn": "ギ", "color": 0 }, "ぐ": { "hrgn": "ぐ", "ktkn": "グ", "color": 0 }, "げ": { "hrgn": "げ", "ktkn": "ゲ", "color": 0 }, "ご": { "hrgn": "ご", "ktkn": "ゴ", "color": 0 }, "ざ": { "hrgn": "ざ", "ktkn": "ザ", "color": 0 }, "じ": { "hrgn": "じ", "ktkn": "ジ", "color": 0 }, "ず": { "hrgn": "ず", "ktkn": "ズ", "color": 0 }, "ぜ": { "hrgn": "ぜ", "ktkn": "ゼ", "color": 0 }, "ぞ": { "hrgn": "ぞ", "ktkn": "ゾ", "color": 0 }, "だ": { "hrgn": "だ", "ktkn": "ダ", "color": 0 }, "ぢ": { "hrgn": "ぢ", "ktkn": "ヂ", "color": 0 }, "づ": { "hrgn": "づ", "ktkn": "ヅ", "color": 0 }, "で": { "hrgn": "で", "ktkn": "デ", "color": 0 }, "ど": { "hrgn": "ど", "ktkn": "ド", "color": 0 }, "っ": { "hrgn": "っ", "ktkn": "ッ", "color": 0 }, "ば": { "hrgn": "ば", "ktkn": "バ", "color": 0 }, "び": { "hrgn": "び", "ktkn": "ビ", "color": 0 }, "ぶ": { "hrgn": "ぶ", "ktkn": "ブ", "color": 0 }, "べ": { "hrgn": "べ", "ktkn": "ベ", "color": 0 }, "ぼ": { "hrgn": "ぼ", "ktkn": "ボ", "color": 0 }, "ぱ": { "hrgn": "ぱ", "ktkn": "パ", "color": 0 }, "ぴ": { "hrgn": "ぴ", "ktkn": "ピ", "color": 0 }, "ぷ": { "hrgn": "ぷ", "ktkn": "プ", "color": 0 }, "ぺ": { "hrgn": "ぺ", "ktkn": "ペ", "color": 0 }, "ぽ": { "hrgn": "ぽ", "ktkn": "ポ", "color": 0 }, "ゃ": { "hrgn": "ゃ", "ktkn": "ャ", "color": 0 }, "ゅ": { "hrgn": "ゅ", "ktkn": "ュ", "color": 0 }, "ょ": { "hrgn": "ょ", "ktkn": "ョ", "color": 0 }, "ー": { "hrgn": "ー", "ktkn": "ー", "color": 0 } };
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

})

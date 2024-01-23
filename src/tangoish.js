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
var CharsJSON = {"あ": { "hrgn": "あ", "ktkn": "ア", "color": "00000000" }, "い": { "hrgn": "い", "ktkn": "イ", "color": "00000000" }, "う": { "hrgn": "う", "ktkn": "ウ", "color": "00000000" }, "え": { "hrgn": "え", "ktkn": "エ", "color": "00000000" }, "お": { "hrgn": "お", "ktkn": "オ", "color": "00000000" }, "か": { "hrgn": "か", "ktkn": "カ", "color": "00000000" }, "き": { "hrgn": "き", "ktkn": "キ", "color": "00000000" }, "く": { "hrgn": "く", "ktkn": "ク", "color": "00000000" }, "け": { "hrgn": "け", "ktkn": "ケ", "color": "00000000" }, "こ": { "hrgn": "こ", "ktkn": "コ", "color": "00000000" }, "さ": { "hrgn": "さ", "ktkn": "サ", "color": "00000000" }, "し": { "hrgn": "し", "ktkn": "シ", "color": "00000000" }, "す": { "hrgn": "す", "ktkn": "ス", "color": "00000000" }, "せ": { "hrgn": "せ", "ktkn": "セ", "color": "00000000" }, "そ": { "hrgn": "そ", "ktkn": "ソ", "color": "00000000" }, "た": { "hrgn": "た", "ktkn": "タ", "color": "00000000" }, "ち": { "hrgn": "ち", "ktkn": "チ", "color": "00000000" }, "つ": { "hrgn": "つ", "ktkn": "ツ", "color": "00000000" }, "て": { "hrgn": "て", "ktkn": "テ", "color": "00000000" }, "と": { "hrgn": "と", "ktkn": "ト", "color": "00000000" }, "な": { "hrgn": "な", "ktkn": "ナ", "color": "00000000" }, "に": { "hrgn": "に", "ktkn": "ニ", "color": "00000000" }, "ぬ": { "hrgn": "ぬ", "ktkn": "ヌ", "color": "00000000" }, "ね": { "hrgn": "ね", "ktkn": "ネ", "color": "00000000" }, "の": { "hrgn": "の", "ktkn": "ノ", "color": "00000000" }, "は": { "hrgn": "は", "ktkn": "ハ", "color": "00000000" }, "ひ": { "hrgn": "ひ", "ktkn": "ヒ", "color": "00000000" }, "ふ": { "hrgn": "ふ", "ktkn": "フ", "color": "00000000" }, "へ": { "hrgn": "へ", "ktkn": "ヘ", "color": "00000000" }, "ほ": {"hrgn": "ほ", "ktkn": "ホ", "color": "00000000"}, "ま": {"hrgn": "ま", "ktkn": "マ", "color": "00000000"}, "み": {"hrgn": "み", "ktkn": "ミ", "color": "00000000"}, "む": {"hrgn": "む", "ktkn": "ム", "color": "00000000"}, "め": {"hrgn": "め", "ktkn": "メ", "color": "00000000"}, "も": {"hrgn": "も", "ktkn": "モ", "color": "00000000"}, "や": {"hrgn": "や", "ktkn": "ヤ", "color": "00000000"}, "ゆ": {"hrgn": "ゆ", "ktkn": "ユ", "color": "00000000"}, "よ": {"hrgn": "よ", "ktkn": "ヨ", "color": "00000000"}, "ら": {"hrgn": "ら", "ktkn": "ラ", "color": "00000000"}, "り": {"hrgn": "り", "ktkn": "リ", "color": "00000000"}, "る": {"hrgn": "る", "ktkn": "ル", "color": "00000000"}, "れ": {"hrgn": "れ", "ktkn": "レ", "color": "00000000"}, "ろ": {"hrgn": "ろ", "ktkn": " ロ", "color": "00000000"}, "わ": {"hrgn": "わ", "ktkn": "ワ", "color": "00000000"}, "を": {"hrgn": "を", "ktkn": "ヲ", "color": "00000000"}, "ん": {"hrgn": "ん", "ktkn": "ン", "color": "00000000"}, "ぁ": {"hrgn": "ぁ", "ktkn": "ァ", "color": "00000000"}, "ぃ": {"hrgn": "ぃ", "ktkn": "ィ", "color": "00000000"}, "ぅ": {"hrgn": "ぅ", "ktkn": "ゥ", "color": "00000000"}, "ぇ": {"hrgn": "ぇ", "ktkn": "ェ", "color": "00000000"}, "ぉ": {"hrgn": "ぉ", "ktkn": "ォ", "color": "00000000"}, "が": {"hrgn": "が", "ktkn": "ガ", "color": "00000000"}, "ぎ": {"hrgn": "ぎ", "ktkn": "ギ", "color": "00000000"}, "ぐ": {"hrgn": "ぐ", "ktkn": "グ", "color": "00000000"}, "げ": {"hrgn": "げ", "ktkn": "ゲ", "color": "00000000"}, "ご": {"hrgn": "ご", "ktkn": "ゴ", "color": "00000000"}, "ざ": {"hrgn": "ざ", "ktkn": "ザ", "color": "00000000"}, "じ": {"hrgn": "じ", "ktkn": "ジ", "color": "00000000"}, "ず": {"hrgn": "ず", "ktkn": "ズ", "color": "00000000"}, "ぜ": {"hrgn": "ぜ", "ktkn": "ゼ", "color": "00000000"}, "ぞ": {"hrgn": "ぞ", "ktkn": "ゾ", "color": "00000000"}, "だ": {"hrgn": "だ", "ktkn": "ダ", "color": "00000000"}, "ぢ": {"hrgn": "ぢ", "ktkn": "ヂ", "color": "00000000"}, "づ": {"hrgn": "づ", "ktkn": "ヅ", "color": "00000000"}, "で": {"hrgn": "で", "ktkn": "デ", "color": "00000000"}, "ど": {"hrgn": "ど", "ktkn": "ド", "color": "00000000"}, "っ": {"hrgn": "っ", "ktkn": "ッ", "color": "00000000"}, "ば": {"hrgn": "ば", "ktkn": "バ", "color": "00000000"}, "び": {"hrgn": "び", "ktkn": "ビ", "color": "00000000"}, "ぶ": {"hrgn": "ぶ", "ktkn": "ブ", "color": "00000000"}, "べ": {"hrgn": "べ", "ktkn": "ベ", "color": "00000000"}, "ぼ": {"hrgn": "ぼ", "ktkn": "ボ", "color": "00000000"}, "ぱ": {"hrgn": "ぱ", "ktkn": "パ", "color": "00000000"}, "ぴ": {"hrgn": "ぴ", "ktkn": "ピ", "color": "00000000"}, "ぷ": {"hrgn": "ぷ", "ktkn": "プ", "color": "00000000"}, "ぺ": {"hrgn": "ぺ", "ktkn": "ペ", "color": "00000000"}, "ぽ": {"hrgn": "ぽ", "ktkn": "ポ", "color": "00000000"}, "ゃ": {"hrgn": "ゃ", "ktkn": "ャ", "color": "00000000"}, "ゅ": {"hrgn": "ゅ", "ktkn": "ュ", "color": "00000000"}, "ょ": {"hrgn": "ょ", "ktkn": "ョ", "color": "00000000"}, "ー": {"hrgn": "ー", "ktkn": "ー", "color": "00000000"}};
var flags = {};

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

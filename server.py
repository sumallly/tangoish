from flask import Flask, request, render_template, jsonify
import datetime, json

requests = {}
allowChars = list('あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉがぎぐげござじずぜぞだぢづでどっばびぶべぼぱぴぷぺぽゃゅょーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォガギグゲゴザジズゼゾダヂヅデドッバビブベボパピプペポャュョー')
hrgn = list('あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉがぎぐげござじずぜぞだぢづでどっばびぶべぼぱぴぷぺぽゃゅょー')
ktkn = list('アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォガギグゲゴザジズゼゾダヂヅデドッバビブベボパピプペポャュョー')

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    user_ip = str(request.remote_addr)
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    return render_template('index.html', ip=user_ip, time=now)

@app.route('/check', methods=['POST'])
def checkWord():
    eval_num = 0
    guess_word = list(request.form['word'])
    hrgn_word = guess_word
    for i, char in enumerate(guess_word):
        if char in hrgn:
            continue
        elif char in ktkn:
            hrgn_word[i] = hrgn[ktkn.index(char)]
        else:
            eval_num += 1
            break
    requests[str(request.remote_addr)] = hrgn_word
    return json.dumps({'eval':eval_num, 'hrgn':hrgn_word}, ensure_ascii=False)

@app.route('/guess', methods=['POST'])
def coloring():
    # hit blow error
    right_word = 'しゃんぷー'
    guess_word = requests.pop(str(request.remote_addr))
    num_char = len(guess_word)
    right_list = list(right_word)
    guess_list = list(guess_word)
    judge = ['w' for i in range(num_char)]
    for i, char_g in enumerate(guess_list):
        for j, char_r in enumerate(right_list):
            if char_g == char_r:
                judge[i] = 'h' if i == j else 'b'
                break
            
    print(guess_list)
    print(right_list)
    print(judge)
    
    ret_dict = {'match':int(all([u == 'h' for u in judge])),
                'colors':judge,
               }
    print(ret_dict)
    return json.dumps(ret_dict)

if __name__ == '__main__':
    app.run(port=8001, host='0.0.0.0', debug=True)

from flask import Flask, request, render_template, jsonify
import datetime, json

requests = {}
allowChars = list('あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉがぎぐげござじずぜぞだぢづでどっばびぶべぼぱぴぷぺぽゃゅょーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォガギグゲゴザジズゼゾダヂヅデドッバビブベボパピプペポャュョー')

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    user_ip = str(request.remote_addr)
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    return render_template('index.html', ip=user_ip, time=now)

@app.route('/check', methods=['POST'])
def checkWord():
    ret = 0
    guess_word = request.form['word']
    for u in list(guess_word):
        if u not in allowChars:
            ret += 1
            break
    requests[str(request.remote_addr)] = guess_word
    return str(ret)

@app.route('/guess', methods=['POST'])
def coloring():
    # hit blow error
    num_char = 5
    right_word = 'しゃんぷー'
    guess_word = requests.pop(str(request.remote_addr))
    right_list = list(right_word)
    guess_list = list(guess_word)
    judge = ['e' for i in range(num_char)]
    judge_dict = {}
    for i, char_g in enumerate(guess_list):
        for j, char_r in enumerate(right_list):
            if char_g == char_r:
                judge[i] = 'h' if i == j else 'b'
                break
        if judge[i] == 'h':
            judge_dict[char_g] = 0xA7D28DFF
        elif judge[i] == 'b':
            judge_dict[char_g] = 0xFCC948FF
        else:
            judge_dict[char_g] = 0x808080FF
            
    print(guess_list)
    print(right_list)
    print(judge)
    
    ret_dict = {'match':int(all([u == 'h' for u in judge])),
                'colors':judge_dict,
               }
    print(ret_dict)
    return json.dumps(ret_dict, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    app.run(port=8001, host='0.0.0.0', debug=True)

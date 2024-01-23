from flask import Flask, request, render_template, jsonify
import datetime, json

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    user_ip = str(request.remote_addr)
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    return render_template('index.html', ip=user_ip, time=now)

def char_basic_list():
    hrgn_n = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもや　ゆ　よらりるれろわをん　　'
    ktkn_n = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤ　ユ　ヨラリルレロワヲン　　'
    hrgn_s = 'ぁぃぅぇぉがぎぐげござじずぜぞだぢづでど　　っ　　ばびぶべぼぱぴぷぺぽゃ　ゅ　ょ　　　　　ー　　　　'
    ktkn_s = 'ァィゥェォガギグゲゴザジズゼゾダヂヅデド　　ッ　　バビブベボパピプペポャ　ュ　ョ　　　　　ー　　　　'

    hrgn_l = list(hrgn_n) + list(hrgn_s)
    ktkn_l = list(ktkn_n) + list(ktkn_s)
    base = []
    
    for i in range(len(hrgn_l)):
        base.append([hrgn_l[i], ktkn_l[i], '00000000'])
        print(base[i])
    
    return base

@app.route('/guess', methods=['POST'])
def coloring():
    # hit blow error
    num_char = 5
    right_word = 'しゃんぷー'
    guess_word = request.form['guessWord']
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
            judge_dict[i] = 'A7D28DFF'
        elif judge[i] == 'b':
            judge_dict[i] = 'FCC948FF'
        else:
            judge_dict[i] = '808080FF'
            
    print(guess_list)
    print(right_list)
    print(judge)
    
    ret_dict = {'match':int(all([u == 'h' for u in judge])),
                'colors':judge_dict,
               }
    print(ret_dict)
    return json.dumps(ret_dict, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    app.run(port=8001, debug=True)
    
from os import times_result
from flask import Flask, request, render_template, jsonify
import datetime, json, time

requests = {}
rooms = {}
allowChars = list('あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉがぎぐげござじずぜぞだぢづでどっばびぶべぼぱぴぷぺぽゃゅょーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォガギグゲゴザジズゼゾダヂヅデドッバビブベボパピプペポャュョー')
hrgn = list('あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉがぎぐげござじずぜぞだぢづでどっばびぶべぼぱぴぷぺぽゃゅょー')
ktkn = list('アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォガギグゲゴザジズゼゾダヂヅデドッバビブベボパピプペポャュョー')

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    user_ip = str(request.remote_addr)
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    return render_template('index.html', ip=user_ip, time=now)

@app.route('/joining', methods=['POST'])
def joining():
    user_ip = str(request.remote_addr)
    room_id = request.form['roomID']
    now = time.time()
    if not room_id in rooms:
        rooms[room_id] = {'users':{},'hitters':['hitters:']}
    else:
        rooms[room_id]['users'][user_ip] = now
    
    exitUsers = []
    for user_ip, time_stamp in rooms[room_id]['users'].items():
        if time_stamp + 8 < now:
            exitUsers.append(user_ip)
    for user_ip in exitUsers:
        rooms[room_id].pop(user_ip, None)
    print(rooms)
    return json.dumps({'roomNum':len(rooms[room_id]['users']), 'hitters':rooms[room_id]['hitters']})

@app.route('/matching', methods=['POST'])
def matching():
    room_id = request.form['roomID']
    user_name = request.form['userName']
    rooms[room_id]['hitters'].append('No.'+ str(len(rooms[room_id]['hitters'])) + ': ' + user_name)
    return '0'

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
    right_word = 'おかちまち'
    guess_word = requests.pop(str(request.remote_addr))
    num_char = len(guess_word)
    right_list = list(right_word)
    guess_list = list(guess_word)
    judge = ['w' for i in range(num_char)]
    for i, char_g in enumerate(guess_list):
        for j, char_r in enumerate(right_list):
            if char_g == char_r:
                if i==j:
                    judge[i] = 'h'
                    break
                else:
                   judge[i] = 'b'
            
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

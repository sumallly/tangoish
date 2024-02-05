from os import times_result
from flask import Flask, request, render_template, jsonify
import datetime, json, time

requests = {}
rooms = {}
room_scan_prev = 0.0
room_scan_cycle = 5.0
allow_chars = list('あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉがぎぐげござじずぜぞだぢづでどっばびぶべぼぱぴぷぺぽゃゅょーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォガギグゲゴザジズゼゾダヂヅデドッバビブベボパピプペポャュョー')
hrgn = list('あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉがぎぐげござじずぜぞだぢづでどっばびぶべぼぱぴぷぺぽゃゅょー')
ktkn = list('アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォガギグゲゴザジズゼゾダヂヅデドッバビブベボパピプペポャュョー')

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    user_id = str(request.remote_addr)
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    return render_template('index.html', ip=user_id, time=now)

@app.route('/joining', methods=['POST'])
def joining():
    user_id = str(request.remote_addr)
    room_id = request.form['roomID']
    now = time.time()
    print(f' access from',user_id,'in',room_id)
    if not room_id in rooms:
        rooms[room_id] = {'users':{user_id:now},'hitters':['hitters:']}
    else:
        rooms[room_id]['users'][user_id] = now
    
    # hittersにナンバーを付加して送信
    roomScan()
    for rid in rooms:
        print('',rid, rooms[rid])
    return json.dumps({'roomNum':len(rooms[room_id]['users']), 'hitters':rooms[room_id]['hitters']})

def roomScan():
    now = time.time()
    if room_scan_prev + room_scan_cycle < now:
        empty_room = []
        for room_id in rooms:
            exitUsers = []
            if len(rooms[room_id]['users']) == 0:
                empty_room.append(room_id)
            for user_id, time_stamp in rooms[room_id]['users'].items():
                if time_stamp + 8 < now:
                    exitUsers.append(user_id)
            for user_id in exitUsers:
                rooms[room_id]['users'].pop(user_id, None)
        for room_id in empty_room:
            rooms.pop(room_id)

@app.route('/matching', methods=['POST'])
def matching():
    room_id = request.form['roomID']
    user_name = request.form['userName']
    # 一致していなかったら追加
    if not user_name in rooms[room_id]['hitters']:
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
    right_word = 'けぷすとらむ'
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

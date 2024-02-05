from flask import Flask, request, render_template, jsonify
import datetime, json, time, csv, random, math, re

requests = {}
rooms = {}
room_scan_prev = 0.0
room_scan_cycle = 5.0
answers = ['む', 'くら', 'みさき', 'ほろよい', 'いいだばし', 'いにしあちぶ']
allow_chars = list('あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉがぎぐげござじずぜぞだぢづでどっばびぶべぼぱぴぷぺぽゃゅょーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォガギグゲゴザジズゼゾダヂヅデドッバビブベボパピプペポャュョー')
hrgn = list('あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉがぎぐげござじずぜぞだぢづでどっばびぶべぼぱぴぷぺぽゃゅょー')
ktkn = list('アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォガギグゲゴザジズゼゾダヂヅデドッバビブベボパピプペポャュョー')

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    user_id = str(request.remote_addr)
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    return render_template('index.html', ip=user_id, time=now)

def pickAnswer(seed):
    word_list = []
    word_list_path = ''
    word_len = 5
    answer = ''
    now = math.floor(time.time())
    if seed[-2]=='-' and seed[-1].isdecimal():
        word_len = int(seed[-1])
        seed = seed[:-2]
    
    if seed.startswith('pokemon'):
        if seed[-1].isdecimal():
            seed = int(re.findall(r'\d+', seed)[-1])
        else:
            seed = 0
        random.seed(now - (now%86400) + seed)
        word_list_path = 'static/wordlist/pokemon.csv'
    
    else:
        if seed.isdecimal():
            seed = int(seed)
        else:
            seed = 0
        random.seed(now - (now%86400) + seed)
        word_list_path = 'static/wordlist/wordlist.csv'

    with open(word_list_path, encoding='utf-8-sig') as f:
        reader = csv.reader(f)
        word_list = [row for row in reader]

    if word_len <= len(word_list[0]):
        if int(word_list[0][word_len - 1]) > 0:
            word_index = 0
            for i in range(word_len - 1):
                word_index += int(word_list[0][i])
            answer = word_list[random.randrange(1 + word_index, 1 + word_index + int(word_list[0][word_len - 1]))]
    else:
        answer = word_list[random.randrange(1, len(word_list))]
    
    return list(answer[0])

@app.route('/join', methods=['POST'])
def join():
    user_id = str(request.remote_addr)
    room_id = request.form['roomID']
    now = time.time()
    if not room_id in rooms:
        # 部屋建てる
        answer = pickAnswer(seed=room_id)
        for i, char in enumerate(answer):
            answer[i] = hrgn[ktkn.index(char)]
        
        rooms[room_id] = {'users':{user_id:now},'hitters':[], 'answer':answer, 'answerLen':len(answer)}
    return json.dumps({'answerLen': rooms[room_id]['answerLen']})

@app.route('/joining', methods=['POST'])
def joining():
    user_id = str(request.remote_addr)
    room_id = request.form['roomID']
    if not room_id in rooms:
        join()
    now = time.time()
    rooms[room_id]['users'][user_id] = now
    
    # hittersにナンバーを付加して送信?
    roomScan()
    for rid in rooms:
        print('',rid, rooms[rid])
    
    send_hitters_list = ['hitters:']
    for i, hitter in enumerate(rooms[room_id]['hitters']):
        send_hitters_list.append('No.'+str(i+1)+': '+hitter);
    
    return json.dumps({'roomNum':len(rooms[room_id]['users']), 'hitters':send_hitters_list});

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
        rooms[room_id]['hitters'].append(user_name)
    return '0'

@app.route('/check', methods=['POST'])
def checkWord():
    eval_num = 0
    guess_word = list(request.form['word'])
    for i, char in enumerate(guess_word):
        if char in hrgn:
            continue
        elif char in ktkn:
            guess_word[i] = hrgn[ktkn.index(char)]
        else:
            eval_num += 1
            break
    requests[str(request.remote_addr)] = guess_word
    return json.dumps({'eval':eval_num, 'hrgn':guess_word}, ensure_ascii=False)

@app.route('/guess', methods=['POST'])
def coloring():
    # hit blow error
    room_id = request.form['roomID']
    right_word = rooms[room_id]['answer']
    guess_word = requests.pop(str(request.remote_addr))
    num_char = len(guess_word)
    judge = ['w' for i in range(num_char)]
    for i, char_g in enumerate(guess_word):
        for j, char_r in enumerate(right_word):
            if char_g == char_r:
                if i==j:
                    judge[i] = 'h'
                    break
                else:
                   judge[i] = 'b'
            
    print(guess_word)
    print(right_word)
    print(judge)
    
    ret_dict = {'match':int(all([u == 'h' for u in judge])),
                'colors':judge,
               }
    print(ret_dict)
    return json.dumps(ret_dict)

if __name__ == '__main__':
    app.run(port=8001, host='0.0.0.0', debug=True)

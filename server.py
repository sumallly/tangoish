from flask import Flask, request, render_template, jsonify
import datetime, json, copy

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    user_ip = str(request.remote_addr)
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    return render_template('index.html', ip=user_ip, time=now)

@app.route('/ajaxtest', methods=['POST'])
def func():
    input_data = request.form['input_data']
    input_list = list(input_data)
    ret_dict = {}
    char_dict = {}
    for i, char in enumerate(input_list):
        char_dict['char'] = char
        char_dict['encoded'] = str(char.encode('utf-8'))[2:-1]
        ret_dict[i] = copy.deepcopy(char_dict)
    print(ret_dict)
    return json.dumps(ret_dict, ensure_ascii=False, indent=2)

@app.route('/guess', methods=['POST'])
def coloring():
    # hit blow error
    num_char = 5
    right_str = 'しゃんぷー'
    guess_str = 'じんじゃー' #request.form['guess_str']
    right_list = list(right_str)
    guess_list = list(guess_str)
    judge = ['e' for i in range(num_char)]
    judge_dict = {}
    for i, char_g in enumerate(guess_list):
        for j, char_r in enumerate(right_list):
            if char_g == char_r:
                judge[i] = 'h' if i == j else 'b'
                break
        if judge[i] == 'h':
            judge_dict[i] = 'A7D28D'
        elif judge[i] == 'b':
            judge_dict[i] = 'FCC948'
        else:
            judge_dict[i] = '808080'
            
    print(guess_list)
    print(right_list)
    print(judge)
    
    ret_dict = {'match':int(all([u == 'h' for u in judge])),
                'colors':judge_dict,
               }
    print(ret_dict)
    return json.dumps(ret_dict, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    #app.run(port=8001, debug=True)
    coloring();
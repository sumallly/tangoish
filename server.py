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

if __name__ == '__main__':
    app.run(port=8001, debug=True)

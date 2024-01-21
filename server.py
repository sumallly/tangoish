from flask import Flask, request, render_template, jsonify
import datetime
import json

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    user_ip = str(request.remote_addr)
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')
    return render_template('index.html', ip=user_ip, time=now)

@app.route('/ajaxtest', methods=['POST'])
def func():
    input_data = request.form['input_Data']
    input_list = list(input_data)
    ret_dict = {}
    for char in input_list:
        ret_dict[char] = str(char.encode('utf-8'))[2:-1]
    print(ret_dict)
    return json.dumps(ret_dict, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    app.run(port=8001, debug=True)

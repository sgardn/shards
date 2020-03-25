from flask import Flask, request
from flask_cors import CORS
import json
# configuring cors
# https://flask-cors.readthedocs.io/en/latest/

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def process():
    print("got request")
    req_data = request.get_json()
    print(req_data)
    ex = [{ 'foo': 'bar' }, { 'quux': 'baz' }]

    return json.dumps({ 'success': True }), 200, {'ContentType' : 'application/json'}

if __name__ == "__main__":
    app.run()

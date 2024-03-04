from flask import Flask, request, jsonify, send_file
from flask_pymongo import pymongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://localhost:27017/TETI-Ask'

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["TETI-Ask"]
col = db["Documents"]

@app.route('/document', methods=['POST'])
def add_document():
    _json = request.json
    _title = _json['title']
    _description = _json['description']
    _link = _json['link']
    _category = _json['category']

    from datetime import datetime
    _date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    if _title and _description and _link and _date and request.method == 'POST':
        col.insert_one({'title': _title, 'description': _description, 'link': _link,'category':_category , 'date': _date})
        resp = jsonify('Document added successfully!')
        resp.status_code = 200
        return resp
    else:
        return not_found()
    
@app.route('/documents', methods=['GET'])
def documents():
    documents = col.find()
    resp = dumps(documents)
    return resp

@app.route('/document/<id>', methods=['GET'])
def document(id):
    document = col.find_one({'_id': ObjectId(id)})
    resp = dumps(document)
    return resp

@app.route('/document/<id>', methods=['DELETE'])
def delete_document(id):
    col.delete_one({'_id': ObjectId(id)})
    resp = jsonify('Document deleted successfully!')
    resp.status_code = 200
    return resp

@app.route('/document/<id>', methods=['PUT'])
def update_document(id):
    _id = id
    _json = request.json
    _title = _json['title']
    _description = _json['description']
    _link = _json['link']
    _category = _json['category']

    if _title and _description and _link and _id and request.method == 'PUT':
        col.update_one({'_id': ObjectId(_id['$oid']) if '$oid' in _id else ObjectId(_id)}, {'$set': {'title': _title, 'description': _description, 'link': _link, 'category':_category}})
        resp = jsonify('Document updated successfully!')
        resp.status_code = 200
        return resp
    else:
        return not_found()

@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp

if __name__ == "__main__":
    app.run(debug=True)
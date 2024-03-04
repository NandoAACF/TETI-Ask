from flask import Flask, request, jsonify
from flask_pymongo import pymongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://localhost:27017/TETI-Ask'

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["TETI-Ask"]
col_documents = db["Documents"]
col_users = db["Users"]

@app.route('/document', methods=['POST'])
def add_document():
    _json = request.json
    _title = _json['title']
    _description = _json['description']
    _link = _json['link']
    _category = _json['category']
    _status = _json['status']

    from datetime import datetime
    _date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    if _title and _description and _link and _date and request.method == 'POST':
        col_documents.insert_one({'title': _title, 'description': _description, 'link': _link,'category':_category, 'status':_status, 'date': _date})
        resp = jsonify('Document added successfully!')
        resp.status_code = 200
        return resp
    else:
        return not_found()
    
@app.route('/documents', methods=['GET'])
def documents():
    documents = col_documents.find()
    resp = dumps(documents)
    return resp

@app.route('/document/<id>', methods=['GET'])
def document(id):
    document = col_documents.find_one({'_id': ObjectId(id)})
    resp = dumps(document)
    return resp

@app.route('/documents/unverified', methods=['GET'])
def documents_unverified():
    documents = col_documents.find({'status': 'unverified'})
    resp = dumps(documents)
    return resp

@app.route('/documents/verified', methods=['GET'])
def documents_verified():
    documents = col_documents.find({'status': 'verified'})
    resp = dumps(documents)
    return resp

@app.route('/document/verify/<id>', methods=['PUT'])
def verify_document(id):
    _id = id
    if _id and request.method == 'PUT':
        col_documents.update_one({'_id': ObjectId(_id)}, {'$set': {'status': "verified"}})
        resp = jsonify('Document verified successfully!')
        resp.status_code = 200
        return resp
    else:
        return not_found()

@app.route('/document/<id>', methods=['DELETE'])
def delete_document(id):
    col_documents.delete_one({'_id': ObjectId(id)})
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
    _status = _json['status']

    if _title and _description and _link and _id and request.method == 'PUT':
        col_documents.update_one({'_id': ObjectId(_id['$oid']) if '$oid' in _id else ObjectId(_id)}, {'$set': {'title': _title, 'description': _description, 'link': _link, 'category':_category, 'status':_status}})
        resp = jsonify('Document updated successfully!')
        resp.status_code = 200
        return resp
    else:
        return not_found()

@app.route('/documents/category/<category>', methods=['GET'])
def documents_filter(category):
    documents = col_documents
    if category == 'all':
        documents = documents.find({'status': 'verified'})
    else:
        documents = documents.find({'category': category, 'status': 'verified'})
    resp = dumps(documents)
    return resp
    
@app.route('/register', methods=['POST'])
def register_admin():
    _json = request.json
    _name = _json['name']
    _email = _json['email']
    _password = _json['password']

    if _name and _email and _password and request.method == 'POST':
        _hashed_password = generate_password_hash(_password)
        col_users.insert_one({'name': _name, 'email': _email, 'password': _hashed_password})
        resp = jsonify('User registered successfully!')
        resp.status_code = 200
        return resp
    else:
        return not_found()
    
@app.route('/login', methods=['POST'])
def login_admin():
    _json = request.json
    _email = _json['email']
    _password = _json['password']

    user = col_users.find_one({'email': _email})
    if user:
        if check_password_hash(user['password'], _password):
            resp = jsonify('Login successfully!')
            resp.status_code = 200
            return resp
        else:
            resp = jsonify('Invalid password!')
            resp.status_code = 400
            return resp
    else:
        resp = jsonify('Invalid email!')
        resp.status_code = 400
        return resp


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
from flask import Flask, request, jsonify
from flask_pymongo import pymongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

CORS(app)

client = pymongo.MongoClient(os.getenv("MONGO_URI") )
db = client["TETI-Ask"]
col_documents = db["Documents"]
col_users = db["Users"]
col_faq = db["FAQ"]

@app.route('/api/document', methods=['POST'])
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
        if _status == 'unverified':
            resp = jsonify('Document sent to admin!')
        else:
            resp = jsonify('Document added successfully!')
        resp.status_code = 200
        return resp
    else:
        return not_found()
    
@app.route('/api/documents', methods=['GET'])
def documents():
    documents = col_documents.find()
    resp = dumps(documents)
    return resp

@app.route('/api/document/<id>', methods=['GET'])
def document(id):
    document = col_documents.find_one({'_id': ObjectId(id)})
    resp = dumps(document)
    return resp

@app.route('/api/documents/unverified', methods=['GET'])
def documents_unverified():
    documents = col_documents.find({'status': 'unverified'})
    resp = dumps(documents)
    return resp

@app.route('/api/documents/verified', methods=['GET'])
def documents_verified():
    documents = col_documents.find({'status': 'verified'})
    resp = dumps(documents)
    return resp

@app.route('/api/document/verify/<id>', methods=['PUT'])
def verify_document(id):
    _id = id
    if _id and request.method == 'PUT':
        col_documents.update_one({'_id': ObjectId(_id)}, {'$set': {'status': "verified"}})
        resp = jsonify('Document verified successfully!')
        resp.status_code = 200
        return resp
    else:
        return not_found()

@app.route('/api/document/<id>', methods=['DELETE'])
def delete_document(id):
    col_documents.delete_one({'_id': ObjectId(id)})
    resp = jsonify('Document deleted successfully!')
    resp.status_code = 200
    return resp

@app.route('/api/document/<id>', methods=['PUT'])
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
    
@app.route('/api/documents/categories/<status>', methods=['GET'])
def get_document_categories(status):
    categories = col_documents.distinct('category', {'status': status})
    resp = dumps(categories)
    return resp

@app.route('/api/documents/category/verified/<category>', methods=['GET'])
def documents_filter_verified(category):
    documents = col_documents
    if category == 'all':
        documents = documents.find({'status': 'verified'})
    else:
        documents = documents.find({'category': category, 'status': 'verified'})
    resp = dumps(documents)
    return resp

@app.route('/api/documents/category/unverified/<category>', methods=['GET'])
def documents_filter_unverified(category):
    documents = col_documents
    if category == 'all':
        documents = documents.find({'status': 'unverified'})
    else:
        documents = documents.find({'category': category, 'status': 'unverified'})
    resp = dumps(documents)
    return resp
    
@app.route('/api/register', methods=['POST'])
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
    
@app.route('/api/login', methods=['POST'])
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
            resp = jsonify('Invalid email or password!')
            resp.status_code = 400
            return resp
    else:
        resp = jsonify('Invalid email or password!')
        resp.status_code = 400
        return resp
    
@app.route('/api/faq', methods=['POST'])
def add_faq():
    _json = request.json
    _question = _json['question']
    _answer = _json['answer']
    _category = _json['category']
    _status = _json['status']

    if _question and _answer and request.method == 'POST':
        col_faq.insert_one({'question': _question, 'answer': _answer, 'category': _category, 'status': _status})
        if _status == 'unverified':
            resp = jsonify('FAQ sent to admin!')
        else:
            resp = jsonify('FAQ added successfully!')
        resp.status_code = 200
        return resp
    else:
        return not_found()
    
@app.route('/api/faqs', methods=['GET'])
def faqs():
    faqs = col_faq.find()
    resp = dumps(faqs)
    return resp

@app.route('/api/faq/<id>', methods=['GET'])
def faq(id):
    faq = col_faq.find_one({'_id': ObjectId(id)})
    resp = dumps(faq)
    return resp

@app.route('/api/faqs/unverified', methods=['GET'])
def faqs_unverified():
    faqs = col_faq.find({'status': 'unverified'})
    resp = dumps(faqs)
    return resp

@app.route('/api/faqs/verified', methods=['GET'])
def faqs_verified():
    faqs = col_faq.find({'status': 'verified'})
    resp = dumps(faqs)
    return resp

@app.route('/api/faq/verify/<id>', methods=['PUT'])
def verify_faq(id):
    _id = id
    if _id and request.method == 'PUT':
        col_faq.update_one({'_id': ObjectId(_id)}, {'$set': {'status': "verified"}})
        resp = jsonify('FAQ verified successfully!')
        resp.status_code = 200
        return resp
    else:
        return not_found()

@app.route('/api/faq/<id>', methods=['DELETE'])
def delete_faq(id):
    col_faq.delete_one({'_id': ObjectId(id)})
    resp = jsonify('FAQ deleted successfully!')
    resp.status_code = 200
    return resp

@app.route('/api/faq/<id>', methods=['PUT'])
def update_faq(id):
    _id = id
    _json = request.json
    _question = _json['question']
    _answer = _json['answer']
    _category = _json['category']
    _status = _json['status']

    if _question and _answer and _id and request.method == 'PUT':
        col_faq.update_one({'_id': ObjectId(_id['$oid']) if '$oid' in _id else ObjectId(_id)}, {'$set': {'question': _question, 'answer': _answer, 'category': _category, 'status': _status}})
        resp = jsonify('FAQ updated successfully!')
        resp.status_code = 200
        return resp
    else:
        return not_found()
    
@app.route('/api/faqs/categories/<status>', methods=['GET'])
def get_categories(status):
    categories = col_faq.distinct('category', {'status': status})
    resp = dumps(categories)
    return resp
    
@app.route('/api/faqs/category/verified/<category>', methods=['GET'])
def faqs_filter_verified(category):
    faqs = col_faq
    if category == 'all':
        faqs = faqs.find({'status': 'verified'})
    else:
        faqs = faqs.find({'category': category, 'status': 'verified'})
    resp = dumps(faqs)
    return resp

@app.route('/api/faqs/category/unverified/<category>', methods=['GET'])
def faqs_filter_unverified(category):
    faqs = col_faq
    if category == 'all':
        faqs = faqs.find({'status': 'unverified'})
    else:
        faqs = faqs.find({'category': category, 'status': 'unverified'})
    resp = dumps(faqs)
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
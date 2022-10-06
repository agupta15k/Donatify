'''

Flask application script to create the backend endpoints for the software

=================================================================================================================

Endpoints: 

1. /
empty()  --  empty function that only returns a static string


2. /items/

    Input parameters: 
    None

    Output:
    Response returns the items present in table

3. /additem/

    Input parameters:
    item_name, quantity, description, zipcode, city, donor_id, category

    Output:
    Response returns a success, message

4. /updateitem/

    Input parameters:
    item_name, quantity, description, zipcode, city, donor_id, category

    Output:
    Response returns a success, message

-----------------------------------------------------------------------------------------------------------------
'''
#required imports
from werkzeug.exceptions import HTTPException
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from utils import *

#Flask application configuration
app = Flask(__name__)
CORS(app)

#### error handlers ####
# http exceptions handler
# @app.errorhandler(HTTPException)
# def handle_exception(e):
#     """Return JSON instead of HTML for HTTP errors."""
#     # start with the correct headers and status code from the error
#     response = e.get_response()
#     # replace the body with JSON
#     response.data = json.dumps({
#         "code": e.code,
#         "name": e.name,
#         "description": e.description,
#     })
#     response.content_type = "application/json"
#     logging.error('########### ' + str(e) + ' ###########', exc_info=True)
#     return response


# @app.errorhandler(Exception)
# def handle_exception(e):
#     # pass through HTTP errors
#     if isinstance(e, HTTPException):
#         return e
#     err = {
#         "code": -1,
#         "name": "Server Error",
#         "description": "Unexpected Error. Please contact Admin"

#     }
#     logging.error('########### ' + str(e) + ' ###########', exc_info=True)
#     # now you're handling non-HTTP exceptions only
#     return jsonify(err)

#### end of error handlers ####


@app.route('/', methods=['GET', 'POST'])
def empty():

    return jsonify({"status": 200, "data": {}, "message": "Backend working"})


@app.route('/items/', methods=['GET'])
def home():
    '''
    Home page route method
    Output: Return 10 item set present in the item table. 
    '''

    if request.method == 'GET':
        page = request.args.get('page')
        id = request.args.get('id')
        print(page)
        status, msg = get_items(page, id)

        if status:
            if msg == []:
                return jsonify({"status": 200, "data": {}, "message": "No more data"})
            else:
                return jsonify({"status": 200, "data": msg, "message": "Fetched records successfully"})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})


@app.route('/additem/', methods=['POST', 'GET'])
def additem():
    '''
    Inserting new item 
    Output: Return the status of the operation 
    '''

    # extract request parameters
    if request.method == 'POST':
        data = json.loads(request.data)

        status, msg = insert_item(
            data['item_name'], data['quantity'], data['description'], data['zipcode'], data['city'], data['donor_id'], data['category'])

        if status:
            return jsonify({"status": 200, "data": {}, "message": msg})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})


@app.route('/updateitem/', methods=['POST', 'PUT', 'GET'])
def updateitem():
    '''
    updating item 
    Output: Return the status of the operation
    '''

    # extract request parameters
    if request.method == 'PUT':
        data = json.loads(request.data)

        status, msg = update_item(data)

        if status:
            return jsonify({"status": 200, "data": {}, "message": msg})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})


@app.route('/addDonation', methods=['POST', 'GET'])
def add_Donation():
    if request.method == 'POST':
        data = json.loads(request.data)
        item_id = data['item_id']
        recipient_id = data['recipient_id']
        status, msg = addDonation(item_id, recipient_id)

        if status:
            return jsonify({"status": 200, "data": {}, "message": msg})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})


@app.route('/donor/history', methods=['POST', 'GET'])
def getDonorInfo():
    if request.method == 'GET':
        id = request.args.get('id')
        status, data = getDonorHistory(id)
        if status:
            if data == []:
                return jsonify({"status": 200, "data": {}, "message": "No records found"})
            else:
                return jsonify({"status": 200, "data": data, "message": "Donation History Records"})
        else:
            return jsonify({"status": 400, "data": {}, "message": data})


@app.route('/recipient/history', methods=['POST', 'GET'])
def getRecieverInfo():
    if request.method == 'GET':

        id = request.args.get('id')
        status, data = getRecieverHistory(id)
        if status:
            if data == []:
                return jsonify({"status": 200, "data": {}, "message": "No records found"})
            else:
                return jsonify({"status": 200, "data": data, "message": "Donation History Records"})
        else:
            return jsonify({"status": 200, "data": {}, "message": data})
        

@app.route('/register', methods=['POST', 'GET'])
def register():

    if request.method == 'POST':

        data = json.loads(request.data)
        name = data['name']
        password = data['password']
        repeatPassword = data['repeatpassword']
        email = data['email']
        city = str(data['city'])
        zipcode = str(data['zipcode'])
        interests = str(data['interests'])

        if(repeatPassword != password):
            return jsonify({"status": 405, "data": {}, "message": "Passwords do not match"})

        check, status = checkDuplicateEmail(email)
        if(status == 0):
            return jsonify({"status": 400, "data": {}, "message": "Error while Accessing the database"})
        if(check):
            return jsonify({"status": 405, "data": {}, "message": "Please fill out the form again! The Email is taken/or is written in the wrong format"})

        check = addUser(name, password, email, city, zipcode, interests)
        if(check):
            return jsonify({"status": 200, "data": {}, "message": "You have registered succesfully"})
        else:
            return jsonify({"status": 400, "data": {}, "message": "Error while adding an user"})
    elif request.method == 'POST':
        return jsonify({"status": 405, "data": {}, "message": "Please fill out the form !"})
    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = json.loads(request.data)
        email = data['email']
        password = data['password']
        check, status = loginCheck(email, password)
        if(status == 0):
            return jsonify({"status": 400, "data": {}, "message": "Database Error"})
        if (check):
            userInfo = getUserProfileByEmail(email)
            if(len(userInfo) == 0):
                return jsonify({"status": 400, "data": {}, "message": "Database Error"})
            else:
                return jsonify({"status": 200, "data": userInfo, "message": "Logged in Succesfully"})
        else:
            return jsonify({"status": 405, "data": {}, "message": "Incorrect email/Password"})
    return jsonify({"status": 200, "data": {}, "message": ""})


@app.route('/profile')
def getProfile():
    if request.method == 'GET':
        id = request.args.get('id')
        if(id):
            userInfo = getUserProfileByID(id)
            if(len(userInfo) == 0):
                return jsonify({"status": 400, "data": {}, "message": "Database Error"})
            else:
                return jsonify({"status": 200, "data": userInfo, "message": "Profile gotten succesfully"})


@app.route('/updateprofile', methods=['PUT'])
def updateprofile():
    '''
    updating profile 
    Output: Return the status of the operation
    '''
    # extract request parameters
    if request.method == 'PUT':
        data = json.loads(request.data)

        status, msg = updateProfile(data)

        if status:
            return jsonify({"status": 200, "data": {}, "message": msg})
        else:
            return jsonify({"status": 400, "data": {}, "message": msg})
        
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5001)

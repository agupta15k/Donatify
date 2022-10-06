import email
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from utils import *

app = Flask(__name__)


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
            return jsonify({"status": 405,"data":{}, "message": "Passwords do not match"})

        check, status = checkDuplicateEmail(email)
        if(status == 0):
            return jsonify({"status": 400,"data":{}, "message": "Error while Accessing the database"})
        if(check):
            return jsonify({"status": 405,"data":{}, "message": "Please fill out the form again! The Email is taken/or is written in the wrong format"})
        
        check = addUser(name, password, email, city, zipcode, interests)
        if(check):
            return jsonify({"status": 200,"data":{}, "message": "You have registered succesfully"})
        else:
            return jsonify({"status": 400,"data":{}, "message": "Error while adding an user"})
    elif request.method == 'POST':
        return jsonify({"status": 405,"data":{}, "message": "Please fill out the form !"})
    return jsonify({"status": 200,"data":{}, "message": ""})


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = json.loads(request.data)
        email = data['email']
        password = data['password']
        check, status = loginCheck(email, password)
        if(status == 0):
            return jsonify({"status": 400,"data":{}, "message": "Database Error"})
        if (check):
            userInfo = getUserProfileByEmail(email)
            if(len(userInfo) == 0):
                return jsonify({"status": 400,"data":{}, "message": "Database Error"})
            else:
                return jsonify({"status": 200,"data":userInfo, "message": "Logged in Succesfully"})
        else:
            return jsonify({"status": 405,"data":{}, "message": "Incorrect email/Password"})
    return jsonify({"status": 200,"data":{}, "message": ""})

@app.route('/profile')
def getProfile():
    if request.method == 'GET':
        id = request.args.get('id')
        if(id):
            userInfo = getUserProfileByID(id)
            if(len(userInfo) == 0):
                return jsonify({"status": 400,"data":{}, "message": "Database Error"})
            else:
                return jsonify({"status": 200,"data":userInfo, "message": "Profile gotten succesfully"})


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

import email
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from utils import *

app = Flask(__name__)


@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        repeatPassword = request.form['repeatpassword']
        email = request.form['email']
        city = request.form['city']
        zipcode = request.form['zipcode']
        interests = request.form['interests']

    # Postman Checks
    # if request.method == 'POST':
    #     print(1)
    #     data = json.loads(request.data)
    #     username = data['username']
    #     password = data['password']
    #     repeatPassword = data['repeatpassword']
    #     email = data['email']
    #     city = data['city']
    #     zipcode = data['zipcode']
    #     interests = data['interests']

        if(repeatPassword != password):
            return jsonify({"status": 405,"data":[], "message": "Passwords do not match"})

        check, status = checkDuplicateEmail(email)
        if(status == 0):
            return jsonify({"status": 400,"data":[], "message": "Error while Accessing the database"})
        if(check):
            return jsonify({"status": 405,"data":[], "message": "Please fill out the form again! The Email is taken/or is written in the wrong format"})
        
        check = addUser(username, password, email, city, zipcode, interests)
        if(check):
            return jsonify({"status": 200,"data":[], "message": "You have registered succesfully"})
        else:
            return jsonify({"status": 400,"data":[], "message": "Error while adding an user"})
    elif request.method == 'POST':
        return jsonify({"status": 405,"data":[], "message": "Please fill out the form !"})
    return jsonify({"status": 200,"data":[], "message": ""})


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST' and 'email' in request.form and 'password' in request.form:
        email = request.form['email']
        password = request.form['password']
        check, status = loginCheck(email, password)
        if(status == 0):
            return jsonify({"status": 400,"data":[], "message": "Database Error"})
        if (check):
            userInfo = getUserProfileByEmail(email)
            if(len(userInfo) == 0):
                return jsonify({"status": 400,"data":[], "message": "Database Error"})
            else:
                return jsonify({"status": 200,"data":userInfo, "message": "Logged in Succesfully"})
        else:
            return jsonify({"status": 405,"data":[], "message": "Incorrect email/Password"})
    return jsonify({"status": 200,"data":[], "message": ""})

@app.route('/profile')
def getProfile():
    if request.method == 'GET':
        id = request.args.get('id')
        if(id):
            userInfo = getUserProfileByID(id)
            if(len(userInfo) == 0):
                return jsonify({"status": 400,"data":[], "message": "Database Error"})
            else:
                return jsonify({"status": 200,"data":userInfo, "message": "Profile gotten succesfully"})

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5001)

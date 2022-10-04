from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from Backend.utils import *

app = Flask(__name__)

# Routes for registerng
@app.route('/register', methods=['POST','GET'])
def register():
    msg = ""
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form :
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        # Checks for duplicate username and emails, if present prompts a message else adds the new record into database
        if(checkDuplicateUsername(username) and checkDuplicateEmail(email)):
            msg = "Please fill out the form again! The Username and Email are taken"
        elif(checkDuplicateUsername(username)):
            msg = "Please fill out the form again! The Username is taken"
        elif(checkDuplicateEmail(email)):
            msg = "Please fill out the form again! The Email is taken"
        else:
            addUser(username, password, email)
            msg = "You have registered succesfully"
    elif request.method == 'POST':
        msg = 'Please fill out the form !'
    return render_template('register.html', msg = msg)


# Routes for logging in
@app.route('/login', methods =['POST', 'GET'])
def login():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        
        # Checks if username and password are correct
        if(loginCheck(username, password)):
            print(1)
            msg = "Logged in Succesfully"
            return render_template('index.html')
        else:
            msg = "Incorrect Username/Password"
    

    return render_template('login.html')



if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5001)
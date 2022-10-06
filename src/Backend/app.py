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
import logging
import json
import utils

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

    return jsonify({"status": 200, "data": [], "message": "Backend working"})

@app.route('/items/', methods=['GET'])
def home():
    '''
    Home page route method
    Output: Return 10 item set present in the item table. 
    '''
    
    if request.method == 'GET':
        page = request.args.get('page')
        id =  request.args.get('id')
        print(page)
        status, msg = utils.get_items(page, id)
        
        if status:
            return jsonify({"status": 200, "data": msg, "message": "Fetched records successfully"})
        else:
            return jsonify({"status": 400, "data": [], "message": msg})

@app.route('/additem/', methods=['POST','GET'])
def additem():
    '''
    Inserting new item 
    Output: Return the status of the operation 
    '''
    
    # extract request parameters
    if request.method == 'POST':
        data = json.loads(request.data)
        
        status, msg = utils.insert_item(
            data['item_name'], data['quantity'], data['description'], data['zipcode'], data['city'], data['donor_id'], data['category'])
    
        if status:
            return jsonify({"status": 200, "data":[], "message": msg})
        else:
            return jsonify({"status": 400, "data":[], "message": msg})
            

@app.route('/updateitem/', methods=['POST', 'PUT', 'GET'])
def updateitem():
    '''
    updating item 
    Output: Return the status of the operation
    '''

    # extract request parameters
    if request.method == 'PUT':
        data = json.loads(request.data)

        status, msg = utils.update_item(data)

        if status:
            return jsonify({"status": 200, "data":[], "message": msg})
        else:
            return jsonify({"status": 400, "data":[], "message": msg})

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5001)

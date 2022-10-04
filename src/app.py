'''

Flask application script to create the backend endpoints for the software

=================================================================================================================

Endpoints: 

1. /
empty()  --  empty function that only returns a static string


2. /getall/

    Input parameters: 
    None

    Output:
    Response returns all the items present in table in json format

3. /additem/

    Input parameters:
    item_name, quantity, description, zipcode, city

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
from funcs import *

#Flask application configuration
app = Flask(__name__)
CORS(app)

#### error handlers ####
# http exceptions handler
@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    logging.error('########### ' + str(e) + ' ###########', exc_info=True)
    return response


@app.errorhandler(Exception)
def handle_exception(e):
    # pass through HTTP errors
    if isinstance(e, HTTPException):
        return e
    err = {
        "code": -1,
        "name": "Server Error",
        "description": "Unexpected Error. Please contact Admin"

    }
    logging.error('########### ' + str(e) + ' ###########', exc_info=True)
    # now you're handling non-HTTP exceptions only
    return jsonify(err)

#### end of error handlers ####


@app.route('/', methods=['GET', 'POST'])
def empty():

    return "Empty function called"


@app.route('/getall/', methods=['POST','GET'])
def home():
    '''
    Home page route method
    Output: Return all the item data present in the item table.
    '''
    records = get_all_items()
    return jsonify(records)
    
@app.route('/additem/', methods=['POST','GET'])
def additem():
    '''
    Inserting new item 
    Output: Return the status of the operation and ass
    '''
    
    # extract request parameters
    if request.method == 'POST':
        item_name = request.form['item_name']
        quantity = request.form['quantity'] 
        description = request.form['description']
        zipcode = request.form['zipcode']
        city = request.form['city']

        status = insert_item(item_name, quantity, description, zipcode, city)
    
        if status:
            return jsonify({"status": status, "message": 'Record inserted successfully '})
        else:
            return jsonify({"status": status, "message": 'Failed to insert'})
            

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5001)

'''
This file holds the entire database related configuration and fucntions
'''
import ast
import re
import mysql.connector
from ast import literal_eval as make_tuple

try:
    connection = mysql.connector.connect(
        host="localhost", user="root", password="", database="donationsystem")
    cursor = connection.cursor(dictionary=True)
except:
    pass


def get_items(page, user_id):
    """
    Get all the items given the page number and user id from the database.

    Parameters
    ----------
    user_id : int
        ID associated with logged in user.
    page : int
        Page number associated with the dashboard. Each pagenumber consists of 10 items.

    Returns
    ----------
    tuple
        Returns a tuple with two elements. The first element(a boolean variable) checks to see if the database operations worked correctly. The second element is the list of all the items that the user is interested in.
    """

    try:

        sql_get_data_query = """select Interests from users where ID = %s"""
        record = (int(user_id),)
        cursor.execute(sql_get_data_query, record)
        record = cursor.fetchall()
        print(record[0]["Interests"])

        record = make_tuple(record[0]["Interests"])
        tuplerecord = tuple(record)
        print(tuplerecord)

        sql_select_query = """select * from items where category in {} order by item_id  limit 10 offset {} """.format(
            tuplerecord, int(page)*10-10)
        cursor.execute(sql_select_query)
        new_record = cursor.fetchall()
        return True, new_record

    except mysql.connector.Error as error:
        print("Failed to get record from MySQL table: {}".format(error))
        msg = "Failed to get record from MySQL table: {}".format(error)
        return False, msg

    # finally:
    #     if connection.is_connected():
    #         cursor.close()
    #         connection.close()
    #         print("MySQL connection is closed")


def insert_item(item_name, quantity, description, zipcode, city, donor_id, category):
    """
    Inserts an item into the database.

    Parameters
    ----------
    item_name : string
        Name of the item.
    quantity : int
        Quantity of the item.
    description : string
        Information about the item.
    zipcode : string
        Location of the item in zipcode.
    city : string
        Location of the item in terms of city.
    donor_id : int
        ID of the user who listed the item.
    category : string
        Which category the item belongs to. eg. Food, electronics.

    Returns
    ----------
    tuple
        Returns a tuple with two elements. The first element(a boolean variable) checks to see if the database operations worked correctly. The second element is a message about the same.
    """

    try:
        print(item_name)
        mysql_insert_query = """INSERT INTO items (item_name, quantity, description, zipcode, city, donor_id, category) 
                                VALUES (%s, %s, %s, %s, %s, %s, %s) """

        record = (item_name, quantity, description,
                  zipcode, city, donor_id, category)
        cursor.execute(mysql_insert_query, record)
        connection.commit()
        print("Record inserted successfully into item table")
        msg = "Record inserted successfully into item table"
        return True, msg

    except mysql.connector.Error as error:
        print("Failed to insert into items table {}".format(error))
        msg = "Failed to insert into items table {}".format(error)
        return False, msg

    # finally:
    #     if connection.is_connected():
    #         cursor.close()
    #         connection.close()
    #         print("MySQL connection is closed")


def update_item(data):
    """
    Updates an item in the database.

    Parameters
    ----------
    data : json
        Updated item information.

    Returns
    ----------
    tuple
        Returns a tuple with two elements. The first element(a boolean variable) checks to see if the database operations worked correctly. The second element is a message about the same.
    """

    try:
        mysql_update_query = """UPDATE items set item_name = %s, quantity = %s, description = %s, zipcode = %s, city = %s, donor_id = %s, category = %s WHERE item_id = %s """

        input_data = (data['item_name'], data['quantity'], data['description'],
                      data['zipcode'], data['city'], data['donor_id'], data['category'], data['item_id'])
        cursor.execute(mysql_update_query, input_data)
        connection.commit()
        print("Record updated successfully into item table")
        msg = "Record updated successfully into item table"
        return True, msg

    except mysql.connector.Error as error:
        print("Failed to update into items table {}".format(error))
        msg = "Failed to update into items table {}".format(error)
        return False, msg


def getDonorHistory(ID):
    """
    Gets Donor history of an user given their ID. 

    Parameters
    ----------
    ID : int
        ID of an user.

    Returns
    ----------
    tuple
        Returns a tuple with two elements. The first element(a boolean variable) checks to see if the database operations worked correctly. The second element is a list of all the items donated by the user.
    """

    try:
        cursor.execute(
            'SELECT item_id, recipient_id FROM Donation where donation_id = %s', (int(ID),))
        data = cursor.fetchall()
        print(data)
        # print(record[0]["Interests"])
        return True, data
    except mysql.connector.Error as error:
        msg = "Failed to get history {}".format(error)
        return False, msg


def getRecieverHistory(ID):
    """
    Gets receiving history of an user given their ID. 

    Parameters
    ----------
    ID : int
        ID of an user.

    Returns
    ----------
    tuple
        Returns a tuple with two elements. The first element(a boolean variable) checks to see if the database operations worked correctly. The second element is a list of all the items received by the user.
    """

    try:
        cursor.execute(
            'SELECT item_id, donation_id, recipient_id FROM Donation where recipient_id = %s', (int(ID),))
        data = cursor.fetchall()

        return True, data
    except mysql.connector.Error as error:
        msg = "Failed to get history {}".format(error)
        return False, msg


def addDonation(item_id, recipient_id):
    """
    Adds a transaction when the donation has taken place between two users.

    Parameters
    ----------
    item_id : int
        ID of the item being donated.
    recipient_id : int
        ID of the person who is receiving the donated id.

    Returns
    ----------
    tuple
        Returns a tuple with two elements. The first element(a boolean variable) checks to see if the database operations worked correctly. The second element is a message about the same.
    """

    try:
        sql_insert_query = "INSERT INTO donation (item_id, recipient_id) VALUES (%s, %s)"
        cursor.execute(sql_insert_query, (item_id, recipient_id))
        connection.commit()
        msg = msg = "Record inserted successfully into donation table"
        return True, msg
    except mysql.connector.Error as error:
        msg = "Failed to insert into donation table {}".format(error)
        return False, msg


def getUserProfileByID(ID):
    """
    Get the user information given his ID.

    Parameters
    ----------
    ID : int
        ID of the user.

    Returns
    ----------
    list
        Returns a list containing the information of an user given his id.
    """

    try:
        cursor.execute(
            'SELECT name, email, city, zipcode, interests FROM users where ID = %s', (int(ID),))
        user = cursor.fetchone()
        user["city"] = ast.literal_eval(user["city"])
        user["zipcode"] = ast.literal_eval(user["zipcode"])
        user["interests"] = ast.literal_eval(user["interests"])

        print(type(user))
        return user
    except mysql.connector.Error as error:
        print(error)
        return []


def updateProfile(data):
    """
    Updates an user in the database.

    Parameters
    ----------
    data : json
        Updated user information.

    Returns
    ----------
    tuple
        Returns a tuple with two elements. The first element(a boolean variable) checks to see if the database operations worked correctly. The second element is a message about the same.
    """

    try:
        mysql_update_query = """UPDATE users set name = %s, email=%s, city=%s, zipcode=%s, interests=%s WHERE ID = %s """

        input_data = (data['name'], data['email'],
                      str(data['city']), str(data['zipcode']), str(data['interests']), int(data['ID']))
        cursor.execute(mysql_update_query, input_data)
        connection.commit()

        print("Record updated successfully into item table")
        msg = "Record updated successfully into item table"
        return True, msg

    except mysql.connector.Error as error:
        print("Failed to update table {}".format(error))
        msg = "Failed to update table {}".format(error)
        return False, msg


def getUserProfileByEmail(email):
    """
    Gets the user information given his email.

    Parameters
    ----------
    email : string
        Email of the user.

    Returns
    ----------
    list
        Returns a list containing the information of an user given his email.
    """

    try:
        cursor.execute(
            'SELECT ID, name, email, city, zipcode, interests FROM users WHERE email = %s', (email,))
        user = cursor.fetchone()
        print(user)
        user["city"] = ast.literal_eval(user["city"])
        user["zipcode"] = ast.literal_eval(user["zipcode"])
        user["interests"] = ast.literal_eval(user["interests"])
        return user
    except mysql.connector.Error as error:
        return []


def loginCheck(email, password):
    """
    Checks if the password and email are matching in the database.

    Parameters
    ----------
    email : string
        Email of the user.
    password : string
        Password of the user.

    Returns
    ----------
    tuple
        Returns a tuple with two elements. The first element(a boolean variable) is a check to see if there is a user present with matching password and email. The second element is a status code of whether there is a database error or not.
    """

    try:
        cursor.execute(
            'SELECT * FROM users WHERE email = %s AND password = %s', (email, password))
        user = cursor.fetchone()
        if user:
            return (True, 1)
        else:
            return (False, 1)
    except mysql.connector.Error as error:
        return (False, 0)


def addUser(name, password, email, city, zipcode, interests):
    """
    Checks if the password and email are matching in the database.

    Parameters
    ----------
    name : string
        Name of the user.
    password : string
        Password of the user.
    email : string
        Email of the user.
    city : list
        List of cities which are of interest to the user.
    zipcode : list
        List of zipcodes which are of interest to the user.
    interests : list
        List of interests of the user.

    Returns
    ----------
    bool
        Checks if the user got added to the database or not.
    """

    try:
        sql_insert_query = "INSERT INTO users (name, password, email, city, zipcode, interests) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(sql_insert_query, (name, password,
                                          email, city, zipcode, interests))
        connection.commit()
        return True
    except mysql.connector.Error as error:
        return False


def checkDuplicateEmail(email):
    """
    Checks if an email is present twice in the database.

    Parameters
    ----------
    email : string
        Email of the user.

    Returns
    ----------
    tuple
        Returns a tuple with two elements. The first element(a boolean variable) is a check to see if there are two users with the same email. The second element is a status code of whether there is a database error or not.  
    """

    try:
        sql_select_query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(sql_select_query, (email,))
        # fetch result
        record = cursor.fetchall()
        match = re.match(r'[^@]+@[^@]+\.[^@]+', email)
        if record or not match:
            return (True, 1)
        else:
            return (False, 1)
    except mysql.connector.Error as error:
        return (False, 0)

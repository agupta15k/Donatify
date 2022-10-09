'''
This file holds the entire database related configuration and fucntions
'''
import ast
import re
import mysql.connector
from ast import literal_eval as make_tuple
from src.Backend.dbconfig import constants

try:
    connection = mysql.connector.connect(
        host=constants["host"], user=constants["user"], password=constants["password"], database=constants["database"])
except:
    pass
# cursor = connection.cursor(dictionary=True)
# cursor.execute('set GLOBAL max_allowed_packet=67108864')
# connection.query('SET GLOBAL connect_timeout=6000')
# cursor.execute('set max_allowed_packet=67108864')


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
        cursor = connection.cursor(dictionary=True)
        finalData = []
        sql_get_data_query = """select email, Interests from users where ID = %s"""
        record = (int(user_id),)
        cursor.execute(sql_get_data_query, record)
        data = cursor.fetchall()

        # data = make_tuple(data[0]["Interests"])
        tuplerecord = tuple(make_tuple(data[0]["Interests"]))

        sql_select_query = """select * from items where category in {} order by item_id  limit 10 offset {} """.format(
            tuplerecord, int(page)*10-10)
        cursor.execute(sql_select_query)
        new_record = cursor.fetchall()
        for record in new_record:
            finalData.append({"itemId": record["item_id"], "itemName": record["item_name"], "itemQuantity": record["quantity"], "itemDescription": record["description"],
                              "itemZipCode": record["zipcode"], "itemCity": record["city"], "itemDonorId": record["donor_id"], "itemCategory": record["category"], "donorEmail": data[0]["email"]})
        cursor.close()
        return True, finalData

    except mysql.connector.Error as error:
        print("Failed to get record from MySQL table: {}".format(error))
        msg = "Failed to get record from MySQL table: {}".format(error)
        return False, msg
    
    except Exception as e:
        print("some error occurred in get_items: {}".format(e))
        msg = "Failed to get record from MySQL table: {}".format(e)
        return False, msg

        # print("Database error: {}".format(e))

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
        cursor = connection.cursor(dictionary=True)
        mysql_insert_query = """INSERT INTO items (item_name, quantity, description, zipcode, city, donor_id, category) 
                                VALUES (%s, %s, %s, %s, %s, %s, %s) """

        record = (item_name, quantity, description,
                  zipcode, city, donor_id, category)
        cursor.execute(mysql_insert_query, record)
        connection.commit()
        print("Record inserted successfully into item table")
        msg = "Record inserted successfully into item table"
        cursor.close()
        return True, msg

    except mysql.connector.Error as error:
        print("Failed to insert into items table {}".format(error))
        msg = "Failed to insert into items table {}".format(error)
        return False, msg
    
    except Exception as e:
        print("some error occurred in insert_item: {}".format(e))
        msg = "Failed to insert into items table {}".format(e)
        return False, msg
        # return False, "some error occurred in get_items: {}".format(e)

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
        cursor = connection.cursor(dictionary=True)
        mysql_update_query = """UPDATE items set item_name = %s, quantity = %s, description = %s, zipcode = %s, city = %s, donor_id = %s, category = %s WHERE item_id = %s """

        input_data = (data['item_name'], data['quantity'], data['description'],
                      data['zipcode'], data['city'], data['donor_id'], data['category'], data['item_id'])
        cursor.execute(mysql_update_query, input_data)
        connection.commit()
        print("Record updated successfully into item table")
        msg = "Record updated successfully into item table"
        cursor.close()
        return True, msg

    except mysql.connector.Error as error:
        print("Failed to update into items table {}".format(error))
        msg = "Failed to update into items table {}".format(error)
        return False, msg

    except Exception as e:
        print("some error occurred in update_item: {}".format(e))
        msg = "Failed to update into items table {}".format(e)
        return False, msg
        # return False, "some error occurred in get_items: {}".format(e)

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
        cursor = connection.cursor(dictionary=True)
        finalData = []
        cursor.execute(
            'SELECT * FROM items where donor_id = %s', (int(ID),))
        data = cursor.fetchall()
        print(data)
        for record in data:
            finalData.append({"itemId": record["item_id"], "itemName": record["item_name"], "itemQuantity": record["quantity"], "itemDescription": record["description"],
                              "itemZipCode": record["zipcode"], "itemCity": record["city"], "itemDonorId": record["donor_id"], "itemCategory": record["category"]})
        # print(record[0]["Interests"])
        cursor.close()
        return True, finalData
    except mysql.connector.Error as error:
        print("Failed to get history {}".format(error))
        msg = "Failed to get history {}".format(error)
        return False, msg

    except Exception as e:
        print("some error occurred in getDonorHistory: {}".format(e))
        msg = "Failed to get history {}".format(e)
        return False, msg
        # return False, "some error occurred in get_items: {}".format(e)
    
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
        cursor = connection.cursor(dictionary=True)
        finalData = []
        cursor.execute(
            'SELECT items.item_id, items.item_name, users.Name, items.quantity, items.description, items.zipcode, items.city, items.category FROM Donation Inner join items on donation.item_id=items.item_id INNER JOIN users on items.donor_id=users.ID where recipient_id= %s', (int(ID),))
        data = cursor.fetchall()
        for record in data:
            finalData.append({"itemId": record["item_id"], "itemName": record["item_name"], "itemQuantity": record["quantity"], "itemDescription": record["description"],
                              "itemZipCode": record["zipcode"], "itemCity": record["city"], "itemDonorId": record["Name"], "itemCategory": record["category"]})
        # print(record[0]["Interests"])
        cursor.close()
        return True, finalData
    except mysql.connector.Error as error:
        print("Failed to get history {}".format(error))
        msg = "Failed to get history {}".format(error)
        return False, msg

    except Exception as e:
        print("some error occurred in getRecieverHistory: {}".format(e))
        msg = "Failed to get history {}".format(e)
        return False, msg
        # return False, "some error occurred in get_items: {}".format(e)

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
        cursor = connection.cursor(dictionary=True)
        sql_insert_query = "INSERT INTO donation (item_id, recipient_id) VALUES (%s, %s)"
        cursor.execute(sql_insert_query, (item_id, recipient_id))
        connection.commit()
        msg = msg = "Record inserted successfully into donation table"
        cursor.close()
        return True, msg
    except mysql.connector.Error as error:
        print("Failed to insert into donation table {}".format(error))
        msg = "Failed to insert into donation table {}".format(error)
        return False, msg

    except Exception as e:
        print("some error occurred in addDonation: {}".format(e))
        msg = "Failed to insert into donation table {}".format(e)
        return False, msg
        # return False, "some error occurred in get_items: {}".format(e)

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
        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            'SELECT name, email, city, zipcode, interests FROM users where ID = %s', (int(ID),))
        user = cursor.fetchone()
        user["city"] = ast.literal_eval(user["city"])
        user["zipcode"] = ast.literal_eval(user["zipcode"])
        user["interests"] = ast.literal_eval(user["interests"])

        print(type(user))
        cursor.close()
        return user
    except mysql.connector.Error as error:
        print(error)
        return []

    except Exception as e:
        print("some error occurred in getUserProfileByID: {}".format(e))
        return []
        # exit("some error occurred in get_items: {}".format(e))

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
        cursor = connection.cursor(dictionary=True)
        mysql_update_query = """UPDATE users set name = %s, email=%s, city=%s, zipcode=%s, interests=%s WHERE ID = %s """

        input_data = (data['name'], data['email'],
                      str(data['city']), str(data['zipcode']), str(data['interests']), int(data['ID']))
        cursor.execute(mysql_update_query, input_data)
        connection.commit()

        print("Record updated successfully into item table")
        msg = "Record updated successfully into item table"
        cursor.close()
        return True, msg

    except mysql.connector.Error as error:
        print("Failed to update table {}".format(error))
        msg = "Failed to update table {}".format(error)
        return False, msg

    except Exception as e:
        print("some error occurred in updateProfile: {}".format(e))
        msg = "Failed to update table {}".format(error)
        return False, msg
        # exit("some error occurred in get_items: {}".format(e))

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
        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            'SELECT ID, name, email, city, zipcode, interests FROM users WHERE email = %s', (email,))
        user = cursor.fetchone()
        print(user)
        user["city"] = ast.literal_eval(user["city"])
        user["zipcode"] = ast.literal_eval(user["zipcode"])
        user["interests"] = ast.literal_eval(user["interests"])
        cursor.close()
        return user
    except mysql.connector.Error as error:
        print(error)
        return []

    except Exception as e:
        print("some error occurred in getUserProfileByEmail: {}".format(e))
        return []
        # exit("some error occurred in get_items: {}".format(e))

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
        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            'SELECT * FROM users WHERE email = %s AND password = %s', (email, password))
        user = cursor.fetchone()
        cursor.close()
        if user:
            return (True, 1)
        else:
            return (False, 1)
    except mysql.connector.Error as error:
        print(error)
        return (False, 0)

    except Exception as e:
        print("some error occurred in loginCheck: {}".format(e))
        return (False, 0)
        # exit("some error occurred in get_items: {}".format(e))

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
        cursor = connection.cursor(dictionary=True)
        sql_insert_query = "INSERT INTO users (name, password, email, city, zipcode, interests) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(sql_insert_query, (name, password,
                                          email, city, zipcode, interests))
        connection.commit()
        cursor.close()
        return True
    except mysql.connector.Error as error:
        print(error)
        return False

    except Exception as e:
        print("some error occurred in addUser: {}".format(e))
        return False
        # exit("some error occurred in get_items: {}".format(e))

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
        cursor = connection.cursor(dictionary=True)
        sql_select_query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(sql_select_query, (email,))
        # fetch result
        record = cursor.fetchall()
        match = re.match(r'[^@]+@[^@]+\.[^@]+', email)
        cursor.close()
        if record or not match:
            return (True, 1)
        else:
            return (False, 1)
    except mysql.connector.Error as error:
        print(error)
        return (False, 0)

    except Exception as e:
        print("some error occurred in checkDuplicateEmail: {}".format(e))
        return (False,0)

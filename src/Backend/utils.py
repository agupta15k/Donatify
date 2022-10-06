'''
This file holds the entire database related configuration and fucntions
'''
import ast
import re
import mysql.connector
from ast import literal_eval as make_tuple

#database connection
connection = mysql.connector.connect(
    host="localhost", user="root", password="", database="donationsystem")
cursor = connection.cursor(dictionary=True)


def get_items(page, user_id):
    '''
    Select/View operation
    '''
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
    '''
    Insert operation
    '''

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
    '''
    Update Operation
    '''
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
    try:
        cursor.execute(
            'SELECT item_id, donation_id, recipient_id FROM Donation where recipient_id = %s', (int(ID),))
        data = cursor.fetchall()

        return True, data
    except mysql.connector.Error as error:
        msg = "Failed to get history {}".format(error)
        return False, msg


def addDonation(item_id, recipient_id):
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
    try:
        cursor.execute(
            'SELECT name, email, city, zipcode, interests FROM Users where ID = %s', (int(ID),))
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
    '''
    Update Operation
    '''
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
    try:
        cursor.execute(
            'SELECT ID, name, email, city, zipcode, interests FROM Users WHERE email = %s', (email,))
        user = cursor.fetchone()
        print(user)
        user["city"] = ast.literal_eval(user["city"])
        user["zipcode"] = ast.literal_eval(user["zipcode"])
        user["interests"] = ast.literal_eval(user["interests"])
        return user
    except mysql.connector.Error as error:
        return []


def loginCheck(email, password):
    try:
        cursor.execute(
            'SELECT * FROM Users WHERE email = %s AND password = %s', (email, password))
        user = cursor.fetchone()
        if user:
            return (True, 1)
        else:
            return (False, 1)
    except mysql.connector.Error as error:
        return (False, 0)


def addUser(name, password, email, city, zipcode, interests):
    try:
        sql_insert_query = "INSERT INTO Users (name, password, email, city, zipcode, interests) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(sql_insert_query, (name, password,
                                          email, city, zipcode, interests))
        connection.commit()
        return True
    except mysql.connector.Error as error:
        return False


def checkDuplicateEmail(email):
    try:
        sql_select_query = "SELECT * FROM Users WHERE email = %s"
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

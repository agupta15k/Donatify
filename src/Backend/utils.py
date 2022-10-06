import mysql.connector
import re
import json

connection = mysql.connector.connect(
    host="localhost", user="root", password="", database="donationsystem")
cursor = connection.cursor()

def getUserProfileByID(ID):
    try:
        cursor.execute('SELECT name, email, city, zipcode, interests FROM Users where ID = %s', (int(ID),))
        user = cursor.fetchone()
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
                      data['city'], data['zipcode'], data['interests'], int(data['ID']))
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
        cursor.execute('SELECT ID, name, email, city, zipcode, interests FROM Users WHERE email = %s', (email,))
        user = cursor.fetchone()
        return user
    except mysql.connector.Error as error:
        return []


def loginCheck(email, password):
    try:
        cursor.execute('SELECT * FROM Users WHERE email = %s AND password = %s', (email, password))
        user = cursor.fetchone()
        if user:
            return (True, 1)
        else:
            return (False,1)
    except mysql.connector.Error as error:
        return (False, 0)

def addUser(username, password, email, city, zipcode, interests):
    try:
        sql_insert_query = "INSERT INTO Users (name, password, email, city, zipcode, interests) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(sql_insert_query, (username, password, email, city, zipcode, interests))
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
            return (True,1)
        else:
            return (False,1)
    except mysql.connector.Error as error:
        return (False,0)


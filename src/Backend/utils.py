import mysql.connector
import re

# Getting connection the SQL Server
connection = mysql.connector.connect(
    host="localhost", user="root", password="", database="User")
cursor = connection.cursor()

# Checks if logins have correct password and username
def loginCheck(username, password):
    try:
        cursor.execute('SELECT * FROM Users WHERE username = %s AND password = %s', (username, password))
        user = cursor.fetchone()
        if user:
            return True
        else:
            return False
    except mysql.connector.Error as error:
        print("Failed to insert into Users table {}".format(error))

# Adds a user while he registers on to the platform
def addUser(username, password, email):
    try:
        sql_insert_query = "INSERT INTO Users (username, password, email) VALUES (%s, %s, %s)"
        cursor.execute(sql_insert_query, (username, password, email))
        connection.commit()
        return True
    except mysql.connector.Error as error:
        print("Failed to insert into Users table {}".format(error))

# Checks if usernames are duplicates or not
def checkDuplicateUsername(username):
    try:
        sql_select_query = "SELECT * FROM Users WHERE username = %s"
        cursor.execute(sql_select_query, (username,))
        # fetch result
        record = cursor.fetchall()
        match = re.match(r'[A-Za-z0-9]+', username)
        if record or not match:
            return True
        else:
            return False
    except mysql.connector.Error as error:
        print("Failed to insert into Users table {}".format(error))

# Checks if emails are duplicated  
def checkDuplicateEmail(email):
    try:
        sql_select_query = "SELECT * FROM Users WHERE email = %s"
        cursor.execute(sql_select_query, (email,))
        # fetch result
        record = cursor.fetchall()
        print(record)
        match = re.match(r'[^@]+@[^@]+\.[^@]+', email)
        if record or not match:
            return True
        else:
            return False
    except mysql.connector.Error as error:
        print("Failed to insert into Users table {}".format(error))



'''
This file holds the entire database related configuration and fucntions
'''
import re
import mysql.connector
from ast import literal_eval as make_tuple

#database connection
connection = mysql.connector.connect(
    host="localhost", user="root", password="", database="donationsystem")
cursor = connection.cursor()


def get_items(page, user_id):
    '''
    Select/View operation
    '''
    try:
        
        sql_get_data_query = """select Interests from users where ID = %s"""
        record = (int(user_id),)
        cursor.execute(sql_get_data_query, record)
        record = cursor.fetchall()
    
        record = str(record).replace("[('[","")
        record = record.replace("]',)]","")
        tuplerecord = make_tuple(record)
        
        sql_select_query = """select * from items where category in {} order by item_id  limit 10 offset {} """.format(tuplerecord, int(page)*10-10)
        cursor.execute(sql_select_query)
        new_record = cursor.fetchall()
        return True,new_record
        
    except mysql.connector.Error as error:
        print("Failed to get record from MySQL table: {}".format(error))
        msg = "Failed to get record from MySQL table: {}".format(error)
        return False,msg

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

        record = (item_name, quantity, description,zipcode, city, donor_id, category)
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

        input_data = (data['item_name'], data['quantity'], data['description'], data['zipcode'], data['city'], data['donor_id'], data['category'], data['item_id'])
        cursor.execute(mysql_update_query, input_data)
        connection.commit()
        print("Record updated successfully into item table")
        msg = "Record updated successfully into item table"
        return True, msg

    except mysql.connector.Error as error:
        print("Failed to update into items table {}".format(error))
        msg = "Failed to update into items table {}".format(error)
        return False, msg
    



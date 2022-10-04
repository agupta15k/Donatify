'''
This file holds the entire database related configuration and fucntions
'''
import mysql.connector

#database connection
connection = mysql.connector.connect(
    host="localhost", user="root", password="", database="donationsystem")
cursor = connection.cursor()


def get_all_items():
    '''
    Select/View operation
    '''
    try:
        sql_select_query = """select * from items"""
        
        cursor.execute(sql_select_query)
        # fetch result
        record = cursor.fetchall()

        # for row in record:
        #     print("Id = ", row[0], )
        #     print("Name = ", row[1])
        #     print("Join Date = ", row[2])
        #     print("Salary  = ", row[3], "\n")
        print(record)
        return record
        
    except mysql.connector.Error as error:
        print("Failed to get record from MySQL table: {}".format(error))

    # finally:
    #     if connection.is_connected():
    #         cursor.close()
    #         connection.close()
    #         print("MySQL connection is closed")
            

def insert_item(item_name, quantity, description, zipcode, city):
    '''
    Insert operation
    '''

    try:
        mysql_insert_query = """INSERT INTO items (item_name, quantity, description, zipcode, city) 
                                VALUES (%s, %s, %s, %s, %s) """

        record = (item_name, int(quantity), description,int(zipcode), city)
        cursor.execute(mysql_insert_query, record)
        connection.commit()
        print("Record inserted successfully into item table")
        return True

    except mysql.connector.Error as error:
        print("Failed to insert into items table {}".format(error))
        return False

    # finally:
    #     if connection.is_connected():
    #         cursor.close()
    #         connection.close()
    #         print("MySQL connection is closed")
    
    



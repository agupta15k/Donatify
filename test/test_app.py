import unittest
from unittest.mock import patch
import json
from urllib import response

from src.Backend.app import app


class TestApp(unittest.TestCase):
    def test_register_get(self):
        tester = app.test_client(self)
        response = tester.get("/register")
        expected = {'data': {}, 'message': '', 'status': 200}
        assert expected == json.loads(response.get_data(as_text=True))

    def test_updateprofile_get(self):
        tester = app.test_client(self)
        response = tester.get("/updateprofile")
        expected = {'data': {}, 'message': '', 'status': 200}
        assert expected == json.loads(response.get_data(as_text=True))

    def test_login_get(self):
        tester = app.test_client(self)
        response = tester.get("/login")
        expected = {'data': {}, 'message': '', 'status': 200}
        assert expected == json.loads(response.get_data(as_text=True))

    def test_addDonation_get(self):
        tester = app.test_client(self)
        response = tester.get("/addDonation")
        expected = {'data': {}, 'message': '', 'status': 200}
        assert expected == json.loads(response.get_data(as_text=True))

    def test_updateitem_get(self):
        tester = app.test_client(self)
        response = tester.get("/updateitem")
        expected = {'data': {}, 'message': '', 'status': 200}
        assert expected == json.loads(response.get_data(as_text=True))

    def test_additem_get(self):
        tester = app.test_client(self)
        response = tester.get("/additem")
        expected = {'data': {}, 'message': '', 'status': 200}
        assert expected == json.loads(response.get_data(as_text=True))

    def test_emptyroute_get(self):
        tester = app.test_client(self)
        response = tester.get("/")
        expected = {"status": 200, "data": {}, "message": "Backend working"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.updateProfile')
    def test_updateprofile_put(self, mock_updateProfile):
        tester = app.test_client(self)
        mock_updateProfile.return_value = True, "Record updated successfully into item table"
        inpData = {"name": "Sam", "email": "sam@gmail.com", "city": [
            "Raleigh", "Durham"], "zipcode": ["27606"], "interests": ["Food"], "ID": 3}
        response = tester.put("/updateprofile", data=json.dumps(inpData),
                              headers={'content-type': 'application/json'})
        expected = {"status": 200, "data": {},
                    "message": "Record updated successfully into item table"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.getUserProfileByID')
    def test_getProfile_get(self, mock_getUserProfileByID):
        tester = app.test_client(self)
        mock_getUserProfileByID.return_value = {"name": "Sam", "email": "sam@gmail.com", "city": [
            "Raleigh", "Durham"], "zipcode": ["27606"], "interests": ["Food"], "ID": 3}
        response = tester.get('/profile?id=3')
        expected = {"status": 200, "data": {"name": "Sam", "email": "sam@gmail.com", "city": [
            "Raleigh", "Durham"], "zipcode": ["27606"], "interests": ["Food"], "ID": 3}, "message": "Profile gotten succesfully"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.loginCheck')
    def test_login_post_1(self, mock_loginCheck):
        tester = app.test_client(self)
        mock_loginCheck.return_value = False, 1
        inpData = {"email": "sam@gmail.com", "password": "sam"}
        response = tester.post("/login", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        expected = {"status": 405, "data": {},
                    "message": "Incorrect email/Password"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.getUserProfileByEmail')
    @patch('src.Backend.app.loginCheck')
    def test_login_post_2(self, mock_loginCheck, mock_getUserProfileByEmail):
        tester = app.test_client(self)
        mock_loginCheck.return_value = True, 1
        mock_getUserProfileByEmail.return_value = {"name": "Sam", "email": "sam@gmail.com", "city": [
            "Raleigh", "Durham"], "zipcode": ["27606"], "interests": ["Food"], "ID": 3}
        inpData = {"email": "sam@gmail.com", "password": "sam"}
        response = tester.post("/login", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        expected = {"status": 200, "data": {"name": "Sam", "email": "sam@gmail.com", "city": [
            "Raleigh", "Durham"], "zipcode": ["27606"], "interests": ["Food"], "ID": 3}, "message": "Logged in Succesfully"}
        assert expected == json.loads(response.get_data(as_text=True))

    def test_register_post_1(self):
        tester = app.test_client(self)
        inpData = {"name": "Sam", "email": "sam@gmail.com", "city": [
            "Raleigh", "Durham"], "zipcode": ["27606"], "interests": ["Food"], "ID": 3, "password": "sam", "repeatpassword": "saam"}
        response = tester.post("/register", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        expected = {"status": 405, "data": {},
                    "message": "Passwords do not match"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.checkDuplicateEmail')
    def test_register_post_2(self, mock_checkDuplicateEmail):
        tester = app.test_client(self)
        mock_checkDuplicateEmail.return_value = True, 1
        inpData = {"name": "Sam", "email": "sam@gmail.com", "city": [
            "Raleigh", "Durham"], "zipcode": ["27606"], "interests": ["Food"], "ID": 3, "password": "sam", "repeatpassword": "sam"}
        response = tester.post("/register", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        expected = {"status": 405, "data": {
        }, "message": "Please fill out the form again! The Email is taken/or is written in the wrong format"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.addUser')
    @patch('src.Backend.app.checkDuplicateEmail')
    def test_register_post_3(self, mock_checkDuplicateEmail, mock_addUser):
        tester = app.test_client(self)
        mock_checkDuplicateEmail.return_value = False, 1
        mock_addUser.return_value = True
        inpData = {"name": "Sam", "email": "sam@gmail.com", "city": [
            "Raleigh", "Durham"], "zipcode": ["27606"], "interests": ["Food"], "ID": 3, "password": "sam", "repeatpassword": "sam"}
        response = tester.post("/register", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        expected = {"status": 200, "data": {},
                    "message": "You have registered succesfully"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.getRecieverHistory')
    def test_getReceiverInfo_1(self, mock_getRecieverHistory):
        tester = app.test_client(self)
        mock_getRecieverHistory.return_value = True, []
        response = tester.get("/recipient/history?id=100")
        expected = {"status": 200, "data": {}, "message": "No records found"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.getRecieverHistory')
    def test_getReceiverInfo_2(self, mock_getRecieverHistory):
        tester = app.test_client(self)
        mock_getRecieverHistory.return_value = True, [{"item_name": "rice", "quantitiy": 2, "description": "Left over rice",
                                                      "zipcode": "27606", "city": "Raleigh", "donor_name": "Henry", "category": "Food", "item_id": 2}]
        response = tester.get("/recipient/history?id=3")
        expected = {"status": 200, "data": [{"item_name": "rice", "quantitiy": 2, "description": "Left over rice",
                                            "zipcode": "27606", "city": "Raleigh", "donor_name": "Henry", "category": "Food", "item_id": 2}],
                    "message": "Donation History Records"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.getDonorHistory')
    def test_getDonorInfo_1(self, mock_getDonorHistory):
        tester = app.test_client(self)
        mock_getDonorHistory.return_value = True, []
        response = tester.get("/donor/history?id=100")
        expected = {"status": 200, "data": {}, "message": "No records found"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.getDonorHistory')
    def test_getDonorInfo_2(self, mock_getDonorHistory):
        tester = app.test_client(self)
        mock_getDonorHistory.return_value = True, [{"item_name": "rice", "quantitiy": 2, "description": "Left over rice",
                                                   "zipcode": "27606", "city": "Raleigh", "donor_name": "Henry", "category": "Food", "item_id": 2}]
        response = tester.get("/donor/history?id=3")
        expected = {"status": 200, "data": [{"item_name": "rice", "quantitiy": 2, "description": "Left over rice",
                                            "zipcode": "27606", "city": "Raleigh", "donor_name": "Henry", "category": "Food", "item_id": 2}],
                    "message": "Donation History Records"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.addDonation')
    def test_add_Donation(self, mock_addDonation):
        tester = app.test_client(self)
        mock_addDonation.return_value = True, "Record inserted successfully into donation table"
        inpData = {"item_id": 3, "recipient_id": 3}
        response = tester.post("/addDonation", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})
        expected = {"status": 200, "data": {},
                    "message": "Record inserted successfully into donation table"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.update_item')
    def test_updateitem(self, mock_updateitem):
        tester = app.test_client(self)
        mock_updateitem.return_value = True, "Record updated successfully into item table"
        inpData = {"item_name": "Rice", "quantity": 1, "description": "Rice",
                   "zipcode": "27605", "city": "Raleigh", "donor_id": 3, "category": "Food", "item_id": 2}
        response = tester.put("/updateitem", data=json.dumps(inpData),
                              headers={'content-type': 'application/json'})
        expected = {"status": 200, "data": {},
                    "message": "Record updated successfully into item table"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.insert_item')
    def test_additem(self, mock_insert_item):
        tester = app.test_client(self)
        inpData = {"item_name": "Rice", "quantity": 1, "description": "Rice",
                   "zipcode": "27605", "city": "Raleigh", "donor_id": 3, "category": "Food"}
        mock_insert_item.return_value = True, "Record inserted successfully into item table"
        response = tester.post("/additem", data=json.dumps(inpData),
                               headers={'content-type': 'application/json'})

        expected = {"status": 200, "data": {},
                    "message": "Record inserted successfully into item table"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.get_items')
    def test_home(self, mock_get_items):
        tester = app.test_client(self)
        mock_get_items.return_value = True, []
        response = tester.get("/items?id=2&page=1")
        expected = {"status": 200, "data": {}, "message": "No more data"}
        assert expected == json.loads(response.get_data(as_text=True))

    @patch('src.Backend.app.get_items')
    def test_home_1(self, mock_get_items):
        tester = app.test_client(self)
        mock_get_items.return_value = True, {"item_id": 1, "item_name": "Rice", "quantity": 1,
                                             "description": "Left over rice", "zipcode": "27606", "city": "Raleigh", "donor_id": 2, "category": "Food"}
        response = tester.get("/items?id=2&page=1")
        expected = {"status": 200, "data": {"item_id": 1, "item_name": "Rice", "quantity": 1,
                                            "description": "Left over rice", "zipcode": "27606", "city": "Raleigh", "donor_id": 2, "category": "Food"},
                    "message": "Fetched records successfully"}
        assert expected == json.loads(response.get_data(as_text=True))

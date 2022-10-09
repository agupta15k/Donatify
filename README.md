# Donatify
[![GitHub](https://img.shields.io/github/license/agupta15k/ncsu_se_fall22_22_pr_1?color=green&label=license&logo=MIT)](https://github.com/agupta15k/ncsu_se_fall22_22_pr_1/blob/main/LICENSE.md)
[![GitHub issues](https://img.shields.io/github/issues-raw/agupta15k/ncsu_se_fall22_22_pr_1)](https://github.com/agupta15k/ncsu_se_fall22_22_pr_1/issues)
[![Github closed issues](https://img.shields.io/github/issues-closed-raw/agupta15k/ncsu_se_fall22_22_pr_1)](https://github.com/agupta15k/ncsu_se_fall22_22_pr_1/issues?q=is%3Aissue+is%3Aclosed)
[![Github pull requests](https://img.shields.io/github/issues-pr/agupta15k/ncsu_se_fall22_22_pr_1?color=red)](https://github.com/agupta15k/ncsu_se_fall22_22_pr_1/pulls)
[![Github closed pull requests](https://img.shields.io/github/issues-pr-closed/agupta15k/ncsu_se_fall22_22_pr_1?color=blue)](https://github.com/agupta15k/ncsu_se_fall22_22_pr_1/pulls?q=is%3Apr+is%3Aclosed)
[![Github all contributors](https://img.shields.io/github/contributors/agupta15k/ncsu_se_fall22_22_pr_1?color=green)](https://github.com/agupta15k/ncsu_se_fall22_22_pr_1/graphs/contributors)
[![DOI](https://zenodo.org/badge/542853527.svg)](https://zenodo.org/badge/latestdoi/542853527)

:clap: “Happiness doesn’t result from what we get, but from what we give." ~ Ben Carson :clap:

Majority of us have noticed items which go to waste even when they are in their prime conditions. For example, many atriums, dining halls around the world dispose of their leftovers at the end of the day and a lot of food is being wasted. We introduce to you Donatify, a platform for donors and receivers to communicate to donate and recieve items respectively. In simple terms, a user would put up items which they would like to donate and other users, if their interests match with the item would choose to receive it.    

---
## Installation

**Backend**

1. Create virtual environment  
```
python3 -m venv <name_of_virtualenv>
```     
2. Activate Python Virtual environment  
```
<name_of_virtualenv>\Scripts\activate.bat
```
3. Install dependencies
```
pip install -r requirement.txt
```
4. Move in directory ```src\Backend``` where our app.py file is located   

5. Run below command to start the backend application
```
python app.py
```
**Note:** Make sure the database server(mysql) is on. The backend flask application will be up and running at ```localhost:5001```

**Frontend**

* Prerequisite: [npm](https://www.npmjs.com/) and [node](https://nodejs.org/en/) should be installed

1. After cloning the repository, move to the directory ```src\frontend``` where our frontend code is located

2. Install all the dependencies using npm. Command to run: ```npm install```. This will fetch the dependecies from package.json file, and install them.

3. Start the server by using the command ```npm start```. This will run the server on port ```3000```, and the website can be accessed by going to ```http://localhost:3000/```.

4. If credentials of a registered user are available, use them, or register a new user and interact with the website.

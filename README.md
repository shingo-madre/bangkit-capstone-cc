# bangkit-capstone-cc
This is the documentation for this API

## Users 
This section is used to manipulate user data such as adding new user, get user, get all user, update user, and delete user. There are 5 routes that can be used such as:
1. 'api/user' (POST)
2. 'api/users' (GET)
3. 'api/user/:id' (GET)
4. 'api/user/:id' (PUT)
5. 'api/user/:id' (DELETE)

## Crop Data 
This section is used to move crop/plants data from **user input** to **database** to **machine learning model** and **back to user**. There are 4 routes that can be used, those routes are as follows:
1. 'data/addData' (POST)
3. 'data/cropDataList' (GET)
4. 'data/cropData/:id' (GET)
5. 'data/cropData/:id' (DELETE)

## Detailed Explanation
### data/addData (POST)
This route is used to add crop data that is given by the user from the mobile application to the database. If there's an error. the API wil send an error message with status 400, but if there is nothing wrond and the data was able to be added to the database succesfully the API wil send a message that read *Received User Crop Data!*<br />
<br />
example usage : **data/addData**

### data/cropDataList (GET)
This route is used to get all the available data on the database. It will return all the data in JSON form. If there's an error while performing this route it will send a status of 400 with the error message.<br />
<br />
example usage : **data/cropDataList/**

### data/cropData/:id (GET)
This route is used to get a single data that is found using the ID of said data. The id will be passed on to the parameter. If there is no data with that ID, the API will send a status of 404 with a message that read *Data with given ID not found!*, but if there is a data with the corresponding ID the API will send that data in the form of json instead. Also, if there's an error while using this route, it will send a status of 400 with the error message.<br />
<br />
example usage : **data/cropData/120701702581**

### data/cropData/:id (DELETE)
This route is used to delete a single data using it's ID. If the data has been successfully deleted, it will send a message that read *Data sucessfully deleted*. If there's an error while deleting the data it will send a 400 status with the error message.<br />
<br />
example usage : **data/cropData/120701702581**

### api/user (POST)
This route is used to add new user to the database. It accepts 3 values *email*, *password*, *username*. If those data are successfully addded, the api will send a message that read *Data successfully added*, if there is an error it will return a status of 400 with the error message. <br />
<br />
example usage: **api/user**

### api/users (GET)
This route is used to get all the available users in the database. It will return a JSON array filled with all users data. Each user will have 4 data that is *id*, *username*, *password*, *email*. If there's no data found in the database (Database empty) the api will return a status of 404 with a message *No student record found*. If there's an error while running this route, it will send a status of 400 with the error message.
<br />
<br />
example usage: **api/users/**

### api/user/:id (GET)
This route is used to get a single user data using it's id as a parameter. It will return a JSON data of the users data. Each user will have 4 data that is *id*, *username*, *password*, *email*. If there's no user with that id the api will send a status of 404 with the message *User with the given ID not found*. If there's an error while running this route, it will send a status of 400 with the error message.
<br />
<br />
example usage: **api/user/1240182012**

### api/user/:id (PUT)
This route is used to change user data using it's id as a parameter. You can change all the user's data or just one of it's data. You will need to send a body with either *username*, *password*, *email* or it can be three of the at the same time. If the user's succesfully updated, the api will send a message *User sucessfully updated*. If there's an error while running this route, it will send a status of 400 with the error message.
<br />
<br />
example usage: **api/user/1240182012**

### api/user/:id (DELETE)
This route is used to delete user data using it's id as a parameter. If user succesfully deleted, it will send a message *User sucessfully deleted*. If there's an error while running this route, it will send a status of 400 with the error message.
<br />
<br />
example usage: **api/user/120808312**

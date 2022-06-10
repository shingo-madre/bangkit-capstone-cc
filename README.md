# bangkit-capstone-cc
This is the documentation for this API

## Users 


## Crop Data 
This section is used to move crop/plants data from **user input** to **database** to **machine learning model** and **back to user**. There are 4 routes that can be used, those routes are as follows:
1. 'data/addData' (POST)
3. 'data/cropDataList' (GET)
4. 'data/cropData/:id' (GET)
5. 'data/cropData/:id' (DELETE)

## Detailed Explanation
### data/addData (POST)
This route is used to add crop data that is given by the user from the mobile application to the database. If there's an error. the API wil send an error message with status 400, but if there is nothing wrond and the data was able to be added to the database succesfully the API wil send a message that read *Received User Crop Data!*
### data/cropDataList (GET)
This route is used to get all the available data on the database. It will return all the data in JSON form. If there's an error while performing this route it will send a status of 400 with the error message
### data/cropData/:id (GET)
This route is used to get a single data that is found using the ID of said data. The id will be passed on to the parameter. If there is no data with that ID, the API will send a status of 404 with a message that read *Data with given ID not found!*, but if there is a data with the corresponding ID the API will send that data in the form of json instead. Also, if there's an error while using this route, it will send a status of 400 with the error message
### data/cropData/:id (DELETE)
This route is used to delete a single data using it's ID. If the data has been successfully deleted, it will send a message that read *Data sucessfully deleted*. If there's an error while deleting the data it will send a 400 status with the error message

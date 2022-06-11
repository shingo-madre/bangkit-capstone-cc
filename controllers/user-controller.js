'use strict';

const firebase = require('../db');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
// const firestore = firebase.firestore();

const addUser = async (req, res, next) => {
	try {
		const data = req.body;
		await firebase.collection('users').doc().set(data);
		res.send({
			"error": false,
			"message": "User Created"
		});
	} catch (error) {
		res.status(400).send({
			"error" : true,
			"message" : error.message
		});
	}
}

const getAllUsers = async (req, res, next) => {
	try {
		const users = await firebase.collection('users');
		const data = await users.get();
		const usersArray = [];
		if (data.empty) {
			res.status(404).send({
				"error" : true,
				"message" : 'No User record found'
			});
		} else {
			data.forEach(doc => {
				const user = new User(
					doc.id,
					doc.data().email,
					doc.data().password,
					doc.data().username
				);
				usersArray.push(user);
			});
			res.send({
				"error" : false,
				"message" : "success",
				"listUser" : usersArray
			});
		}
	} catch (error) {
		res.status(400).send({
			"error" : true,
			"message" : error.message
		});
	}
}

const getUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await firebase.collection('users').doc(id);
		const data = await user.get();
		if (!data.exists) {
			res.status(404).send({
				"error" : true,
				"message" : 'User with the given ID not found'
			});
		} else {
			res.send({
				"error" : false,
				"message" : "success",
				"user" : data.data() 
			});
		}
	} catch (error) {
		res.status(400).send({
			"error" : true,
			"message" : error.message
		});
	}
}

const updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const data = req.body;
		const user = await firebase.collection('users').doc(id);
		await user.update(data);
		res.send({
			"error" : false,
			"message" : 'User successfuly updated',
		});
	} catch (error) {
		res.status(400).send({
			"error" : true,
			"message" : error.message
		});
	}
}

const deleteUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		await firestore.collection('users').doc(id).delete();
		res.send({
			"error" : false,
			"message" : 'User successfuly deleted',
		});
	} catch (error) {
		res.status(400).send({
			"error" : true,
			"message" : error.message
		});
	}
}

const loginUser = async (req, res, next) => {
	const { username, password } = req.body

	const userRef = firebase.collection('users');
	const userQuery = await userRef.where('username', '==', username).get();

	if (userQuery.empty) {
		return res.status(404).send({
			"error" : true,
			"message" : 'Username not found'
		})
	}

	let user = {};

	userQuery.forEach(doc => {
		user = {
			id: doc.id,
			...doc.data()
		}
	});	

	console.log(user);
	//check if password is the same
	if (user.password !== password) {
		return res.status(404).send({
			"error" : true,
			"message" : 'Password is wrong'
		})
	}

	const token = jwt.sign({
		id: user.id,
		username: user.username
	}, process.env.ACCESS_TOKEN_SECRET
	);

	return res.status(200).send({
		"error": false,
    "message": "success",
		"loginResult": {
			"userId": user.id,
			"name": user.username,
			'token': token
		}
	})
}

module.exports = {
	addUser,
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	loginUser,
}
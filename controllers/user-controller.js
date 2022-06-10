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
		res.send('Data successfuly added');
	} catch (error) {
		res.status(400).send(error.message);
	}
}

const getAllUsers = async (req, res, next) => {
	try {
		const users = await firebase.collection('users');
		const data = await users.get();
		const usersArray = [];
		if (data.empty) {
			res.status(404).send('No student record found');
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
			res.send(usersArray);
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
}

const getUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await firebase.collection('users').doc(id);
		const data = await user.get();
		if (!data.exists) {
			res.status(404).send('User with the given ID not found');
		} else {
			res.send(data.data());
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
}

const updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const data = req.body;
		const user = await firebase.collection('users').doc(id);
		await user.update(data);
		res.send('User successfuly updated');
	} catch (error) {
		res.status(400).send(error.message);
	}
}

const deleteUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		await firestore.collection('users').doc(id).delete();
		res.send('User successfuly deleted');
	} catch (error) {
		res.status(400).send(error.message);
	}
}

const loginUser = async (req, res, next) {
	const { username, password } = req.body

	const userRef = firebase.collection('users');
	const userQuery = await userRef.where('username', '==', username);

	if (userQuery.empty) {
		return res.status(404).send('Username not found')
	}

	const user = {
		id = userQuery.doc[0].id,
		...userQuery.doc[0].data()
	}

	//check if password is the same
	if (user.password !== password) {
		return res.status(404).send('Password is wrong')
	}

	const token = jwt.sign({
		id: user.id,
		username: user.username
	}, process.env.ACCESS_TOKEN_SECRET
	);

	return res.status(200).send(token)
}

module.exports = {
	addUser,
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	loginUser,
}
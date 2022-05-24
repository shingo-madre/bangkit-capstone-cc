'use strict';

const firebase = require('../db');
const CropData = require('../models/crop');
const UserData = require('../models/crop');
const firestore = firebase.firestore();

const addCropData = async function(req, res) {
    try {
		const cropData = req.body; //date, location, crops
		await firestore.collection('data').doc().set(cropData);
		res.send('Received User Data!');
	} catch (error) {
		res.status(400).send(error.message);
	}
}

const getAllCropData = async (req, res, next) => {
	try {
		const cropData = await firestore.collection('users');
		const data = await cropData.get();
		const cropDataArray = [];
		if (data.empty) {
			res.status(404).send('No student record found');
		} else {
			data.forEach(doc => {
				const cropData = new CropData(
					doc.id,
					doc.data().date,
					doc.data().crops,
					doc.data().location
				);
				cropDataArray.push(cropData);
			});
			res.send(cropDataArray);
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
}

const getCropDataById = async function(req, res) {
    try {
		const id = req.params.id;
		const dcropData = await firestore.collection('data').doc(id);
		const data = await cropData.get();
		if (!data.exists) {
			res.status(404).send('Data with given ID not found!');
		} else {
			res.send(data.data());
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
}

const deleteCropDataById = async (req, res, next) => {
	try {
		const id = req.params.id;
		await firestore.collection('users').doc(id).delete();
		res.send('User successfuly deleted');
	} catch (error) {
		res.status(400).send(error.message);
	}
}

module.exports = {
    addCropData,
    getAllCropData,
    getCropDataById,
    deleteCropDataById,
}
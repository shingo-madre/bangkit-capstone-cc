'use strict';

const firebase = require('../db');
const CropData = require('../models/crop');

const addCropData = async function(req, res) {
  try {
		const { date, crops, location } = req.body;

		await firebase.collection('data').doc().set({
			"date": date,
			"crops": crops,
			"location": location
		});
		res.send({
			"error": false,
			"message": "Received User Crop Data!"
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
}

const getAllCropData = async (req, res, next) => {
	try {
		const cropData = await firebase.collection('data');
		const data = await cropData.get();
		const cropDataArray = [];
		if (data.empty) {
			res.status(404).send('Data not found!');
		} else {
			data.forEach(doc => {
				const dataNew = new CropData(
					doc.id,
					doc.data().date,
					doc.data().crops,
					doc.data().location
				);
				cropDataArray.push(dataNew);
			});
			res.send({
				"error" : false,
				"message" : "success",
				"listCropData" : cropDataArray
			});
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
}

const getCropDataById = async function(req, res) {
    try {
		const id = req.params.id;
		const cropData = await firebase.collection('data').doc(id);
		const data = await cropData.get();
		if (!data.exists) {
			res.status(404).send('Data with given ID not found!');
		} else {
			res.send({
				"error" : false,
				"message" : "success",
				"cropData" : data.data()
			});
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
}

const deleteCropDataById = async (req, res, next) => {
	try {
		const id = req.params.id;
		await firebase.collection('data').doc(id).delete();
		res.send({
			"error" : false,
			"message" : 'Data successfuly deleted'
		});
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
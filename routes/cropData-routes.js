const express = require('express');
const {
    addCropData,
    getAllCropData,
    getCropDataById,
    deleteCropDataById,
} = require('../controllers/data-controller');
const requireAuth = require('../middleware/authMIddleware');

const router = express.Router();

router.post('/addData', addCropData);
router.get('/cropDataList', getAllCropData);
router.get('/cropData/:id', getCropDataById);
router.delete('/cropData/:id', deleteCropDataById);

module.exports = {
    routes: router
}
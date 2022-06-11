const express = require('express');
const {
    addCropData,
    getAllCropData,
    getCropDataById,
    deleteCropDataById,
} = require('../controllers/data-controller');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addData', requireAuth, addCropData);
router.get('/cropDataList', requireAuth, getAllCropData);
router.get('/cropData/:id', requireAuth, getCropDataById);
router.delete('/cropData/:id', requireAuth, deleteCropDataById);

module.exports = {
    routes: router
}
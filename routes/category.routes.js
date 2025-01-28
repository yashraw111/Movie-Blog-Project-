const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');

router.post('/create',categoryController.addCategory)
router.get('/deleteCat/:id',categoryController.removeCategory)
router.post('/update/:id',categoryController.updateCategory)

module.exports =  router

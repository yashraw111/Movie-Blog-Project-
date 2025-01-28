
const router = require('express').Router()
const AdminController = require('../controller/Admin.controller')
const upload = require('../middleware/upload')

router.post('/createUser',AdminController.createUser)
router.post('/loginUser',AdminController.loginUser)
router.post('/profileUpdate',upload.single('profile_image'),AdminController.updateProfile)
router.post('/forgot-password',AdminController.updatePassword)
router.post('/changePassword',AdminController.changePassword)
router.post('/forgotPassword',AdminController.forgotPassword)

module.exports = router


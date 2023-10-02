'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();
const md_auth = require('../middlewares/authenticated');

router.get('/probando', UserController.probando);
router.post('/add', UserController.save);
router.post('/login', UserController.login);
router.put('/updateUser',md_auth.autenticated, UserController.update);

module.exports = router;
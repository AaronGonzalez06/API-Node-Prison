'use strict'

const express = require('express');
const PrisionerController = require('../controllers/prisioner');

const router = express.Router();
const md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './uploads/prisioners'});

router.post('/addPrisioner',md_auth.autenticated, PrisionerController.addPrisioner);
router.get('/listPrisioner/:num?',md_auth.autenticated, PrisionerController.listPrisioner);
router.put('/updatePrisioner/:id',md_auth.autenticated, PrisionerController.updatePrisioner);
router.get('/searchDniPrisoner/:dni',md_auth.autenticated, PrisionerController.searchDniPrisoner);
router.get('/addCellPrisioner/:dni',md_auth.autenticated, PrisionerController.addCellPrisioner);
router.post('/imgPrisioner',[md_upload, md_auth.autenticated], PrisionerController.imgPrisioner);

module.exports = router;
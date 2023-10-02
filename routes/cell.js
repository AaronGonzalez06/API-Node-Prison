'use strict'

const express = require('express');
const CellController = require('../controllers/cell');

const router = express.Router();
const md_auth = require('../middlewares/authenticated');

router.post('/addCell',md_auth.autenticated, CellController.addCell);
router.get('/listCell/:num?',md_auth.autenticated, CellController.listCell);
router.put('/updateCell/:id',md_auth.autenticated, CellController.updateCell);
router.get('/searchSector/:sector',md_auth.autenticated, CellController.searchSector);

module.exports = router;
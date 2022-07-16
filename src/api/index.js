const express = require('express');
const info = require('./info');
const health = require('./health');
const ip = require('./ip');
const geoIp = require('./geo');

const router = express.Router();

router.use('/', info);
router.use('/health', health);
router.use('/ip', ip);
router.use('/geo-ip', geoIp);

module.exports = router;

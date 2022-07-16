const express = require('express');

const {
  getIpGeo,
  isIPv4
} = require('../helpers');

const router = express.Router();

router.get('/:ipAddress', async (req, res) => {
  const { ipAddress } = req.params;
  try {
    if (isIPv4(ipAddress)) return res.status(422).json({ message: 'The requested IP must be IPv4' });
    const geoData = await getIpGeo(ipAddress);
    return res.json(geoData);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;

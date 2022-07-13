const express = require('express');
const config = require('./config');
const {
  getPublicIp,
  getToken,
  listDnsZone,
  getARecord
} = require('../helpers');

const router = express.Router();

const getClientIp = (req) => req.clientIp;

router.get('/current', (req, res) => res.json({ ip: getClientIp(req) }));
router.get('/client', (req, res) => res.json({ ip: getClientIp(req) }));
router.get('/server', async (req, res) => res.json({ ip: await getPublicIp() }));
router.get('/dns', (req, res) => res.redirect('/api/v1/ip/dns/@'));
router.get('/dns/:record', async (req, res) => {
  const { record: requestedRecord } = req.params;
  if (!config.dns.enabled) return res.status(503).json({ message: 'Configure DNS to use this endpoint' });
  const token = await getToken(config.dns.tenantId, config.dns.clientId, config.dns.clientSecret);
  if (!token) return res.status(401).json({ message: 'Unable to authenticate to Azure' });
  const zones = await listDnsZone(token, config.dns.subscriptionId, config.dns.resourceGroupName);
  if (zones && !zones.includes(config.dns.zone)) {
    console.error(`Error - DNS zone [${config.dns.zone}] not found in resource group [${config.dns.resourceGroupName}]`);
    process.exit(1);
  }

  try {
    const record = await getARecord(
      token,
      config.dns.subscriptionId,
      config.dns.resourceGroupName,
      config.dns.zone,
      requestedRecord
    );
    if (
      record
      && record.properties
      && record.properties.ARecords
      && record.properties.ARecords.length > 0
    ) {
      return res.json({
        ip: record.properties.ARecords[0].ipv4Address
      });
    }

    return res.status(404).json({ message: 'Record not found' });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;

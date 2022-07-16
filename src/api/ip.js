const express = require('express');
const config = require('./config');
const {
  getClientIp,
  getServerIp
} = require('../helpers/routeHelpers');

const {
  getIpGeo,
  isIPv4,
  getToken,
  listDnsZone,
  getARecord
} = require('../helpers');

const router = express.Router();

router.get('/current', async (req, res) => getClientIp(req, res));
router.get('/client', (req, res) => getClientIp(req, res));
router.get('/server', async (req, res) => getServerIp(req, res));
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
    const response = {};
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
      response.ip = record.properties.ARecords[0].ipv4Address;
      if (req.query.saturate === 'true') {
        if (!isIPv4(response.ip)) {
          return res.status(422).json({
            message: 'To saturate request the requested IP must be IPv4'
          });
        }
        response.geographicInfo = await getIpGeo(response.ip);
      }
      return res.json(response);
    }

    return res.status(404).json({ message: 'Record not found' });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;

const getToken = require('./auth');
const getPublicIp = require('./publicIp');
const getIpGeo = require('./ipApi');
const isIPv4 = require('./isIpv4');
const {
  listDnsZone,
  getDnsZone,
  listARecords,
  getARecord,
  createUpdateRecord
} = require('./azure');

module.exports = {
  getPublicIp,
  getIpGeo,
  isIPv4,
  getToken,
  listDnsZone,
  getDnsZone,
  listARecords,
  getARecord,
  createUpdateRecord
};

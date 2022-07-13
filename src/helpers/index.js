const getToken = require('./auth');
const getPublicIp = require('./publicIp');
const {
  listDnsZone,
  getDnsZone,
  listARecords,
  getARecord,
  createUpdateRecord
} = require('./azure');

module.exports = {
  getPublicIp,
  getToken,
  listDnsZone,
  getDnsZone,
  listARecords,
  getARecord,
  createUpdateRecord,
};

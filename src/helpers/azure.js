const makeRequest = require('./rest');

async function listDnsZone(token, subscriptionId, resourceGroupName) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  }

  const zoneList = await makeRequest(
    'GET',
    `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Network/dnsZones?api-version=2018-05-01`, 
    headers
  );

  if (zoneList.error && zoneList.error.code === 'AuthorizationFailed') {
    throw new Error(zoneList.error.message);
  }
  return zoneList.value.map((zone) => zone.name);
}

async function getDnsZone(token, subscriptionId, resourceGroupName, zoneName) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  }

  return makeRequest(
    'GET',
    `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Network/dnsZones/${zoneName}?api-version=2018-05-01`, 
    headers
  );
}

async function getARecord(token, subscriptionId, resourceGroupName, zoneName, record) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  };

  return makeRequest(
    'GET',
    `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Network/dnsZones/${zoneName}/A/${record}?api-version=2018-05-01`, 
    headers
  );
}

async function listARecords(token, subscriptionId, resourceGroupName, zoneName) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  };

  return makeRequest(
    'GET',
    `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Network/dnsZones/${zoneName}/A?api-version=2018-05-01`, 
    headers
  );
}

async function createUpdateRecord(
  token,
  subscriptionId,
  resourceGroupName,
  zoneName,
  record,
  ipAddress
) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token
  };

  const body = {
    properties: {
      TTL: 3600,
      ARecords: [
        {
          ipv4Address: ipAddress
        }
      ]
    }
  };

  return makeRequest(
    'PUT',
    `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Network/dnsZones/${zoneName}/A/${record}?api-version=2018-05-01`, 
    headers,
    body
  );
}

module.exports = {
  listDnsZone,
  getDnsZone,
  listARecords,
  getARecord,
  createUpdateRecord
};

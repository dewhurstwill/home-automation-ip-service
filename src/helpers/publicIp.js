const makeRequest = require('./rest');

async function getPublicIp() {
  const headers = {
    'Content-Type': 'application/json',
  }
  const { ip } = await makeRequest(
    'GET',
    'https://api.my-ip.io/ip.json',
    headers
  );
  return ip;
}

module.exports = getPublicIp;

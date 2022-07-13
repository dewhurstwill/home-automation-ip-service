const qs = require('qs');
const makeRequest = require('./rest');

function buildAuthorizationToken(tokenResponse) {
  const { token_type, access_token } = tokenResponse;
  return `${token_type} ${access_token}`;
}

async function getToken(tenantId, clientId, clientSecret) {
  const headers = { 
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const body = qs.stringify({
    'grant_type': 'client_credentials',
    'client_id': clientId,
    'client_secret': clientSecret,
    'resource': 'https://management.azure.com/',
  });

  const token = await makeRequest(
    'POST', 
    `https://login.microsoftonline.com/${tenantId}/oauth2/token`, 
    headers,
    body
  );

  return buildAuthorizationToken(token);
}

module.exports = getToken;
const makeRequest = require('./rest');

async function getIpGeo(ipAddress) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const apiResponse = await makeRequest(
    'GET',
    `http://ip-api.com/json/${ipAddress}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,mobile,proxy,hosting,query`,
    headers
  );
  return apiResponse;
}

module.exports = getIpGeo;

const axios = require('axios');

async function makeRequest(method, url, headers, data) {
  return await axios({
    method,
    url,
    headers,
    data,
    validateStatus: function (status) {
      return status < 500;
    }
  })
  .then(function (response) {
    //console.log(JSON.stringify(response.data));
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports = makeRequest;
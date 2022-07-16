const net = require('net');

function isIPv4(ipAddress) {
  return net.isIPv4(ipAddress);
}

module.exports = isIPv4;

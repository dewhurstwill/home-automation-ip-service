const {
  isIPv4,
  getIpGeo,
  getPublicIp
} = require('.');

async function getClientIp(req, res) {
  const ip = req.clientIp;
  const response = { ip };
  if (req.query.saturate === 'true') {
    if (!isIPv4(ip)) {
      return res.status(422).json({
        message: 'To saturate request the requested IP must be IPv4'
      });
    }
    response.geographicInfo = await getIpGeo(ip);
  }
  return res.json(response);
}

async function getServerIp(req, res) {
  const ip = await getPublicIp();
  const response = { ip };
  if (req.query.saturate === 'true') {
    if (!isIPv4(ip)) {
      return res.status(422).json({
        message: 'To saturate request the requested IP must be IPv4'
      });
    }
    response.geographicInfo = await getIpGeo(ip);
  }
  return res.json(response);
}

module.exports = {
  getClientIp,
  getServerIp
};

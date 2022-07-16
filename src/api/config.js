module.exports = {
  host: process.env.HOST || '',
  server: process.env.SERVER || '',
  dns: {
    enabled: process.env.DNS === 'true',
    tenantId: process.env.AZURERM_TENANT_ID
      || process.env.ARM_TENANT_ID
      || process.env.TENANT_ID
      || undefined,
    clientId: process.env.AZURERM_CLIENT_ID
      || process.env.ARM_CLIENT_ID
      || process.env.CLIENT_ID
      || undefined,
    clientSecret: process.env.AZURERM_CLIENT_SECRET
      || process.env.ARM_CLIENT_SECRET
      || process.env.CLIENT_SECRET
      || undefined,
    subscriptionId: process.env.SUBSCRIPTION_ID
      || undefined,
    resourceGroupName: process.env.RESOURCE_GROUP_NAME
      || undefined,
    zone: process.env.DNS_ZONE
      || undefined,
  },
  serviceInfo: {
    microservice: process.env.NAME || 'IP Address Service',
    routes: [{
      path: '/api/v1/health',
      methods: ['GET'],
      description: 'Returns the health status of the service'
    }, {
      path: '/api/v1/info',
      methods: ['GET'],
      description: 'Returns useful information about the service'
    }, {
      path: '/api/v1/ip/current',
      methods: ['GET'],
      description: 'Returns the public IP of the requestor',
      queryParams: '?saturate=true - this will add geographic data about the IP to the response'
    }, {
      path: '/api/v1/ip/client',
      methods: ['GET'],
      description: 'Returns the public IP of the requestor',
      queryParams: '?saturate=true - this will add geographic data about the IP to the response'
    }, {
      path: '/api/v1/ip/server',
      methods: ['GET'],
      description: 'Returns the public IP of the server',
      queryParams: '?saturate=true - this will add geographic data about the IP to the response'
    }, {
      path: '/api/v1/ip/dns',
      methods: ['GET'],
      description: `Returns the IP of the DNS record at the apex of ${process.env.DNS_ZONE || 'x'}`,
      queryParams: '?saturate=true - this will add geographic data about the IP to the response'
    }, {
      path: '/api/v1/ip/dns/:record',
      methods: ['GET'],
      description: `Returns the IP of a specific DNS record under the ${process.env.DNS_ZONE || 'x'} zone`,
      queryParams: '?saturate=true - this will add geographic data about the IP to the response'
    },{
      path: '/api/v1/geo-ip/:ipAddress',
      methods: ['GET'],
      description: 'Returns the geographic info about the IP'
    }],
    description: process.env.DESCRIPTION || 'Service for attaining client current IP address or home network/server current IP address',
  }
};

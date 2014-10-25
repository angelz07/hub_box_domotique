var config = {};


config.zibaseIp = process.env.IP_ZIBASE || '192.168.1.7'; // <- Enter LAN IP address

config.platform = '';
config.zibase = ''; // <- Enter Main Identifier
config.token = ''; // <- Enter Token
config.debug = false;

module.exports = config;

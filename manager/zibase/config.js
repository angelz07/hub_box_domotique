var config = {};


config.zibaseIp = process.env.IP_ZIBASE || '192.168.1.7'; // <- Enter LAN IP address

config.platform = 'zibase2.net';
config.zibase = 'Xi10c9xe8d1bb05'; // <- Enter Main Identifier
config.token = '0c21b4e68a'; // <- Enter Token
config.debug = false;

module.exports = config;

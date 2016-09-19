export default {
  default: require('./default'),
  math: require('./math'),
  random: require('./random'),
  serial: require('./serial'),
  // Arduino libraries
  'EEPROM.h': require('./eeprom'),
  'NetSwarm.h': require('./netswarm'),
};

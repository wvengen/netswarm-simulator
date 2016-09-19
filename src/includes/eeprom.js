function _read(rt, _this, address) {
  const eeprom = rt.config.eeprom;
  return rt.val(rt.unsignedcharTypeLiteral, eeprom[address.v] || 0xff);
}

function _write(rt, _this, address, value) {
  const eeprom = rt.config.eeprom;
  eeprom[address.v] = value.v;
}

export function load(rt) {
  const EEPROM = {
    t: rt.newClass('EEPROM', []),
    v: {
      members: {},
    },
  };
  rt.scope[0]['EEPROM'] = EEPROM;

  rt.types[rt.getTypeSignature(EEPROM.t)] = {
    '#father': 'object',
  };

  rt.regFunc(_read, EEPROM.t, 'read', [rt.intTypeLiteral], null);
  rt.regFunc(_write, EEPROM.t, 'write', [rt.intTypeLiteral, rt.unsignedcharTypeLiteral], rt.unsignedcharTypeLiteral);
};

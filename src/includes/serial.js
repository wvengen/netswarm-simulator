
function _noop(rt, _this) {
  // nothing to do
}

function _print(rt, _this, v) {
  const stdio = rt.config.stdio;
  if (rt.isStringType(v.t)) {
    stdio.write(rt.getStringFromCharArray(v));
  } else if (rt.isCharType(v.t)) {
    stdio.write(String.fromCharCode(v.v));
  } else {
    // @todo show more info for relevant types
    stdio.write(v.v.toString());
  }
}

function _println(rt, _this, v) {
  v && _print(rt, _this, v);
  rt.config.stdio.write('\n');
}

export function load(rt) {
  const type = rt.newClass('Serial', []);

  const Serial = {
    t: type,
    v: {
      members: {},
    },
  };
  rt.scope[0]['Serial'] = Serial;
  const pchar = rt.normalPointerType(rt.charTypeLiteral);

  rt.types[rt.getTypeSignature(Serial.t)] = {
    '#father': 'object',
  };

  rt.regFunc(_noop, Serial.t, 'begin', [rt.intTypeLiteral], null);
  rt.regFunc(_noop, Serial.t, 'flush', [], null);
  rt.regFunc(_print, Serial.t, 'print', ['#default'], null);
  rt.regFunc(_println, Serial.t, 'println', ['#default'], null);
};

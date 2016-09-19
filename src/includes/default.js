const unsignedLongTypeLiteralGen = rt => rt.primitiveType('unsigned long');
const maxLongGen = rt => rt.config.limits['unsigned long'].max;
const startMillis = Date.now();

function _millis(rt, _this) {
  const millis = Date.now() - startMillis;
  return rt.val(unsignedLongTypeLiteralGen(rt), millis % maxLongGen(rt));
}

function _micros(rt, _this) {
  const micros = (Date.now() - startMillis) * 1000;
  return rt.val(unsignedLongTypeLiteralGen(rt), micros % maxLongGen(rt));
}

export function load(rt) {
  rt.include('math');
  rt.include('random');
  rt.include('serial');

  rt.regFunc(_millis, 'global', 'millis', [], unsignedLongTypeLiteralGen(rt));
  rt.regFunc(_micros, 'global', 'micros', [], unsignedLongTypeLiteralGen(rt));
};

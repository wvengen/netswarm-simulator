
function _random(rt, _this, m1, m2) {
  const min = Math.ceil(m2 ? m1.v : 0);
  const max = Math.floor(m2 ? m2.v : m1.v);
  const val = Math.floor(Math.random() * (max - min)) + min;
  return rt.val(rt.intTypeLiteral, val);
}

export function load(rt) {
  // @todo randomSeed, can't use `Math.random()` anymore (`JSCPP/src/includes/cstdlib` has an answer)
  rt.regFunc(_random, 'global', 'random', [rt.intTypeLiteral], rt.intTypeLiteral, [rt.intTypeLiteral]);
};

function def(rt, name, nargs, fun) {
  const tDouble = rt.doubleTypeLiteral;
  const argdef = Array.from(Array(nargs)).map(() => tDouble);
  rt.regFunc((rt, _this, ...args) => rt.val(tDouble, fun(...args)), 'global', name, argdef, rt.doubleTypeLiteral);
}

export function load(rt) {
  // @todo figure out when to use double and when to use integer definitions
  def(rt, 'min', 2, (x, y) => Math.min(x.v, y.v));
  def(rt, 'max', 2, (x, y) => Math.max(x.v, y.v));
  def(rt, 'constrain', 3, (x, a, b) => Math.max(a.v, Math.min(x.v, b.v)));
  // @todo map
  def(rt, 'pow', 2, (base, exp) => Math.pow(base.v, exp.v));
  def(rt, 'sqrt', 1, (x) => Math.sqrt(x.v));
  def(rt, 'sin', 1, (x) => Math.sin(x.v));
  def(rt, 'cos', 1, (x) => Math.cos(x.v));
  def(rt, 'tan', 1, (x) => Math.tan(x.v));
};

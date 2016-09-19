
export function load(rt) {
  // const f = rt.regFunc((a,b,c) => {console.log(c);}, 'global', '__x', [], null);
  // console.log('f', f);
  const type = rt.newClass('NetSwarm', []);

  const NetSwarm = {
    t: type,
    v: {
      members: {},
    },
  };
  rt.scope[0]['NetSwarm'] = NetSwarm;

  rt.types[rt.getTypeSignature(NetSwarm.t)] = {
    '#father': 'object',
  };
};

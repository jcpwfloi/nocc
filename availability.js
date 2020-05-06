const cc = require('./cc');

async function main() {
  await cc.entry();
  var avail = await cc.check();
  console.log('Summer 2020 Availability:');
  console.log(avail);
  var avail = await cc.check('2209');
  console.log('Fall 2020 Availability:');
  console.log(avail);
}

main();

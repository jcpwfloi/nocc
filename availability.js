const cc = require('./cc');

async function main() {
  var avail = await cc.avail();
  console.log('Summer 2020 Availability:');
  console.log(avail);
  var avail = await cc.avail('2209');
  console.log('Fall 2020 Availability:');
  console.log(avail);
}

main();

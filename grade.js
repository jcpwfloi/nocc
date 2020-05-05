const cc = require('./cc');

async function main() {
  console.log('Your grade for Spring 2020:');
  console.log(await cc.getGrade('2202'));
}

main();

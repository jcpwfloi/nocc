const cc = require('./cc');
const semester = require('./semester.json')

async function main() {
  await cc.entry();
  if (process.argv[2]) {
    console.log(await cc.getGrade(process.argv[2]));
    return;
  }
  for (var sem in semester) {
    console.log(`Your grade for ${sem}:`);
    console.log(await cc.getGrade(semester[sem]));
  }
}

main();

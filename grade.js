const cc = require('./cc');
const semester = require('./semester.json')

async function printGrade(sem) {
  console.log(`Your grade for ${sem}:`);
  console.log(await cc.getGrade(semester[sem]));
}

async function main() {
  await cc.entry();
  if (process.argv[2]) {
    if (process.argv[2] === 'current') {
      printGrade('current');
    }
    else printGrade(process.argv[2]);
    return;
  }
  for (var sem in semester) {
    if (sem === 'current') continue;
    await printGrade(sem);
  }
}

main();

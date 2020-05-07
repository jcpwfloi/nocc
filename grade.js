const cc = require('./cc');
const semester = require('./semester.json')

async function printGrade(sem) {
  console.log(`Your grade for ${sem}:`);
  console.log(await cc.grade(semester[sem]));
}

async function main() {
  if (process.argv[2]) {
    if (process.argv[2] === 'current') {
      await printGrade('current');
    }
    else await printGrade(process.argv[2]);
    return;
  }
  for (var sem in semester) {
    if (sem === 'current') continue;
    await printGrade(sem);
  }
}

main();

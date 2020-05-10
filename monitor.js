const cc = require('./cc');
const config = require('./config.json');

var unirest = require("unirest");

function send(message) {
  return new Promise((resolve, reject) => {
    var req = unirest("POST", "https://quick-easy-sms.p.rapidapi.com/send");

    req.headers({
      "x-rapidapi-host": "quick-easy-sms.p.rapidapi.com",
      "x-rapidapi-key": config["x-rapidapi-key"],
      "content-type": "application/x-www-form-urlencoded",
      "useQueryString": true
    });

    req.form({
      "message": message,
      "toNumber": config.toNumber
    });

    req.end(function (res) {
      if (res.error) reject(new Error(res.error));
      else resolve(res.body);
    });
  });
}


async function main() {
  var avail = await cc.avail();
  var ans = avail.filter(v => v.course == 'ENGL 140-01W');
  if (!ans[0].availability) {
    setTimeout(main, 10000);
  } else {
    await send("engl 140 is available !!!!!!!!!! yes");
  }
}

main();

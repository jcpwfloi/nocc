const cheerio = require('cheerio');
const querystring = require('querystring');
const he = require('he');
const config = require('./config.json');

const { CookieJar, Cookie } = require('tough-cookie');
const CookieFileStore = require('tough-cookie-file-store').FileCookieStore;
var cookieJar = new CookieJar(new CookieFileStore('./cookie.json'));

const nodeFetch = require('node-fetch');
var fetch = require('fetch-cookie/node-fetch')(nodeFetch, cookieJar);
const fs = require('fs');

function resetCookie() {
  cookieJar = new CookieJar(new CookieFileStore('./cookie.json'));
  fetch = require('fetch-cookie/node-fetch')(nodeFetch, cookieJar);
}

async function ccRequest(url, opts) {
  var body = await fetch(url, opts);
  var SAMLRequest = await body.text();
  var answer = SAMLRequest;
  $ = cheerio.load(SAMLRequest);
  SAMLRequest = $('input[name="SAMLRequest"]').attr('value');
  if (SAMLRequest == null) return answer;
  body = await fetch("https://sso.unc.edu/idp/profile/SAML2/POST/SSO", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6,de-DE;q=0.5,de;q=0.4,zh-TW;q=0.3",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "upgrade-insecure-requests": "1"
    },
    "referrer": "https://pa.cc.unc.edu/psp/paprd/EMPLOYEE/EMPL/h/?tab=NC_REDIRECT&TargetPage=PortalHome",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": `RelayState=${encodeURIComponent(url)}&SAMLRequest=${encodeURIComponent(SAMLRequest)}`,
    "method": "POST",
    "mode": "cors"
  });
  SAMLResponse = await body.text();
  $ = cheerio.load(SAMLResponse);
  SAMLResponse = $('input[name="SAMLResponse"]').attr('value');
  body = await fetch("https://cs.cc.unc.edu/Shibboleth.sso/SAML2/POST", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6,de-DE;q=0.5,de;q=0.4,zh-TW;q=0.3",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "upgrade-insecure-requests": "1",
      "cookie": "BIGipServer~Middleware~peoplesoft_portal-prd-80=!eAkEgGKsOuJ30c1E5Zdeu132m0Oo2bXFhoxOanscvTtW/jotPzF2btsCopt6RBey3YQ/BkupQUmKgw=="
    },
    "referrer": "https://sso.unc.edu/idp/profile/SAML2/POST/SSO?execution=e1s1",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": `RelayState=${encodeURIComponent(url)}&SAMLResponse=${encodeURIComponent(SAMLResponse)}`,
    "method": "POST",
    "mode": "cors"
  });
  return await body.text();
}

async function _entry() {
  console.log("Logging in....");
  var body = await
    fetch("https://pa.cc.unc.edu/psp/paprd/EMPLOYEE/EMPL/h/?tab=NC_REDIRECT&TargetPage=PortalHome", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6,de-DE;q=0.5,de;q=0.4,zh-TW;q=0.3",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-site",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
      },
      "referrer": "https://connectcarolina.unc.edu/",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": null,
      "method": "GET",
      "mode": "cors"
    });
  var SAMLRequest = await body.text();
  var $ = cheerio.load(SAMLRequest);
  SAMLRequest = $('input[name="SAMLRequest"]').attr('value');
  body = await fetch("https://sso.unc.edu/idp/profile/SAML2/POST/SSO", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6,de-DE;q=0.5,de;q=0.4,zh-TW;q=0.3",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "upgrade-insecure-requests": "1"
    },
    "referrer": "https://pa.cc.unc.edu/psp/paprd/EMPLOYEE/EMPL/h/?tab=NC_REDIRECT&TargetPage=PortalHome",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": `RelayState=https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FEMPL%2Fh%2F%3Ftab%3DNC_REDIRECT%26TargetPage%3DPortalHome&SAMLRequest=${encodeURIComponent(SAMLRequest)}`,
    "method": "POST",
    "mode": "cors"
  });
  body = await fetch("https://sso.unc.edu/idp/profile/SAML2/POST/SSO?execution=e1s1", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6,de-DE;q=0.5,de;q=0.4,zh-TW;q=0.3",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "cookie": "JSESSIONID=698452D62FE757112473805D36C3CA0E; BIGipServer~Middleware~sso-prd-8080=!Cq5v8DyBdsXfPvxE5Zdeu132m0Oo2RIB/quaBhZ/+FpSL8tHnw4U8jt9nyESMOD/7Wf7QZ0ei+XOG8A="
    },
    "referrer": "https://sso.unc.edu/idp/profile/SAML2/POST/SSO?execution=e1s1",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": `j_username=${config.username}&j_password=${encodeURIComponent(config.password)}&_eventId_proceed=`,
    "method": "POST",
    "mode": "cors"
  });
  var SAMLResponse = await body.text();
  var $ = cheerio.load(SAMLResponse);
  SAMLResponse = $('input[name="SAMLResponse"]').attr('value');
  body = await fetch("https://pa.cc.unc.edu/Shibboleth.sso/SAML2/POST", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6,de-DE;q=0.5,de;q=0.4,zh-TW;q=0.3",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "upgrade-insecure-requests": "1",
      "cookie": "BIGipServer~Middleware~peoplesoft_portal-prd-80=!eAkEgGKsOuJ30c1E5Zdeu132m0Oo2bXFhoxOanscvTtW/jotPzF2btsCopt6RBey3YQ/BkupQUmKgw=="
    },
    "referrer": "https://sso.unc.edu/idp/profile/SAML2/POST/SSO?execution=e1s1",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": `RelayState=https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FEMPL%2Fh%2F%3Ftab%3DNC_REDIRECT%26TargetPage%3DPortalHome&SAMLResponse=${encodeURIComponent(SAMLResponse)}`,
    "method": "POST",
    "mode": "cors"
  });
  body = await body.text();
  if (/You have exceeded maximum login attempts in 24/.test(body))
    throw new Error("You have exceeded maximum login attempts in 24 hours");
  if (/Clear the browser cache of the browser you are using,/.test(body))
    throw new Error("Try rm cookie.json and re-run the program");
}

async function entry() {
  try {
    await _entry();
    return true;
  } catch (e) {
    console.log(e);
    process.exit();
  }
}

async function selectSemester(body, termNum) {
  var term = termNum || '2203';
  var pid = /EMPLID=\d+&/.exec(body);
  pid = pid[0];
  pid = pid.substr(7, 9);
  return await fetch(`https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART&Action=A&ACAD_CAREER=UGRD&EMPLID=${pid}&INSTITUTION=UNCCH&STRM=${term}`, {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6,de-DE;q=0.5,de;q=0.4,zh-TW;q=0.3",
      "sec-fetch-dest": "iframe",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    },
    "referrer": "https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART&Action=A&ExactKeys=Y",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });
}

async function getpid() {
  var body = await
    ccRequest("https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART&Action=A&ExactKeys=Y", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6,de-DE;q=0.5,de;q=0.4,zh-TW;q=0.3",
        "sec-fetch-dest": "iframe",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": config.cookie
      },
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": null,
      "method": "GET",
      "mode": "cors"
    });
  var pid = /EMPLID=\d+&/.exec(body);
  pid = pid[0];
  pid = pid.substr(7, 9);
  return pid;
}

async function check(term) {
  var body = await
    ccRequest("https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART&Action=A&ExactKeys=Y", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6,de-DE;q=0.5,de;q=0.4,zh-TW;q=0.3",
        "sec-fetch-dest": "iframe",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": config.cookie
      },
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": null,
      "method": "GET",
      "mode": "cors"
    });
  body = await selectSemester(body, term);
  body = await(body.text());
  var $ = cheerio.load(body);
  var ans = [];
  $('table.PSLEVEL1GRID').first().find('tbody > tr').each(async function() {
    var course = $(this).find('a.PSHYPERLINK');
    var availability = $(this).find('img').eq(1);
    if (course.html() != null) {
      course = course.html().substr(0, 12);
      ans.push({
        course,
        availability: availability.attr('alt') == 'Open'
      });
    }
  });
  return ans;
}

async function getGrade(termNum) {
  var term = termNum || '2209';
  var body = await
    ccRequest(`https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_GRADE.GBL??Action=A&ExactKeys=Y&ACAD_CAREER=UGRD&EMPLID=${await getpid()}&INSTITUTION=UNCCH&STRM=${term}`, {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6,de-DE;q=0.5,de;q=0.4,zh-TW;q=0.3",
        "content-type": "application/x-www-form-urlencoded",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      "referrerPolicy": "no-referrer-when-downgrade",
      "method": "GET",
      "mode": "cors"
    });
  var $ = cheerio.load(body);
  var ans = [];
  $('table.PSLEVEL1GRID').first().find('tbody > tr').each(async function() {
    var row = $(this).find('td');
    if (row.html() != null) {
      var number = row.find('a').html();
      var name = row.eq(1).find('span').html();
      var grade = row.eq(4).find('span').html();
      if (grade == '&#xA0;') grade = null;
      ans.push({ number, name: he.decode(name), grade })
    }
  });
  return ans;
}

exports.entry = entry;
exports.getGrade = getGrade;
exports.check = check;

exports.grade = async (t) => {
  var ans;
  try {
    ans = await getGrade(t);
  } catch(e) {
    fs.unlinkSync('./cookie.json');
    resetCookie();
    await entry();
    ans = await getGrade(t);
  }
  return ans;
}

exports.avail = async (t) => {
  var ans;
  try {
    ans = await check(t);
  } catch(e) {
    fs.unlinkSync('./cookie.json');
    resetCookie();
    await entry();
    ans = await check(t);
  }
  return ans;
}


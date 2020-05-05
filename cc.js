const fetch = require('node-fetch');
const cheerio = require('cheerio');
const config = require('./config.json');

async function courseState(course, avail) {
  console.log(course, avail);
}
async function parseGrade(grades) {
  console.log(grades);
}

async function check() {
  var body = await
    fetch("https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART&Action=A&ExactKeys=Y", {
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
  body = await body.text();
  var $ = cheerio.load(body);
  $('table.PSLEVEL1GRID').first().find('tbody > tr').each(async function() {
    var course = $(this).find('a.PSHYPERLINK');
    var availability = $(this).find('img').eq(1);
    if (course.html() != null) {
      course = course.html().substr(0, 12);
      await courseState(course, availability.attr('alt') == 'Open');
    }
  });
}

async function getGrade() {
  var body = await
    fetch("https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_GRADE.GBL", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6,de-DE;q=0.5,de;q=0.4,zh-TW;q=0.3",
        "content-type": "application/x-www-form-urlencoded",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": config.cookie
      },
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "ICAJAX=1&ICNAVTYPEDROPDOWN=0&ICType=Panel&ICElementNum=0&ICStateNum=22&ICAction=DERIVED_SSS_SCT_SSR_PB_GO&ICModelCancel=0&ICXPos=0&ICYPos=0&ResponsetoDiffFrame=-1&TargetFrameName=None&FacetPath=None&ICFocus=&ICSaveWarningFilter=0&ICChanged=-1&ICSkipPending=0&ICAutoSave=0&ICResubmit=0&ICSID=xyfeYiNiGoqlQVHcVzvEXrdkxy%2BT24yMMsbYTH3t0e8%3D&ICActionPrompt=false&ICBcDomData=C~UnknownValue~EMPLOYEE~EMPL~NUI_FRAMEWORK.PT_LANDINGPAGE.GBL~PT_LANDINGPAGE~Student~UnknownValue~UnknownValue~https%3A%2F%2Fpa.cc.unc.edu%2Fpsc%2Fpaprd%2FEMPLOYEE%2FEMPL%2Fc%2FNUI_FRAMEWORK.PT_LANDINGPAGE.GBL%3FInfoShibsession%3Dtrue~UnknownValue*C~UnknownValue~EMPLOYEE~SA~SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL~SSS_STUDENT_CENTER~Student%20Center~UnknownValue~UnknownValue~https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL~UnknownValue*C~UnknownValue~EMPLOYEE~SA~SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL~SSS_STUDENT_CENTER~Student%20Center~UnknownValue~UnknownValue~https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL~UnknownValue*C~UnknownValue~EMPLOYEE~SA~SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL~SSR_SSENRL_TERM~Select%20Term~UnknownValue~UnknownValue~https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL%3FAction%3DA%26ExactKeys%3DY~UnknownValue*C~UnknownValue~EMPLOYEE~SA~SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL~SSR_SSENRL_CART~Shopping%20Cart~UnknownValue~UnknownValue~https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL%3FAction%3DA%26ACAD_CAREER%3DUGRD%26EMPLID%3D730245762%26INSTITUTION%3DUNCCH%26STRM%3D2203~UnknownValue*C~UnknownValue~EMPLOYEE~SA~SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL~SSS_STUDENT_CENTER~Student%20Center~UnknownValue~UnknownValue~https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL%3FAction%3DU~UnknownValue*C~UnknownValue~EMPLOYEE~SA~SA_LEARNER_SERVICES.SSR_SSENRL_GRADE.GBL~SSR_SSENRL_GRADE~Student%20Grades~UnknownValue~UnknownValue~https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSR_SSENRL_GRADE.GBL%3F~UnknownValue*C~UnknownValue~EMPLOYEE~SA~SA_LEARNER_SERVICES.SSS_MY_PLANNER.GBL~SSS_MY_PLANNER~My%20Planner~UnknownValue~UnknownValue~https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSS_MY_PLANNER.GBL%3FAction%3DA~UnknownValue*C~UnknownValue~EMPLOYEE~SA~SA_LEARNER_SERVICES.SSS_MY_ACAD.GBL~SSS_MY_ACAD~My%20Academics~UnknownValue~UnknownValue~https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSS_MY_ACAD.GBL%3FAction%3DU~UnknownValue*C~UnknownValue~EMPLOYEE~SA~SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL~SSS_STUDENT_CENTER~Student%20Center~UnknownValue~UnknownValue~https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL%3FAction%3DU~UnknownValue*C~UnknownValue~EMPLOYEE~SA~SA_LEARNER_SERVICES.SSR_SSENRL_GRADE.GBL~SSR_SSENRL_GRADE~Student%20Grades~UnknownValue~UnknownValue~https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSR_SSENRL_GRADE.GBL%3F~UnknownValue*C~UnknownValue~EMPLOYEE~SA~SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL~SSS_STUDENT_CENTER~Student%20Center~UnknownValue~UnknownValue~https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL~UnknownValue*C~UnknownValue~EMPLOYEE~SA~SA_LEARNER_SERVICES.SSR_SSENRL_GRADE.GBL~SSR_SSENRL_TERM~Select%20Term~UnknownValue~UnknownValue~https%3A%2F%2Fpa.cc.unc.edu%2Fpsp%2Fpaprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSR_SSENRL_GRADE.GBL%3FAction%3DA~UnknownValue&ICPanelName=&ICFind=&ICAddCount=&ICAppClsData=&DERIVED_SSTSNAV_SSTS_MAIN_GOTO$27$=9999&SSR_DUMMY_RECV1$sels$2$$0=2",
      "method": "POST",
      "mode": "cors"
    });
  body = await body.text();
  var $ = cheerio.load(body);
  $('table.PSLEVEL1GRID').first().find('tbody > tr').each(async function() {
    var row = $(this).find('td');
    if (row.html() != null) {
      var number = row.find('a').html();
      var name = row.eq(1).find('span').html();
      var grade = row.eq(4).find('span').html();
      if (grade == '&#xA0;') grade = null;
      await parseGrade({
        number, name, grade
      });
    }
  });
}

exports.getGrade = getGrade;
exports.check = check;

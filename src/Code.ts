function setScheduling() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => ScriptApp.deleteTrigger(t))
  ScriptApp.newTrigger('execution')
    .timeBased()
    .everyMinutes(1)
    .create();
}


const to = "soramugi.chika@gmail.com";
const urls = [
  "https://www.google.com",
  "http://example.com",
  "http://nothing.example.com",
]

function execution() { urls.forEach(fetchUrl) }

const fetchUrl = (url: string) => {
  let statusCode: number = 0;
  try {
    const response = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    statusCode = response.getResponseCode();
  } catch(err) {
    statusCode = 999;
  }

  const statusPreCode =  PropertiesService.getScriptProperties().getProperty(url);
  if (statusCode !== parseInt(statusPreCode)) {
    PropertiesService.getScriptProperties().setProperty(url, String(statusCode));
    sendMail(url, statusCode);
  }
}

const sendMail = (url: string, statusCode: number) => {
  const state = (statusCode === 200) ? "OK" : "ALARM";
  const subject = "[gas-health-check] [" + state + "] " + statusCode + ": " + url ;
  const body = state + "\n" + statusCode + "\n" + url;

  MailApp.sendEmail(to, subject, body);
}

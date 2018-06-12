
function setScheduling() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => ScriptApp.deleteTrigger(t))
  ScriptApp.newTrigger("execution")
    .timeBased()
    .everyMinutes(1)
    .create();
}

const scriptProperties = PropertiesService.getScriptProperties()

function execution() {
  const properties: any = scriptProperties.getProperties()
  for (let key in properties) {
    if (/^http/.test(key)) {
      fetchUrl(key, properties[key])
    }
  }
}

const fetchUrl = (url: string, statusPreCode: string) => {
  let statusCode: number = 0;
  try {
    const response = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    statusCode = response.getResponseCode();
  } catch(err) {
    statusCode = 999;
  }

  if (statusCode !== parseInt(statusPreCode)) {
    scriptProperties.setProperty(url, String(statusCode));
    sendMail(url, statusCode);
  }
}

const sendMail = (url: string, statusCode: number) => {
  const state = (/^2/.test(String(statusCode))) ? "OK" : "ALARM";
  const to = scriptProperties.getProperty("to")
  const subject = "[gas-health-check] [" + state + "] " + statusCode + ": " + url ;
  const body = state + "\n" + statusCode + "\n" + url;

  MailApp.sendEmail(to, subject, body);
}

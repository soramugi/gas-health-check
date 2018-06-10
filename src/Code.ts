function myFunction() {
  Logger.log("Hello World")
}

function setScheduling() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach((t) => {
    ScriptApp.deleteTrigger(t);
  })
  ScriptApp.newTrigger('myFunction')
    .timeBased()
    .everyMinutes(1)
    .create();
}

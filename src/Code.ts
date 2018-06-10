function myFunction() {
    Logger.log("Hello World")
}

function setScheduling() {
    ScriptApp.newTrigger('myFunction')
        .timeBased()
        .everyMinutes(1)
        .create();
}

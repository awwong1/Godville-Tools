var x = require('casper').selectXPath;
var system = require('system');
var casper = require('casper').create({
  verbose: false,
  logLevel: "info"
});

var username = "username";
var password = "password";

function consoleRead(message) {
  system.stdout.writeLine(message);
  var line = system.stdin.readLine();
  return line;
}

//check for arguments
if (casper.cli.has('god') && casper.cli.has('pass')) {
  username = casper.cli.get('god').toString();
  password = casper.cli.get('pass').toString();
} else {
  username = consoleRead("God's Name: ");
  password = consoleRead("Password: ");
}

casper.start('https://godvillegame.com/login/', function() {
  this.echo("Setting up.....", "INFO");
});

casper.waitForSelector("form input[name='username']", function() {
  this.fillSelectors('form[action="/login/login"]', {
    'input[name = username ]': username,
    'input[name = password ]': password,
  });
  this.evaluate(function() {
    if(!document.getElementById('save_login').checked){
        $('#save_login').click();
    }
    $('form').submit();
  });
  casper.echo("Logged In!", "COMMENT");
}, true);

casper.then(function() {
  var casp = this;

  var waiting = function(casp, sleep_time) {
    casper.reload();
    casp.wait(sleep_time, function() { //200s waitW

      try {

        gp = parseInt(casp.evaluate(function() {
          return __utils__.findOne('.gp_val').innerText;
        }).slice(0, -1));

        casp.echo("The amount of GP is:  " + gp, "PARAMETER");
        if (gp >= 75) { //so it leaves 50 godpower to activate items
          casp.clickLabel("Encourage");
          casp.echo("Encouraged!!", "COMMENT");
          gp -= 25;
        }

      } catch (err) {
        //still don't know what is actually happening
        casp.echo("Something happened, restarting.. ", "ERROR");
        casp.echo("Current URL: " + this.getCurrentUrl(), "ERROR");
        casper.page.render ('page.png');
      }

      //if there is still GP left
      if (gp >= 75)
        waiting(casp, 5000); //just wait 5 seconds
      else
        waiting(casp, 500000); //wait 500 seconds

    });
  };

  waiting(casp, 1000);
});




casper.run();

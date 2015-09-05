var x = require('casper').selectXPath;
var sleep = require('sleep');
var casper = require('casper').create({
  verbose: false,
  logLevel: "info"
});

casper.start('https://godvillegame.com/login/', function() {
  this.echo("Setting up.....", "INFO");
});

casper.waitForSelector("form input[name='username']", function() {
  this.fillSelectors('form[action="/login/login"]', {
    'input[name = username ]': 'username',
    'input[name = password ]': 'password',
  });
  this.evaluate(function() {
    $('form').submit();
  });
  casper.echo("Logged In!", "COMMENT");
}, true);

casper.then(function() {

  while (true) {
    this.echo("----Getting the amount of GP", "INFO");

    gp = parseInt(this.evaluate(function() {
      return __utils__.findOne('.gp_val').innerText;
    }).slice(0, -1));

    this.echo("The amount of GP is:  " + gp, "PARAMETER");
    if (gp >= 25) {
      this.clickLabel("Encourage");
      this.echo("Encouraged!!", "PARAMETER");
    }
		sleep.sleep(60);
  }
});




casper.run();

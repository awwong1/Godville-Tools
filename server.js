var x = require('casper').selectXPath;
var casper = require('casper').create({
  verbose: false,
  logLevel: "info"
});

casper.start('https://godvillegame.com/login/', function() {
  this.echo("Setting up.....", "INFO");
});

casper.waitForSelector("form input[name='username']", function() {
  this.fillSelectors('form[action="/login/login"]', {
    'input[name = username ]': 'user',
    'input[name = password ]': 'pass',
  });
  this.evaluate(function() {
    $('form').submit();
  });
  casper.echo("Logged In!", "COMMENT");
}, true);

casper.then(function() {
  var who = this;

  var waiting = function(who) {
    who.wait(200000, function() { //200s wait
      who.echo("----Getting the amount of GP", "INFO");

      gp = parseInt(pwhoop.evaluate(function() {
        return __utils__.findOne('.gp_val').innerText;
      }).slice(0, -1));

      who.echo("The amount of GP is:  " + gp, "PARAMETER");
      if (gp >= 25) {
        who.clickLabel("Encourage");
        who.echo("Encouraged!!", "PARAMETER");
      }
      waiting(who);
    });
  }
  waiting(who);
});




casper.run();

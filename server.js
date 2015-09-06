var x = require('casper').selectXPath;
var casper = require('casper').create({
  verbose: false,
  logLevel: "info"
});
var username = "username";
var password = "password";

casper.start('https://godvillegame.com/login/', function() {
  this.echo("Setting up.....", "INFO");
});

casper.waitForSelector("form input[name='username']", function() {
  this.fillSelectors('form[action="/login/login"]', {
    'input[name = username ]': username,
    'input[name = password ]': password,
  });
  this.evaluate(function() {
    $('form').submit();
  });
  casper.echo("Logged In!", "COMMENT");
}, true);

casper.then(function() {
  var casp = this;

  var waiting = function(casp, sleep_time) {
    casp.wait(sleep_time, function() { //200s waitW

      gp = parseInt(casp.evaluate(function() {
        return __utils__.findOne('.gp_val').innerText;
      }).slice(0, -1));

      casp.echo("The amount of GP is:  " + gp, "PARAMETER");
      if (gp >= 25) {
        casp.clickLabel("Encourage");
        casp.echo("Encouraged!!", "COMMENT");
	gp -= 25;
      }
    
      //if there is still GP left
      if(gp >= 25)
	waiting(casp, 5000); //just wait 5 seconds
      else
	waiting(casp, 500000); //wait 500 seconds	
    
    });
  };

  waiting(casp, 1000);
});




casper.run();

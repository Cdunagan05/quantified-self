var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user sees exercise on exercises.html", function(){
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
  });

  test.afterEach(function() {
    driver.get('http://localhost:8080/exercises.html');
    driver.executeScript('window.localStorage.clear()');
    driver.quit();
  });

  test.it("user can see submitted exercise on exercises.html", function() {
    driver.get("http://localhost:8080/exercises.html");

    var name = driver.findElement({id: 'exercise-field'});
    var calories = driver.findElement({id: 'exercise-calorie-field'});
    var submitButton = driver.findElement({id: 'exercise-submit'});

    name.sendKeys('Jump');
    name.getAttribute('value').then(function(value) {
      assert.equal(value, "Jump");
    });

    calories.sendKeys('14');
    calories.getAttribute('value').then(function(value) {
      assert.equal(value, '14');
    });

    submitButton.click();

    driver.findElement({css: 'table td'}).getText().then(function(textValue) {
      assert.include(textValue, 'Jump');
    });

    driver.findElement({css: 'table td:nth-child(2)'}).getText().then(function(textValue) {
      assert.include(textValue, '14');
    });
  });
});

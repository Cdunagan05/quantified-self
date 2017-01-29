var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user deletes a exercise on exercises.html", function(){
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

  test.it("User can delete an exercise from exercises.html", function() {
    driver.get("http://localhost:8080/exercises.html");

    var name = driver.findElement({id: 'exercise-field'});
    var calories = driver.findElement({id: 'exercise-calorie-field'});
    var submitButton = driver.findElement({id: 'exercise-submit'});

    name.sendKeys('Sleep');
    name.getAttribute('value').then(function(value) {
      assert.equal(value, "Sleep");
    });

    calories.sendKeys('2');
    calories.getAttribute('value').then(function(value) {
      assert.equal(value, '2');
    });

    submitButton.click();

    driver.get("http://localhost:8080/exercises.html");

    var deleteThisMess = driver.findElement({css: 'button'});
    
    deleteThisMess.click();
    
    driver.findElement({css: 'table'}).getText().then(function(textValue) {
      assert.notInclude(textValue, "Sleep");
    });
  });
});
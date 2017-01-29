var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user forgets to enter necessary info for exercise", function(){
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
  });

  test.afterEach(function() {
    driver.get('http://localhost:8080/exercise.html');
    driver.executeScript('window.localStorage.clear()');
    driver.quit();
  });

  test.it("user forgets to enter calories", function() {
    driver.get("http://localhost:8080/exercises.html");

    var name = driver.findElement({id: 'exercise-field'});
    var calories = driver.findElement({id: 'exercise-calorie-field'});
    var submitButton = driver.findElement({id: 'exercise-submit'});

    name.sendKeys('Run');
    name.getAttribute('value').then(function(value) {
      assert.equal(value, "Run");
    });

    submitButton.click();

    driver.findElement({id: 'alert-message'}).getText().then(function(textValue) {
      assert.include(textValue, 'Please enter a calorie amount');
    });
    driver.findElement({css: 'table'}).getText().then(function(textValue) {
      assert.notInclude(textValue, 'Run');
    });
  });
  
  test.it("user forgets to enter exercise name", function() {
    driver.get("http://localhost:8080/exercises.html");

    var name = driver.findElement({id: 'exercise-field'});
    var calories = driver.findElement({id: 'exercise-calorie-field'});
    var submitButton = driver.findElement({id: 'exercise-submit'});

    calories.sendKeys('100');
    calories.getAttribute('value').then(function(value) {
      assert.equal(value, "100");
    });

    submitButton.click();

    driver.findElement({id: 'alert-message'}).getText().then(function(textValue) {
      assert.include(textValue, 'Please enter an exercise name');
    });
    driver.findElement({css: 'table'}).getText().then(function(textValue) {
      assert.notInclude(textValue, '100');
    });
  });
});

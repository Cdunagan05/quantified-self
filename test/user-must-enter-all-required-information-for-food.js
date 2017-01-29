var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user forgets to enter necessary info for foods", function(){
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
  });

  test.afterEach(function() {
    driver.get('http://localhost:8080/foods.html');
    driver.executeScript('window.localStorage.clear()');
    driver.quit();
  });

  test.it("user forgets to enter calories", function() {
    driver.get("http://localhost:8080/foods.html");

    var name = driver.findElement({id: 'name-field'});
    var calories = driver.findElement({id: 'calorie-field'});
    var submitButton = driver.findElement({id: 'food-submit'});

    name.sendKeys('Sandwich');
    name.getAttribute('value').then(function(value) {
      assert.equal(value, "Sandwich");
    });

    submitButton.click();
    
    driver.findElement({id: 'alert-message'}).getText().then(function(textValue) {
      assert.include(textValue, 'Please enter a calorie amount');
    });
    driver.findElement({css: 'table'}).getText().then(function(textValue) {
      assert.notInclude(textValue, 'Sandwich');
    });
  });
  
  test.it("user forgets to enter food name", function() {
    driver.get("http://localhost:8080/foods.html");

    var name = driver.findElement({id: 'name-field'});
    var calories = driver.findElement({id: 'calorie-field'});
    var submitButton = driver.findElement({id: 'food-submit'});

    calories.sendKeys('100');
    calories.getAttribute('value').then(function(value) {
      assert.equal(value, "100");
    });

    submitButton.click();

    driver.findElement({id: 'alert-message'}).getText().then(function(textValue) {
      assert.include(textValue, 'Please enter a food name');
    });
    driver.findElement({css: 'table'}).getText().then(function(textValue) {
      assert.notInclude(textValue, '100');
    });
  });
});

var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user sees food on foods.html", function(){
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

  test.it("user can see submitted food on foods.html", function() {
    driver.get("http://localhost:8080/foods.html");

    var name = driver.findElement({id: 'name-field'});
    var calories = driver.findElement({id: 'calorie-field'});
    var submitButton = driver.findElement({id: 'food-submit'});

    name.sendKeys('Chicken');
    name.getAttribute('value').then(function(value) {
      assert.equal(value, "Chicken");
    });

    calories.sendKeys('900');
    calories.getAttribute('value').then(function(value) {
      assert.equal(value, '900');
    });

    submitButton.click();

    driver.findElement({css: 'table td'}).getText().then(function(textValue) {
      assert.include(textValue, 'Chicken');
    });

    driver.findElement({css: 'table td:nth-child(2)'}).getText().then(function(textValue) {
      assert.include(textValue, '900');
    });
  });
});

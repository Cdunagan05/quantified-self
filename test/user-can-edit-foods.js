var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user edits a food on foods.html", function(){
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

  test.it("User can edit a food on foods.html", function() {
    driver.get("http://localhost:8080/foods.html");

    var name = driver.findElement({id: 'name-field'});
    var calories = driver.findElement({id: 'calorie-field'});
    var submitButton = driver.findElement({id: 'food-submit'});

    name.sendKeys('Hat');
    name.getAttribute('value').then(function(value) {
      assert.equal(value, "Hat");
    });

    calories.sendKeys('200');
    calories.getAttribute('value').then(function(value) {
      assert.equal(value, '200');
    });

    submitButton.click();

    driver.get("http://localhost:8080/foods.html");
    
    var edit = driver.findElement(By.name('Hat'));
    
    edit.click();
    
    edit.sendKeys('Cheese');
    
    driver.findElement({css: 'table'}).getText().then(function(textValue) {
      assert.notInclude(textValue, "Hat");
      assert.include(textValue, "Cheese");
    });
  });
});
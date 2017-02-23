var webdriver = require('selenium-webdriver');
var util = require('./util');

var until = webdriver.until;
var By = webdriver.By;
var forExec = util.forExec;

var ops = ['add', 'replace', 'interpolate', 'update', 'delete', 'clear', 'swap'];
var WAIT_TIME = 10000;

function clickById(id, driver) {
	return driver
		.findElement(By.id(id))
		.click()
}

function clickByXpath(xpath, driver) {
	return driver
		.findElement(By.xpath(xpath))
		.click()
}

/**
 * node: class or tagName
 */
function getNodeLength(node, driver) {
	return driver
		.findElements(By.css(node))
		.then(function(elements) {
			return elements.length;
		})
}

function findTextByXpath(xpath, driver) {
	return driver.findElement(By.xpath(xpath)).getText()
}

function testTextContains(xpath, text, driver) {
	driver.wait(new until.Condition(text + 'not contains in ' + xpath, function() {
		return findTextByXpath(xpath, driver).then(function(val) {
			return val.indexOf(text) !== -1
		})
	}), WAIT_TIME)
}

module.exports = [{
	id: '01_add1k',
	label: 'create rows',
	description: "Duration for creating 1000 rows after the page loaded",
	init: function(driver) {
		return driver.wait(until.elementLocated(By.id('add')), WAIT_TIME)
	},
	run: function(driver) {
		return driver
			.findElement(By.id('add'))
			.click()
			.then(function() {
				path = '//ol/li[1000]';
				return driver
					.wait(until.elementLocated(By.xpath(path)), WAIT_TIME)
			});
	}
}, {
	id: '02_replace1k',
	label: 'replace all rows',
	description: 'Duration for updating all 1000 rows of the table',
	init: function(driver) {
		return driver
			.wait(until.elementLocated(By.id('replace')), WAIT_TIME)
			.then(function() {
				return forExec(0, 3, function() {
					return clickById('replace', driver)
				})
			})
	},
	run: function(driver) {
		return clickById('replace', driver)
			.then(function() {
				path = '//ol/li[1000]';
				return driver
					.wait(until.elementLocated(By.xpath(path)), WAIT_TIME)
			})
	}
}, {
	id: '03_delete-first-in-1k',
	label: 'delete one in 1000',
	description: 'Duration to remove the first row in 1000',
	init: function(driver) {
		return driver
			.wait(until.elementLocated(By.id('add')), WAIT_TIME)
			.then(function() {
				return clickById('add', driver)
					.then(function() {
						path = '//ol/li[1000]';
						return driver
							.wait(until.elementLocated(By.xpath(path)), WAIT_TIME)
					})
			})

	},
	run: function(driver) {
		var xpath = '//ol/li[1]/button';
		return clickByXpath(xpath, driver).then(function() {
			return getNodeLength('li', driver).then(function(len) {
				if (len !== 999) {
					new Error('delete error');
				}
			})
		})
	}
}, {
	id: '04_update-10th-in-1k',
	label: 'update 10th in 1000',
	description: 'Duration to update every 10th row in 1000',
	init: function(driver) {
		return driver
			.wait(until.elementLocated(By.id('add')), WAIT_TIME)
			.then(function() {
				return clickById('add', driver)
					.then(function() {
						path = '//ol/li[1000]';
						return driver
							.wait(until.elementLocated(By.xpath(path)), WAIT_TIME)
					})
			}).then(function() {
				driver
					.wait(until.elementLocated(By.id('update')), WAIT_TIME)
			})
	},
	run: function(driver) {
		return clickById('update', driver)
			.then(function() {
				var xpath = '//ol/li[1]/span';
				driver.findElement(By.xpath(xpath)).getText().then(function(text) {
					if (text.slice(-3) === '!!!') {
						// console.log('got it');
					}
				})
			})
	}
}, {
	id: '05_swap-2-row-in-1k',
	label: 'swap row in 1000',
	description: 'Duration to swap 2 rows on a 1K table',
	init: function(driver) {
		return driver
			.wait(until.elementLocated(By.id('add')), WAIT_TIME)
			.then(function() {
				return clickById('add', driver)
					.then(function() {
						path = '//ol/li[1000]';
						return driver
							.wait(until.elementLocated(By.xpath(path)), WAIT_TIME)
					})
			}).then(function() {
				driver
					.wait(until.elementLocated(By.id('swap')), WAIT_TIME)
			})
	},
	run: function(driver) {
		var xpath5 = '//ol/li[5]/span';
		var xpath10 = '//ol/li[10]/span';
		var text = '';
		return findTextByXpath(xpath5, driver)
			.then(function(text5) {
				text = text5;
			}).then(function() {
				return clickById('swap', driver)
			}).then(function() {
				testTextContains(xpath10, text, driver)
			})
	}
}]
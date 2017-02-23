/**
 * @author monkindey
 * @date 2017.02.17
 *
 * promise流式处理数据
 */
var fs = require('fs');

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var jStat = require('jStat').jStat;

var bms = require('./bms').reverse();
var util = require('./util');

var logging = webdriver.logging;
var Builder = webdriver.Builder;
var forExec = util.forExec;

// var service = new chrome.ServiceBuilder(path).build();
// chrome.setDefaultService(service);
// var driver = new webdriver
// 	.Builder()
// 	.withCapabilities(webdriver.Capabilities.chrome())
// 	.build();

var src = 'http://localhost:8888/github.repo/react-travel/src/bench/index.html?';
var repeat = 5;
var scenes = ['', 'key', 'scu', 'key,scu'];

function buildDriver() {
	var logPref = new logging.Preferences();
	var options = new chrome.Options();

	logPref.setLevel(logging.Type.PERFORMANCE, logging.Level.ALL);
	options = options
		.addArguments("--js-flags=--expose-gc")
		.setLoggingPrefs(logPref)
		.setPerfLoggingPrefs({
			enableNetwork: false,
			enablePage: false,
			enableTimeline: false,
			traceCategories: 'browser,devtools.timeline,devtools',
			bufferUsageReportingInterval: 1000
		});

	return new Builder()
		.forBrowser('chrome')
		.setChromeOptions(options)
		.build();
}

function initBenchmark(benchmark, driver) {
	return benchmark
		.init(driver)
		.then(function(btn) {
			return true
		})
}

function runBenchmark(benchmark, driver, i) {
	return benchmark.run(driver).then(function() {
		return readLogs(driver);
	})
}

function reduceLogs(res) {
	return res.reduce(function(acc, val) {
		return acc.concat((val[1].end - val[0].ts) / 1000)
	}, [])
}

function readLogs(driver) {
	return driver.manage()
		.logs()
		.get(logging.Type.PERFORMANCE)
		.then(function(entries) {
			var click, lastPaint;
			entries.forEach(function(entry) {
				var msg = JSON.parse(entry.message).message;
				var name = msg.params.name;
				if (name === 'EventDispatch') {
					if (msg.params.args.data.type === "click") {
						var end = +msg.params.ts + msg.params.dur;
						click = {
							type: 'click',
							ts: +msg.params.ts,
							dur: +msg.params.dur,
							end: end
						};
					}
				} else if (name === 'Paint') {
					if (click && msg.params.ts > click.end) {
						lastPaint = {
							type: 'paint',
							ts: +msg.params.ts,
							dur: +msg.params.dur,
							end: +msg.params.ts + msg.params.dur
						};
					}
				}
			});

			return [click, lastPaint]
		})
}

function makeStatSavedFolder(name) {
	var baseFolder = './stats/';

	if (name) {
		return baseFolder + name + '/';
	} else {
		return baseFolder + 'base/';
	}
}

// generate the path of stats be saved
function makeStatSavedPath(dir, benchmark) {
	return dir + benchmark.id + '.json'
}

function writeStat(res) {
	var benchmark = res.benchmark;
	// match the 'scu, key'
	var which = res.which;
	var name = which.replace(/,\s*/, '_');
	var data = res.data.slice(0)
		.sort(function(a, b) {
			return a - b;
		});

	var stat = jStat(data);

	var stats = {
		which: which,
		benchmark: benchmark.id,
		min: stat.min().toFixed(2),
		max: stat.max().toFixed(2),
		mean: stat.mean().toFixed(2),
		geometricMean: stat.geomean().toFixed(2),
		standardDeviation: stat.stdev().toFixed(2)
	}

	console.log(stats);
	var dir = makeStatSavedFolder(name);

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	fs.writeFileSync(makeStatSavedPath(dir, benchmark), JSON.stringify(stats), 'utf-8')
}

function runBench(which) {
	return forExec(0, bms.length, function(i) {
		var benchmark = bms[i];
		var driver = buildDriver();

		return forExec(0, repeat, function(ii) {
			return driver.get(src + which)
				.then(function() {
					return initBenchmark(benchmark, driver)
				})
				.then(function() {
					return runBenchmark(benchmark, driver, ii);
				})
		}).then(function(res) {
			return reduceLogs(res);
		}).then(function(res) {
			return writeStat({
				which: which,
				benchmark: benchmark,
				data: res
			});
		}).thenFinally(function() {
			driver.quit();
		})
	})
}

forExec(0, scenes.length, function(i) {
	var scene = scenes[i];
	return runBench(scene);
})
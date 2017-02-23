import Perf from 'react-addons-perf'

var startTime;
var monitorName;

export function startMonitor(name) {
	startTime = performance.now();
	monitorName = name;
	Perf.start();
}

export function stopMonitor() {
	var stop = performance.now();
	console.log(`${monitorName} took ${stop - startTime } ms`);
	Perf.stop();
	// Perf.printWasted();
	// Perf.printOperations();
}
function forExec(from, to, fn) {
	var res = [];
	var p = fn(from);
	for (var i = from + 1; i < to; i++) {
		p = p.then((function(i) {
			return function(val) {
				res.push(val);
				return fn(i)
			}
		})(i))
	}
	return p.then(function(val) {
		res.push(val);
		return res;
	})
}

module.exports = {
	forExec: forExec
};


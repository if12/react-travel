var path = require('path');
var express = require('express');
var app = express();

require('babel-register');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactAPP = require('./src/HelloReactSSR').default;

// 服务器配置
var PORT = 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
	var reactHTML = ReactDOMServer.renderToString(React.createElement(ReactAPP));
	res.render('index.ejs', {
		reactOutput: reactHTML
	})
});

app.listen(PORT);
console.log('Server is Up and Running at Port : ' + PORT);
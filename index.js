var express = require('express');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'app'));

app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/angular', express.static(path.join(__dirname, '/app/angular')));

app.get('/', function (req, res) {
    res.render('main');
});

app.listen(app.get('port'), function () {
    console.log('Server running on port', app.get('port'));
});

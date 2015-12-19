/**
 * Created by 40in on 07.10.14.
 */
var express = require('express'),
    app = express(),
    grunt = require('grunt'),
    indexGenerator = require('./template-generator.js'),
    http = require('http'),
    path = require('path');

var config = grunt.file.readJSON('config.json');

var environment = process.env.NODE_ENV || 'dev';
console.log('Enviroment: ' + environment);
if (environment === 'dev') {
    app.use(express.static(path.join(__dirname, '..', 'public')));
} else {
    app.use(express.static(path.join(__dirname, '..', 'dist', 'public')));
}

app.get('/api/cars', function(req, res){
    res.sendFile(__dirname + '/data.json');
});

app.get('/*', function(req, res){
    indexGenerator.index(function(html) {
        res.send(html);
    }, environment, '0');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
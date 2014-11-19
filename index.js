#!/usr/bin/env node

var concat = require('concat-stream'),
    Set = require('collections/set'),
    path = require('path'),
    argv = require('minimist')(process.argv.slice(2)),
    readdirp = require('readdirp');

process.stdin.pipe(concat(function(data) {
    var deps = JSON.parse(data);

    var root = path.resolve(argv._[0] || process.CWD);

    var used = new Set(deps.map(function(dep) {
        return dep.id;
    }).filter(function(dep) {
        return dep.indexOf(root) === 0;
    }));

    readdirp({ root: root }, function(err, res) {
        var projectFiles = new Set(
            res.files.map(function(r) { return r.fullPath; }));

        var unused = projectFiles.difference(used);

        unused.forEach(function(unused) {
            console.log(unused);
        });
    });
}));

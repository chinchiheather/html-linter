#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors");
var linter_1 = require("./src/linter");
var filePaths = ['test.html'];
linter_1.Linter.lint(filePaths)
    .then(function (errors) {
    if (errors.length === 0) {
        console.log(colors.green('All files pass linting'));
    }
    else {
        errors.forEach(function (errorMsg) { return console.log(colors.red(errorMsg)); });
    }
})
    .catch(function (error) {
    console.log(colors.red(error.toString()));
});
//# sourceMappingURL=index.js.map
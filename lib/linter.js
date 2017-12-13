"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var indentation_1 = require("./validators/indentation");
var attributes_1 = require("./validators/attributes");
var Linter = (function () {
    function Linter() {
    }
    Linter.lint = function (config) {
        return new Promise(function (resolve, reject) {
            var errors = [];
            var filePaths = config.files;
            var lintedCount = 0;
            if (filePaths.length === 0) {
                reject('No files to lint');
            }
            else {
                filePaths.forEach(function (filePath) {
                    fs.readFile(filePath, function (error, data) {
                        if (error) {
                            reject(error.toString());
                        }
                        else {
                            var fileString = data.toString();
                            var lines = fileString.split('\n');
                            errors.push.apply(errors, indentation_1.Indentation.validate(filePath, lines));
                            errors.push.apply(errors, attributes_1.Attributes.validate(filePath, lines));
                            if (++lintedCount === filePaths.length) {
                                resolve(errors);
                            }
                        }
                    });
                });
            }
        });
    };
    return Linter;
}());
exports.Linter = Linter;
//# sourceMappingURL=linter.js.map
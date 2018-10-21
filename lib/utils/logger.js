"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var chalk_1 = require("chalk");
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.log = function (message) {
        console.log(message);
    };
    /**
     * Logs the linting errors to the console
     */
    Logger.logResults = function (filePath, validationErrors) {
        var _this = this;
        this.log(chalk_1.default.bold.red("\nERROR in " + path.resolve(filePath)));
        var relativePath = path.relative(process.cwd(), filePath);
        this.log(chalk_1.default.bold.red("\n" + relativePath));
        // find the messages with the longest strings for fields so we can nicely align them
        var findLargestReducer = function (prev, curr) {
            return curr > prev ? curr : prev;
        };
        var longestLineChars = validationErrors
            .map(function (validation) { return (validation.line + ":" + validation.column).length; })
            .reduce(findLargestReducer, 0);
        var longestMsgChars = validationErrors
            .map(function (validation) { return validation.message.length; })
            .reduce(findLargestReducer, 0);
        validationErrors.forEach(function (validation) {
            var lineText = _this.padString(validation.line + ":" + validation.column, longestLineChars);
            var line = chalk_1.default.gray(lineText);
            var errorTxt = _this.padString(validation.message, longestMsgChars);
            var error = chalk_1.default.white(errorTxt);
            _this.log("  " + line + "  " + error);
        });
        this.log('\n');
    };
    ;
    /**
    * If string's length is less than longest, appends spaces until it reaches the
    * same length
    */
    Logger.padString = function (string, longest) {
        if (string.length < longest) {
            Array(longest - string.length)
                .fill(null)
                .forEach(function () { string += ' '; });
        }
        return string;
    };
    ;
    return Logger;
}());
exports.default = Logger;

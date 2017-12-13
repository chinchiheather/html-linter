"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attr_whitespace_1 = require("./attributes/attr-whitespace");
var attr_quotes_1 = require("./attributes/attr-quotes");
var Attributes = (function () {
    function Attributes() {
    }
    Attributes.validate = function (filePath, lines) {
        var errors = [];
        var attrRegex = /(\S+)\s?=\s?["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
        lines.forEach(function (line, idx) {
            var attrMatches = line.match(attrRegex);
            if (attrMatches) {
                attrMatches.forEach(function (attrMatch) {
                    if (!attr_whitespace_1.AttrWhitespace.validate(attrMatch)) {
                        errors.push(filePath + ":" + (idx + 1) + " " + attr_whitespace_1.AttrWhitespace.errorMsg);
                    }
                    if (!attr_quotes_1.AttrQuotes.validate(attrMatch)) {
                        errors.push(filePath + ":" + (idx + 1) + " " + attr_quotes_1.AttrQuotes.errorMsg);
                    }
                });
            }
        });
        return errors;
    };
    return Attributes;
}());
exports.Attributes = Attributes;
//# sourceMappingURL=attributes.js.map
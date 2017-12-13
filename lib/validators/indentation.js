"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Indentation = (function () {
    function Indentation() {
    }
    Indentation.validate = function (filePath, lines, config) {
        var errors = [];
        var whitespaceRegex = config.char === 'space' ? /^ *$/ : /^\t*$/;
        var prevStartIdx = 0;
        lines.forEach(function (line, idx) {
            var startIdx = line.search(/</);
            if (startIdx !== -1) {
                var diff = Math.abs(prevStartIdx - startIdx);
                var whitespaceStr = line.substring(0, startIdx);
                if (diff !== config.number && diff !== 0 || !whitespaceRegex.test(whitespaceStr)) {
                    errors.push(filePath + ":" + (idx + 1) + " File should use " + config.number + " " + config.char + " indentation");
                }
                prevStartIdx = startIdx;
            }
        });
        return errors;
    };
    return Indentation;
}());
exports.Indentation = Indentation;
//# sourceMappingURL=indentation.js.map
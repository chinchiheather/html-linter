"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Indentation = (function () {
    function Indentation() {
    }
    Indentation.validate = function (filePath, lines) {
        var errors = [];
        var indentation = 2;
        var prevStartIdx = 0;
        lines.forEach(function (line, idx) {
            var startIdx = line.search(/</);
            if (startIdx !== -1) {
                var diff = Math.abs(prevStartIdx - startIdx);
                if (diff !== indentation && diff !== 0) {
                    errors.push(filePath + ":" + (idx + 1) + " " + Indentation.errorMsg);
                }
                prevStartIdx = startIdx;
            }
        });
        return errors;
    };
    Indentation.errorMsg = 'File should use 2 space indentation';
    return Indentation;
}());
exports.Indentation = Indentation;
//# sourceMappingURL=indentation.js.map
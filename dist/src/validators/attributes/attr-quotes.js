"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttrQuotes = (function () {
    function AttrQuotes() {
    }
    AttrQuotes.validate = function (attr) {
        var quote = "\"";
        var split = attr.split('=');
        var attrQuote = split[1].replace(/\s/g, '').charAt(0);
        return attrQuote === quote;
    };
    AttrQuotes.errorMsg = 'Attributes should use single quotes';
    return AttrQuotes;
}());
exports.AttrQuotes = AttrQuotes;
//# sourceMappingURL=attr-quotes.js.map
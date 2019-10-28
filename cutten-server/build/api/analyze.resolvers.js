"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAnalyzer_1 = require("../analyzer/BaseAnalyzer");
var resolvers = {
    Query: {
        analyze: function () { return BaseAnalyzer_1.default; }
    },
    Analyze: {
        totalPerDay: function (parent, args) { return parent.Main(args); },
    },
    userPerDay: {
        name: function (parent) { return parent.name; },
        messageCount: function (parent) { return parent.messageCount; },
        kCount: function (parent) { return parent.kCount; }
    }
};
exports.default = resolvers;
//# sourceMappingURL=analyze.resolvers.js.map
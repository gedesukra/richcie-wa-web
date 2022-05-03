"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Config = void 0;
var baseStructure = {
    method: "",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};
var requestConfig = function (argMethod, data) {
    if (argMethod === "POST") {
        return __assign(__assign({}, baseStructure), { method: argMethod, body: JSON.stringify(__assign({}, data)) });
    }
    return __assign(__assign({}, baseStructure), { method: argMethod });
};
exports.Config = requestConfig;

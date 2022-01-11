"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global methods
var index_1 = require("../global/index");
var arrayCategory = {
    last: function () {
        if (index_1.default.checkList(this.target)) {
            var arr = this.target;
            return arr[arr.length - 1];
        }
    },
    center: function () {
        if (index_1.default.checkList(this.target)) {
            var arr = this.target;
            return arr[Math.floor((arr.length - 1) / 2)];
        }
    },
    isArray: function (item, callback) {
        var validArray = Array.isArray(item);
        if (validArray) {
            if (callback instanceof Function) {
                return callback();
            }
            return true;
        }
        ;
        return false;
    }
};
for (var i in arrayCategory) {
    // Exports every separately method
    exports[i] = arrayCategory[i];
}
// Exports all methods
exports.default = arrayCategory;

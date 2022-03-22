"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Global methods
var index_1 = require("../global/index");
var arrayCategory = {
    isEmpty: index_1.default.isEmpty,
    last: function () {
        if (index_1.default.checkList(this.target)) {
            var arr = this.target;
            var lastItem = arr[arr.length - 1];
            this.target = lastItem;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
        }
    },
    find: function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Array.isArray(this.target)) {
            this.target = (_a = this.target).find.apply(_a, args);
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
        }
    },
    slice: function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Array.isArray(this.target)) {
            this.target = (_a = this.target).slice.apply(_a, args);
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
        }
    },
    splice: function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Array.isArray(this.target)) {
            this.target = (_a = this.target).splice.apply(_a, args);
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
        }
    },
    groupBy: function (callback, cat) {
        if (Array.isArray(this.target)) {
            if (callback instanceof Function) {
                var groups = this.target.reduce(function (acc, item, index, array) {
                    var res = callback(item, index, array);
                    if (res) {
                        if (res in acc) {
                            acc[res].push(item);
                        }
                        else {
                            acc[res] = [];
                            acc[res].push(item);
                        }
                    }
                    else {
                        if (cat) {
                            if (typeof cat === "string" && cat.length) {
                                acc[cat] = [];
                                acc[cat].push(item);
                            }
                            else {
                                index_1.default.setError("\"".concat(cat, "\" must be string"));
                            }
                        }
                    }
                    return acc;
                }, {});
                this.target = groups;
                return this;
            }
            else {
                index_1.default.setError("\"".concat(callback, "\" is not a function"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
        }
    },
    removeItem: function (num, val) {
        if (Array.isArray(this.target)) {
            val || typeof val === "number" && val >= 0 ? this.target.splice(num, 1, val) : this.target.splice(num, 1);
            return this.target;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a array"));
        }
    },
    center: function () {
        if (index_1.default.checkList(this.target)) {
            var arr = this.target;
            var centerItem = arr[Math.floor((arr.length - 1) / 2)];
            this.target = centerItem;
            return this;
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a list"));
        }
    },
    unfold: function () {
        var res = [];
        if (Array.isArray(this.target) && this.target.length) {
            var unfoldArray_1 = function (array) {
                array.map(function (item) {
                    if (Array.isArray(item)) {
                        return unfoldArray_1(item);
                    }
                    else {
                        res.push(item);
                    }
                });
            };
            unfoldArray_1(this.target);
        }
        this.target = res;
        return this;
    },
    each: function (callback) {
        if (index_1.default.checkList(this.target) && callback instanceof Function) {
            return Array.from(this.target).map(callback);
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not a list or your callback is not a function"));
        }
    },
    hasItem: function (item) {
        if (Array.isArray(this.target)) {
            return Boolean(this.target.find(function (el) { return index_1.default.compare(el, item); }));
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" is not an array"));
        }
    },
    index: function (num) {
        !num && typeof num !== "number" && index_1.default.setError("Invalid value num: \"".concat(num, "\""));
        if (index_1.default.checkList(this.target) || typeof this.target == "string") {
            var el = this.target[num];
            if (num < 0)
                el = this.target[(this.target.length - 1) + num];
            this.target = el;
            return this;
        }
        index_1.default.setError("\"".concat(this.target, "\" must be a array, string, HTMLCollection or NodeList"));
    },
    filter: function (callback, thisArg) {
        if (Array.isArray(this.target)) {
            if (callback instanceof Function) {
                this.target = thisArg ? this.target.filter(callback, thisArg) : this.target.filter(callback);
                return this;
            }
            else {
                index_1.default.setError("\"".concat(callback, "\" must be a function"));
            }
        }
        else {
            index_1.default.setError("\"".concat(this.target, "\" must be a array"));
        }
    },
    indexOf: index_1.default.indexOf,
    addItem: function (item, position) {
        if (Array.isArray(this.target)) {
            this.target[!position ? "push" : "unshift"](item);
            return this;
        }
        else {
            index_1.default.setError("".concat(this.target, " must be array"));
        }
    },
    sort: function (fromMore) {
        if (Array.isArray(this.target)) {
            if (this.target.every(function (num) { return typeof num === "number"; })) {
                var quickSort_1 = function (arr) {
                    if (arr.length < 2) {
                        return arr;
                    }
                    var lastNum = arr[arr.length - 1];
                    var less = [];
                    var more = [];
                    for (var i = 0; i < arr.length - 1; i++) {
                        arr[i] > lastNum ? more.push(arr[i]) : less.push(arr[i]);
                    }
                    return quickSort_1(fromMore ? more : less).concat(lastNum, quickSort_1(fromMore ? less : more));
                };
                this.target = quickSort_1(this.target);
                return this;
            }
            else {
                index_1.default.setError("The content of the array must be of type number");
            }
        }
        else {
            index_1.default.setError("".concat(this.target, " must be array"));
        }
    },
    uniques: function () {
        if (Array.isArray(this.target)) {
            this.target = Array.from(new Set(this.target));
            var checkOtherTypes_1 = function (arr) {
                for (var i = 0; i < arr.length - 1; i++) {
                    var _loop_1 = function (j) {
                        if (index_1.default.compare(arr[i], arr[j])) {
                            return { value: checkOtherTypes_1(arr.filter(function (item, index) { return index !== j; })) };
                        }
                    };
                    for (var j = i + 1; j < arr.length; j++) {
                        var state_1 = _loop_1(j);
                        if (typeof state_1 === "object")
                            return state_1.value;
                    }
                }
                return arr;
            };
            this.target = checkOtherTypes_1(this.target);
            return this;
        }
        else {
            index_1.default.setError("".concat(this.target, " must be array"));
        }
    },
    merge: index_1.default.merge
};
for (var i in arrayCategory) {
    // Exports every separately method
    exports[i] = arrayCategory[i];
}
// Exports all methods
exports.default = arrayCategory;

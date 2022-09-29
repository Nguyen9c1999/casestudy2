"use strict";
exports.__esModule = true;
exports.ManagerAccount = void 0;
var ManagerAccount = /** @class */ (function () {
    function ManagerAccount() {
        this.listAccount = [];
    }
    ManagerAccount.prototype.add = function (t) {
        this.listAccount.push(t);
    };
    ManagerAccount.prototype["delete"] = function (name) {
    };
    ManagerAccount.prototype.edit = function (name, newName) {
    };
    ManagerAccount.prototype.findByName = function (name) {
    };
    ManagerAccount.prototype.findByName1 = function (name, passWord) {
        return this.listAccount[this.findByIndex(name, passWord)];
    };
    ManagerAccount.prototype.findByIndex = function (name, passWord) {
        for (var i = 0; i < this.listAccount.length; i++) {
            if (this.listAccount[i].userName == name && this.listAccount[i].passWord == passWord) {
                return i;
            }
        }
        return -1;
    };
    return ManagerAccount;
}());
exports.ManagerAccount = ManagerAccount;

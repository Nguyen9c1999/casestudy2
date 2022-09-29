"use strict";
exports.__esModule = true;
exports.ManagerAlbum = void 0;
var ManagerAlbum = /** @class */ (function () {
    function ManagerAlbum(name, user) {
        this.listAlbum = [];
        this._name = name;
        this._user = user;
    }
    Object.defineProperty(ManagerAlbum.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ManagerAlbum.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            this._user = value;
        },
        enumerable: false,
        configurable: true
    });
    ManagerAlbum.prototype.add = function (t) {
        this.listAlbum.push(t);
    };
    ManagerAlbum.prototype["delete"] = function (name) {
        var index = this.findByIndex(name);
        this.listAlbum.splice(index, 1);
    };
    ManagerAlbum.prototype.edit = function (name, newName) {
        var index = this.findByIndex(name);
        this.listAlbum[index].nameAlbum = name;
    };
    ManagerAlbum.prototype.findByName = function (name) {
        var index = this.findByIndex(name);
        return this.listAlbum[index];
    };
    ManagerAlbum.prototype.findByIndex = function (name) {
        for (var i = 0; i < this.listAlbum.length; i++) {
            if (this.listAlbum[i].nameAlbum == name) {
                return i;
            }
        }
        return -1;
    };
    return ManagerAlbum;
}());
exports.ManagerAlbum = ManagerAlbum;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerSong = void 0;
var ManagerSong = /** @class */ (function () {
    function ManagerSong() {
        this.listSong = [];
    }
    ManagerSong.prototype.add = function (t) {
        this.listSong.push(t);
    };
    ManagerSong.prototype.delete = function (name) {
        var index = this.findByIndex(name);
        this.listSong.splice(index, 1);
    };
    ManagerSong.prototype.edit = function (name, newName) {
        var index = this.findByIndex(name);
        this.listSong[index].editName(newName);
    };
    ManagerSong.prototype.findByName = function (name) {
        var index = this.findByIndex(name);
        return this.listSong[index];
    };
    ManagerSong.prototype.findByIndex = function (name) {
        for (var i = 0; i < this.listSong.length; i++) {
            if (this.listSong[i].nameSong == name) {
                return i;
            }
        }
        return -1;
    };
    return ManagerSong;
}());
exports.ManagerSong = ManagerSong;
//# sourceMappingURL=managerSong.js.map
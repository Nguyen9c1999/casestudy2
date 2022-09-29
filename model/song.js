"use strict";
exports.__esModule = true;
exports.Song = void 0;
var Song = /** @class */ (function () {
    function Song(nameSong, nameSinger) {
        this.nameSong = nameSong;
        this.nameSinger = nameSinger;
    }
    Song.prototype.editName = function (name) {
        this.nameSong = name;
    };
    return Song;
}());
exports.Song = Song;

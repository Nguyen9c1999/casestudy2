"use strict";
exports.__esModule = true;
exports.Album = void 0;
var Album = /** @class */ (function () {
    function Album(nameAlbum) {
        this.soLuongSong = 0;
        this.listSong = [];
        this.nameAlbum = nameAlbum;
    }
    Album.prototype.add = function (song) {
        this.listSong.push(song);
        this.soLuongSong++;
    };
    Album.prototype.showSong = function () {
        for (var i = 0; i < this.listSong.length; i++) {
        }
    };
    Album.prototype.deleteSong = function (index) {
        this.listSong.splice(index, 1);
        this.soLuongSong = this.soLuongSong - 1;
    };
    return Album;
}());
exports.Album = Album;

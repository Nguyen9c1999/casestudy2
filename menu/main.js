"use strict";
exports.__esModule = true;
var account_1 = require("../model/account");
var managerAccount_1 = require("../service/managerAccount");
var album_1 = require("../model/album");
var managerAlbum_1 = require("../service/managerAlbum");
var song_1 = require("../model/song");
var input = require('readline-sync');
var managerAccount = new managerAccount_1.ManagerAccount();
var user = null;
var array = [];
var userCheck = null;
function main() {
    var menu = "-----Menu-----\n1.\u0110\u0103ng nh\u1EADp\n2.\u0110\u0103ng k\u00ED\n0.Thoat";
    var choice;
    do {
        console.log(menu);
        choice = +input.question('Nhap lua chon cua ban: ');
        switch (choice) {
            case 1:
                dangNhap();
                break;
            case 2:
                dangKi();
                break;
            case 0:
                break;
            default:
                console.log(' lựa chọn không hợp lệ , zui lòng nhập lại ');
        }
    } while (choice != 0);
}
function dangKi() {
    var flag = false;
    do {
        var userName = input.question('nhap ten tai khoan ');
        var nameRegex = /^[0-9a-zA-Z\-]+$/;
        var test_1 = nameRegex.test(userName);
        for (var i = 0; i < managerAccount.listAccount.length; i++) {
            if (managerAccount.listAccount[i].userName == userName) {
                test_1 = false;
                console.log('tài khoản đã tồn tại');
            }
        }
        var userNameDone = void 0;
        var passWordDone = void 0;
        if (test_1 == false) {
            console.log('vui long nhap lai ten tai khoan ');
        }
        else {
            userNameDone = userName;
            var flag2 = false;
            do {
                var passWord = input.question('mat khau can co: \n.co tu 8 ki tu\n.co chu thuong,chu hoa, so\nNhap mk:  ');
                nameRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
                test_1 = nameRegex.test(passWord);
                if (test_1 == false) {
                    console.log('vui long dk lai mk ');
                }
                else {
                    passWordDone = passWord;
                    var account = new account_1.Account(userNameDone, passWordDone);
                    managerAccount.add(account);
                    flag = true;
                    flag2 = true;
                    console.log('đăng kí thành công');
                    user = managerAccount.findByName1(userName, passWord);
                    var managerAlbum = new managerAlbum_1.ManagerAlbum('linh', user);
                    array.push(managerAlbum);
                }
            } while (flag2 == false);
        }
    } while (flag == false);
}
main();
function dangNhap() {
    var userName = input.question('nhap tai khoan: ');
    var passWord = input.question('nhap mat khau: ');
    if (managerAccount.findByIndex(userName, passWord) == -1) {
        console.log('dang nhap that bai , vui long dang nhap lai');
    }
    else {
        console.log('dang nhap thanh cong');
        userCheck = managerAccount.findByName1(userName, passWord);
        menuDangNhap();
    }
}
function menuDangNhap() {
    var managerAlbum2;
    for (var i = 0; i < array.length; i++) {
        if (array[i].user == userCheck) {
            managerAlbum2 = array[i];
        }
    }
    var menu = "-----Menu \u0110\u0103ng Nh\u1EADp -----\n1.T\u1EA1o album\n2.Danh s\u00E1ch album\n3.T\u00ECm ki\u1EBFm album\n0.\u0110\u0103ng xu\u1EA5t";
    var choice;
    // let managerAlbum: ManagerAlbum = new ManagerAlbum('linh', user);
    do {
        console.log(menu);
        choice = +input.question('Nhap lua chon cua ban: ');
        switch (choice) {
            case 1:
                creatAlbum(managerAlbum2);
                break;
            case 2:
                showDSAlbum(managerAlbum2);
                break;
            case 3:
                findAlbum(managerAlbum2);
                break;
            case 0:
                break;
            default:
                console.log(' lựa chọn không hợp lệ , zui lòng nhập lại ');
        }
    } while (choice != 0);
}
function creatAlbum(managerAlbum) {
    var nameAlbum = input.question('nhap ten Album: ');
    // let nameRegex = /^[a-zA-Z0-9_]*$/;
    // let test = nameRegex.test(nameAlbum)
    var test = true;
    if (nameAlbum.length == 0) {
        test = false;
        console.log('bạn không được để trống tên');
    }
    for (var i = 0; i < managerAlbum.listAlbum.length; i++) {
        if (managerAlbum.listAlbum[i].nameAlbum == nameAlbum) {
            test = false;
            console.log('tên đã đc sử dụng');
        }
    }
    if (test == true) {
        var album = new album_1.Album(nameAlbum);
        // let managerAlbum: ManagerAlbum = new ManagerAlbum('linh', user);
        managerAlbum.add(album);
        console.log('thêm Album thành công');
    }
    else {
        console.log('thêm album thất bại');
    }
}
function showDSAlbum(managerAlbum2) {
    if (managerAlbum2.listAlbum.length == 0) {
        console.log('hiện chưa có album nào');
    }
    else {
        console.log("-------------------\nDanh S\u00E1ch Album l\u00E0 :\n");
        for (var i = 0; i < managerAlbum2.listAlbum.length; i++) {
            console.log("stt: ".concat(i + 1, " t\u00EAn: ").concat(managerAlbum2.listAlbum[i].nameAlbum));
        }
        console.log('-------------------------------------------------');
        console.log("1.thao t\u00E1c v\u1EDBi album\n0.Tho\u00E1t");
        console.log('--------------------------------------------------');
        var choice1 = +input.question('lua chon cua ban: ');
        if (choice1 == 1) {
            for (var i = 0; i < managerAlbum2.listAlbum.length; i++) {
                console.log("stt: ".concat(i + 1, " t\u00EAn: ").concat(managerAlbum2.listAlbum[i].nameAlbum));
            }
            var choiceStt = +input.question('nhap stt Album ban muon chon :');
            if (choiceStt > managerAlbum2.listAlbum.length || choiceStt < 1) {
                console.log('Stt bạn nhập không hợp lệ');
            }
            else {
                var menu = "----------\n1.S\u1EEDa t\u00EAn album\n2.X\u00F3a album\n3.Th\u00EAm b\u00E0i h\u00E1t v\u00E0o album\n4.hi\u1EC3n th\u1ECB ds b\u00E0i h\u00E1t\n5.t\u00ECm ki\u1EBFm b\u00E0i h\u00E1t theo t\u00EAn \n0.Thoat";
                var choice = void 0;
                do {
                    console.log(menu);
                    choice = +input.question('Nhap lua chon cua ban: ');
                    switch (choice) {
                        case 1:
                            editAlbum(managerAlbum2, choiceStt);
                            break;
                        case 2:
                            deleteAlbum(managerAlbum2, choiceStt);
                            choice = 0;
                            break;
                        case 3:
                            // addSong(managerAlbum2, choiceStt)
                            creatSong(managerAlbum2, choiceStt);
                            break;
                        case 4:
                            showSong(managerAlbum2, choiceStt);
                            break;
                        case 5:
                            findSong(managerAlbum2, choiceStt);
                            break;
                        case 0:
                            break;
                        default:
                            console.log(' lựa chọn không hợp lệ , zui lòng nhập lại ');
                    }
                } while (choice != 0);
            }
        }
        else {
        }
    }
}
function deleteAlbum(managerAlbum2, choiceSTT) {
    var choice;
    choice = +input.question('ban chac chan muon xoa khong\n1.Yes\n2.No\n');
    switch (choice) {
        case 1:
            managerAlbum2.listAlbum.splice(choiceSTT - 1, 1);
            if (managerAlbum2.listAlbum.length == 0) {
                console.log('hiện chưa có album nào sau khi xóa');
            }
            else {
                for (var i = 0; i < managerAlbum2.listAlbum.length; i++) {
                    console.log("stt: ".concat(i + 1, " t\u00EAn: ").concat(managerAlbum2.listAlbum[i].nameAlbum));
                }
            }
            break;
        case 2:
            break;
        default:
            console.log('bạn nhập không hợp lệ');
    }
}
function editAlbum(managerAlbum2, choiceSTT) {
    var newNameAlbum = input.question('nhap ten Album: ');
    // let nameRegex = /^[a-zA-Z0-9_]]+/;
    // let test = nameRegex.test(newNameAlbum)
    var test = true;
    if (newNameAlbum.length == 0) {
        test = false;
        console.log('bạn cần điền tên ');
    }
    if (managerAlbum2.listAlbum[choiceSTT - 1].nameAlbum == newNameAlbum) {
        test = false;
        console.log('bạn cần điền tên mới');
    }
    if (test == true) {
        managerAlbum2.listAlbum[choiceSTT - 1].nameAlbum = newNameAlbum;
        console.log('sửa tên Album thành công');
    }
    else {
        console.log('sửa tên album thất bại');
    }
}
function addSong(managerAlbum2, choiceStt) {
    // managerAlbum2.listAlbum[choiceStt - 1].add(creatSong(managerAlbum2, choiceStt))
}
function creatSong(managerAlbum2, choiceStt) {
    var nameSong = input.question('nhap ten bai hat: ');
    var nameSinger = input.question('nhap ten ca si: ');
    var test = true;
    if (nameSong.length == 0 || nameSinger.length == 0) {
        test = false;
        console.log('không được để trống');
    }
    for (var i = 0; i < managerAlbum2.listAlbum[choiceStt - 1].listSong.length; i++) {
        if (managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSong === nameSong && managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSinger === nameSinger) {
            console.log('bài hát đã tồn tại');
            test = false;
        }
    }
    if (test == true) {
        var song = new song_1.Song(nameSong, nameSinger);
        console.log('thêm bài hát thành công');
        managerAlbum2.listAlbum[choiceStt - 1].add(song);
        // return song
    }
    else {
        console.log('thêm bài hát thất bại');
    }
    // } else {
    //     for (let i = 0; i < managerAlbum2.listAlbum[choiceStt - 1].listSong.length; i++) {
    //             if (managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSong === nameSong && managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSinger === nameSinger) {
    //                 console.log('bài hát đã tồn tại')
    //                 break;
    //             }
    //     let song: Song = new Song(nameSong, nameSinger)
    //         console.log('thêm bài hát thành công')
    //         return song
    // }
    //     console.log("them that bai!!!!")
    // if (nameSong.length == 0 || nameSinger.length == 0) {
    //     test = false
    //     console.log('không được để trống')
    // }
    // for (let i = 0; i < managerAlbum2.listAlbum[choiceStt - 1].listSong.length; i++) {
    //     if (managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSong === nameSong && managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSinger === nameSinger) {
    //         test = false
    //         // console.log('bài hát đã tồn tại')
    //         break;
    //     }
    // }
    // if (test == true) {
    //     let song: Song = new Song(nameSong, nameSinger)
    //     console.log('thêm bài hát thành công')
    //     return song
    //
    // } else {
    //
    //     console.log('thêm bài hát thất bại')
}
function showSong(managerAlbum2, choiceStt) {
    if (managerAlbum2.listAlbum[choiceStt - 1].listSong.length == 0) {
        console.log('hiện chưa có bài hát nào');
    }
    else {
        for (var i = 0; i < managerAlbum2.listAlbum[choiceStt - 1].listSong.length; i++) {
            console.log("".concat(i + 1, ". ").concat(managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSong));
        }
        var choice = void 0;
        do {
            console.log('------------------------------------------');
            console.log("1.thao t\u00E1c v\u1EDBi b\u00E0i h\u00E1t\n0.tho\u00E1t.");
            console.log('-------------------------------------------');
            choice = +input.question('nhap lua chon cua ban');
            switch (choice) {
                case 1:
                    menuSuaXoaSong(managerAlbum2, choiceStt);
                    break;
                case 2:
                    break;
                default:
                    console.log('nhap khong hop le');
            }
        } while (choice != 0);
    }
}
function findSong(managerAlbum2, choiceStt) {
    var name = input.question('nhap ten bai hat muon tim kiem: ');
    var name2 = new RegExp(name);
    if (name.length == 0) {
        console.log('bạn chưa nhập từ khóa');
    }
    else {
        var flag = 0;
        for (var i = 0; i < managerAlbum2.listAlbum[choiceStt - 1].listSong.length; i++) {
            var test_2 = name.test(managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSong);
            if (test_2 == true) {
                flag++;
                console.log("".concat(flag, ". t\u00EAn b\u00E0i h\u00E1t: ").concat(managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSong, " t\u00EAn t\u00E1c gi\u1EA3: ").concat(managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSinger));
            }
        }
        if (flag == 0) {
            console.log('ko co du lieu bai hat');
        }
    }
}
function menuSuaXoaSong(managerAlbum2, choiceSttAlbum) {
    for (var i = 0; i < managerAlbum2.listAlbum[choiceSttAlbum - 1].listSong.length; i++) {
        console.log("".concat(i + 1, ". ").concat(managerAlbum2.listAlbum[choiceSttAlbum - 1].listSong[i].nameSong));
    }
    console.log('nhập stt bài hát cần sửa: ');
    var choiceSTTSong = +input.question();
    if (choiceSTTSong > managerAlbum2.listAlbum.length || choiceSTTSong < 1) {
        console.log('Stt bạn nhập không hợp lệ');
    }
    else {
        var menu = "-----Menu thao t\u00E1c b\u00E0i h\u00E1t-----\n1.xoa bai hat\n2.S\u1EEDa b\u00E0i h\u00E1t\n0.Thoat";
        var choice = void 0;
        do {
            console.log(menu);
            choice = +input.question('Nhap lua chon cua ban: ');
            switch (choice) {
                case 1:
                    deleteSong(choiceSTTSong, choiceSttAlbum, managerAlbum2);
                    break;
                case 2:
                    editSong(choiceSTTSong, choiceSttAlbum, managerAlbum2);
                    break;
                default:
                    console.log('lua chon cua ban ko hop le');
                    break;
            }
        } while (choice != 0);
    }
}
function editSong(choiceSttSong, choiceSTT, managerAlbum2) {
    var newNameSong = input.question('nhap ten moi');
    var nameRegex = /^[a-zA-Z0-9_]*$/;
    var test = nameRegex.test(newNameSong);
    if (newNameSong.length == 0) {
        test = false;
    }
    if (managerAlbum2.listAlbum[choiceSTT - 1].listSong[choiceSttSong - 1].nameSong == newNameSong) {
        test = false;
    }
    if (test == false) {
        console.log('vui long nhap lai ten bai hat ');
        console.log('sua ten that bai');
    }
    else {
        managerAlbum2.listAlbum[choiceSTT - 1].listSong[choiceSttSong - 1].editName(newNameSong);
        console.log('sửa tên thành công');
    }
}
function deleteSong(choiceSttSong, choiceSTT, managerAlbum2) {
    console.log('bạn có chắc chắn muốn xóa\n1.yes\n2.no');
    var choice = +input.question('lua chon cua ban: ');
    if (choice == 1) {
        managerAlbum2.listAlbum[choiceSTT - 1].deleteSong(choiceSttSong - 1);
        console.log('đã xóa thành công');
    }
    else if (choice == 2) {
    }
    else {
        console.log('nhập ko hợp lệ');
    }
}
function findAlbum(managerAlbum2) {
    var name = input.question('nhap ten album ban muon tim: ');
    var name2 = new RegExp(name);
    if (name.length == 0) {
        console.log('bạn chưa nhập từ khóa');
    }
    else {
        var flag = 0;
        for (var i = 0; i < managerAlbum2.listAlbum.length; i++) {
            var a = name2.test(managerAlbum2.listAlbum[i].nameAlbum);
            if (a == true) {
                flag++;
                console.log("".concat(flag, ". t\u00EAn Album: ").concat(managerAlbum2.listAlbum[i].nameAlbum, "-s\u1ED1 l\u01B0\u1EE3ng b\u00E0i h\u00E1t : ").concat(managerAlbum2.listAlbum[i].soLuongSong));
            }
        }
        if (flag == 0) {
            console.log('ko co du lieu album');
        }
    }
}

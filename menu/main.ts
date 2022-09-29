import {Account} from "../model/account";
import {ManagerAccount} from "../service/managerAccount";
import {Album} from "../model/album";
import {ManagerAlbum} from "../service/managerAlbum";
import {Song} from "../model/song";
import test from "node:test";


let input = require('readline-sync');
let managerAccount = new ManagerAccount()

let user: Account = null;
let array: ManagerAlbum[] = []
let userCheck: Account = null;

function main() {
    let menu = `-----Menu-----\n1.Đăng nhập\n2.Đăng kí\n0.Thoat`
    let choice;

    do {
        console.log(menu);
        choice = +input.question('Nhap lua chon cua ban: ');
        switch (choice) {
            case 1:
                dangNhap()
                break;
            case 2:
                dangKi()
                break;
            case 0 :
                break;
            default:
                console.log(' lựa chọn không hợp lệ , zui lòng nhập lại ')

        }
    } while (choice != 0)

}

function dangKi() {
    let flag: boolean = false
    do {

        let userName = input.question('nhap ten tai khoan ')
        let nameRegex = /^[0-9a-zA-Z\-]+$/;
        let test = nameRegex.test(userName)
        for (let i = 0; i < managerAccount.listAccount.length; i++) {
            if (managerAccount.listAccount[i].userName == userName) {
                test = false
                console.log('tài khoản đã tồn tại')
            }
        }
        let userNameDone: string
        let passWordDone: string
        if (test == false) {
            console.log('vui long nhap lai ten tai khoan ')
        } else {
            userNameDone = userName
            let flag2: boolean = false
            do {
                let passWord = input.question('mat khau can co: \n.co tu 8 ki tu\n.co chu thuong,chu hoa, so\nNhap mk:  ')
                nameRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
                test = nameRegex.test(passWord)

                if (test == false) {
                    console.log('vui long dk lai mk ')
                } else {
                    passWordDone = passWord
                    let account = new Account(userNameDone, passWordDone)
                    managerAccount.add(account)
                    flag = true
                    flag2 = true
                    console.log('đăng kí thành công')
                    user = managerAccount.findByName1(userName, passWord);
                    let managerAlbum: ManagerAlbum = new ManagerAlbum('linh', user);
                    array.push(managerAlbum)

                }
            } while (flag2 == false)

        }
    } while (flag == false)
}

main()

function dangNhap() {
    let userName = input.question('nhap tai khoan: ')
    let passWord = input.question('nhap mat khau: ')
    if (managerAccount.findByIndex(userName, passWord) == -1) {
        console.log('dang nhap that bai , vui long dang nhap lai')
    } else {
        console.log('dang nhap thanh cong');
        userCheck = managerAccount.findByName1(userName, passWord);

        menuDangNhap()
    }
}

function menuDangNhap() {
    let managerAlbum2
    for (let i = 0; i < array.length; i++) {
        if (array[i].user == userCheck) {
            managerAlbum2 = array[i]

        }
    }
    let menu = `-----Menu Đăng Nhập -----\n1.Tạo album\n2.Danh sách album\n3.Tìm kiếm album\n0.Đăng xuất`
    let choice;
    // let managerAlbum: ManagerAlbum = new ManagerAlbum('linh', user);
    do {
        console.log(menu);
        choice = +input.question('Nhap lua chon cua ban: ');

        switch (choice) {
            case 1:
                creatAlbum(managerAlbum2)
                break;
            case 2:
                showDSAlbum(managerAlbum2)

                break;
            case 3:
                findAlbum(managerAlbum2)
                break;
            case 0:
                break
            default:
                console.log(' lựa chọn không hợp lệ , zui lòng nhập lại ')

        }
    } while (choice != 0)


}

function creatAlbum(managerAlbum: ManagerAlbum) {

    let nameAlbum = input.question('nhap ten Album: ')
    // let nameRegex = /^[a-zA-Z0-9_]*$/;
    // let test = nameRegex.test(nameAlbum)
    let test = true
    if (nameAlbum.length == 0) {
        test = false
        console.log('bạn không được để trống tên')
    }
    for (let i = 0; i < managerAlbum.listAlbum.length; i++) {
        if (managerAlbum.listAlbum[i].nameAlbum == nameAlbum) {
            test = false
            console.log('tên đã đc sử dụng')
        }
    }
    if (test == true) {
        let album = new Album(nameAlbum);
        // let managerAlbum: ManagerAlbum = new ManagerAlbum('linh', user);
        managerAlbum.add(album)
        console.log('thêm Album thành công')
    } else {

        console.log('thêm album thất bại')
    }

}

function showDSAlbum(managerAlbum2: ManagerAlbum) {
    if (managerAlbum2.listAlbum.length == 0) {
        console.log('hiện chưa có album nào')
    } else {
        console.log(`-------------------\nDanh Sách Album là :\n`)
        for (let i = 0; i < managerAlbum2.listAlbum.length; i++) {
            console.log(`stt: ${i + 1} tên: ${managerAlbum2.listAlbum[i].nameAlbum}`)
        }
        console.log('-------------------------------------------------')
        console.log(`1.thao tác với album\n0.Thoát`)
        console.log('--------------------------------------------------')
        let choice1 = +input.question('lua chon cua ban: ')
        if (choice1 == 1) {
            for (let i = 0; i < managerAlbum2.listAlbum.length; i++) {
                console.log(`stt: ${i + 1} tên: ${managerAlbum2.listAlbum[i].nameAlbum}`)
            }
            let choiceStt = +input.question('nhap stt Album ban muon chon :')


            if (choiceStt > managerAlbum2.listAlbum.length || choiceStt < 1) {
                console.log('Stt bạn nhập không hợp lệ')

            } else {
                let menu = `----------\n1.Sửa tên album\n2.Xóa album\n3.Thêm bài hát vào album\n4.hiển thị ds bài hát\n5.tìm kiếm bài hát theo tên \n0.Thoat`
                let choice;

                do {
                    console.log(menu);
                    choice = +input.question('Nhap lua chon cua ban: ');
                    switch (choice) {
                        case 1:
                            editAlbum(managerAlbum2, choiceStt)
                            break;
                        case 2:
                            deleteAlbum(managerAlbum2, choiceStt)
                            choice = 0

                            break;
                        case 3:
                            // addSong(managerAlbum2, choiceStt)
                             creatSong(managerAlbum2,choiceStt)
                            break;
                        case 4:
                            showSong(managerAlbum2, choiceStt)

                            break;
                        case 5:
                            findSong(managerAlbum2, choiceStt)

                            break;

                        case 0 :
                            break;
                        default:
                            console.log(' lựa chọn không hợp lệ , zui lòng nhập lại ')

                    }
                } while (choice != 0)
            }

        } else {
        }

    }
}

function deleteAlbum(managerAlbum2, choiceSTT) {

    let choice


    choice = +input.question('ban chac chan muon xoa khong\n1.Yes\n2.No\n')

    switch (choice) {
        case 1:
            managerAlbum2.listAlbum.splice(choiceSTT - 1, 1)

            if (managerAlbum2.listAlbum.length == 0) {
                console.log('hiện chưa có album nào sau khi xóa')
            } else {
                for (let i = 0; i < managerAlbum2.listAlbum.length; i++) {
                    console.log(`stt: ${i + 1} tên: ${managerAlbum2.listAlbum[i].nameAlbum}`)
                }
            }
            break;
        case 2:
            break;
        default:
            console.log('bạn nhập không hợp lệ')

    }


}

function editAlbum(managerAlbum2: ManagerAlbum, choiceSTT) {
    let newNameAlbum = input.question('nhap ten Album: ')
    // let nameRegex = /^[a-zA-Z0-9_]]+/;
    // let test = nameRegex.test(newNameAlbum)
    let test: boolean = true
    if (newNameAlbum.length == 0) {
        test = false
        console.log('bạn cần điền tên ')
    }
    if (managerAlbum2.listAlbum[choiceSTT - 1].nameAlbum == newNameAlbum) {
        test = false
        console.log('bạn cần điền tên mới')
    }

    if (test == true) {
        managerAlbum2.listAlbum[choiceSTT - 1].nameAlbum = newNameAlbum
        console.log('sửa tên Album thành công')
    } else {

        console.log('sửa tên album thất bại')
    }

}

function addSong(managerAlbum2: ManagerAlbum, choiceStt) {
    // managerAlbum2.listAlbum[choiceStt - 1].add(creatSong(managerAlbum2, choiceStt))

}



function creatSong(managerAlbum2: ManagerAlbum, choiceStt) {
    let nameSong = input.question('nhap ten bai hat: ')
    let nameSinger = input.question('nhap ten ca si: ')
    let test: boolean = true
    if (nameSong.length == 0 || nameSinger.length == 0) {
        test = false
        console.log('không được để trống')
    }
    for (let i = 0; i < managerAlbum2.listAlbum[choiceStt - 1].listSong.length; i++) {
        if (managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSong === nameSong && managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSinger === nameSinger) {
            console.log('bài hát đã tồn tại')
            test = false

        }
    }
    if (test == true) {
            let song: Song = new Song(nameSong, nameSinger)
            console.log('thêm bài hát thành công')
        managerAlbum2.listAlbum[choiceStt - 1].add(song)
        // return song

        } else {

            console.log('thêm bài hát thất bại')}





}


function showSong(managerAlbum2: ManagerAlbum, choiceStt) {
    if (managerAlbum2.listAlbum[choiceStt - 1].listSong.length == 0) {
        console.log('hiện chưa có bài hát nào')
    } else {

        for (let i = 0; i < managerAlbum2.listAlbum[choiceStt - 1].listSong.length; i++) {
            console.log(`${i + 1}. ${managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSong}`)
        }

        let choice
        do {
            console.log('------------------------------------------')
            console.log(`1.thao tác với bài hát\n0.thoát.`)
            console.log('-------------------------------------------')
            choice = +input.question('nhap lua chon cua ban')
            switch (choice) {
                case 1 :

                    menuSuaXoaSong(managerAlbum2, choiceStt)
                    break;
                case 2:
                    break;
                default:
                    console.log('nhap khong hop le')
            }

        } while (choice != 0)

    }

}

function findSong(managerAlbum2: ManagerAlbum, choiceStt) {
    let name = input.question('nhap ten bai hat muon tim kiem: ')
    let name2 = new RegExp(name)
    if (name.length == 0) {
        console.log('bạn chưa nhập từ khóa')
    } else {
        let flag = 0
        for (let i = 0; i < managerAlbum2.listAlbum[choiceStt - 1].listSong.length; i++) {
            let test = name.test(managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSong)
            if (test == true) {
                flag++
                console.log(`${flag}. tên bài hát: ${managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSong} tên tác giả: ${managerAlbum2.listAlbum[choiceStt - 1].listSong[i].nameSinger}`)
            }

        }
        if (flag == 0) {
            console.log('ko co du lieu bai hat')
        }


    }
}

function menuSuaXoaSong(managerAlbum2: ManagerAlbum, choiceSttAlbum) {
    for (let i = 0; i < managerAlbum2.listAlbum[choiceSttAlbum - 1].listSong.length; i++) {
        console.log(`${i + 1}. ${managerAlbum2.listAlbum[choiceSttAlbum - 1].listSong[i].nameSong}`)
    }
    console.log('nhập stt bài hát cần sửa: ')
    let choiceSTTSong = +input.question()
    if (choiceSTTSong > managerAlbum2.listAlbum.length || choiceSTTSong < 1) {
        console.log('Stt bạn nhập không hợp lệ')

    } else {
        let menu = `-----Menu thao tác bài hát-----\n1.xoa bai hat\n2.Sửa bài hát\n0.Thoat`
        let choice;

        do {
            console.log(menu);
            choice = +input.question('Nhap lua chon cua ban: ');
            switch (choice) {
                case 1:
                    deleteSong(choiceSTTSong, choiceSttAlbum, managerAlbum2)
                    break;
                case 2:
                    editSong(choiceSTTSong, choiceSttAlbum, managerAlbum2)
                    break;

                default:
                    console.log('lua chon cua ban ko hop le')
                    break;
            }
        } while (choice != 0)
    }
}

function editSong(choiceSttSong, choiceSTT, managerAlbum2: ManagerAlbum) {
    let newNameSong = input.question('nhap ten moi')
    let nameRegex = /^[a-zA-Z0-9_]*$/;
    let test = nameRegex.test(newNameSong)
    if (newNameSong.length == 0) {
        test = false
    }
    if (managerAlbum2.listAlbum[choiceSTT - 1].listSong[choiceSttSong - 1].nameSong == newNameSong) {
        test = false
    }
    if (test == false) {
        console.log('vui long nhap lai ten bai hat ')
        console.log('sua ten that bai')
    } else {
        managerAlbum2.listAlbum[choiceSTT - 1].listSong[choiceSttSong - 1].editName(newNameSong)
        console.log('sửa tên thành công')
    }


}

function deleteSong(choiceSttSong, choiceSTT, managerAlbum2: ManagerAlbum) {
    console.log('bạn có chắc chắn muốn xóa\n1.yes\n2.no')
    let choice = +input.question('lua chon cua ban: ')
    if (choice == 1) {
        managerAlbum2.listAlbum[choiceSTT - 1].deleteSong(choiceSttSong - 1)
        console.log('đã xóa thành công')
    } else if (choice == 2) {

    } else {
        console.log('nhập ko hợp lệ')
    }
}

function findAlbum(managerAlbum2: ManagerAlbum) {
    let name = input.question('nhap ten album ban muon tim: ')
    let name2 = new RegExp(name)
    if (name.length == 0) {
        console.log('bạn chưa nhập từ khóa')
    } else {
        let flag = 0
        for (let i = 0; i < managerAlbum2.listAlbum.length; i++) {
            let a = name2.test(managerAlbum2.listAlbum[i].nameAlbum)
            if (a == true) {
                flag++
                console.log(`${flag}. tên Album: ${managerAlbum2.listAlbum[i].nameAlbum}-số lượng bài hát : ${managerAlbum2.listAlbum[i].soLuongSong}`)
            }

        }
        if (flag == 0) {
            console.log('ko co du lieu album')
        }
    }

}




import {ManagerAlbum} from "../service/managerAlbum";

export class Account{
    userName:string
    passWord:string;

    constructor(userName: string, passWord: string) {
        this.userName = userName;
        this.passWord = passWord;
    }

    // myAlbums = new ManagerAlbum('a')
}
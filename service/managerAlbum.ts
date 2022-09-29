import {Manager} from "./manager";
import {Album} from "../model/album";
import {Song} from "../model/song";
import {Account} from "../model/account";

export class ManagerAlbum implements Manager<Album>{
    listAlbum:Album[]=[]
    private _name:string
    private _user: Account;


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get user(): Account {
        return this._user;
    }

    set user(value: Account) {
        this._user = value;
    }


    constructor(name: string, user: Account) {
        this._name = name;
        this._user = user;
    }

    add(t: Album) {
        this.listAlbum.push(t)
    }

    delete(name: string) {
        let index = this.findByIndex(name)
        this.listAlbum.splice(index,1)
    }

    edit(name: string, newName: string) {
        let index = this.findByIndex(name)
        this.listAlbum[index].nameAlbum=name
    }

    findByName(name:string) {
        let index = this.findByIndex(name)
        return this.listAlbum[index]
    }
    findByIndex(name:string){
        for (let i = 0; i <this.listAlbum.length ; i++) {
            if(this.listAlbum[i].nameAlbum==name){
                return i
            }

        }
        return -1

    }
}
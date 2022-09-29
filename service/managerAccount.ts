import {Manager} from "./manager";
import {Account} from "../model/account";

export class ManagerAccount implements Manager<Account>{
    listAccount: Account[]=[]
    add(t: Account) {
        this.listAccount.push(t)
    }

    delete(name: string) {
    }

    edit(name: string, newName: string) {
    }

    findByName(name: string) {

    }
    findByName1(name: string, passWord:string) {
        return this.listAccount[this.findByIndex(name,passWord)]
    }
    findByIndex(name:string, passWord:string){
        for (let i = 0; i <this.listAccount.length ; i++) {
            if(this.listAccount[i].userName==name && this.listAccount[i].passWord==passWord ){
                return i
            }

        }
        return -1

    }

}
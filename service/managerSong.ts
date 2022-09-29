import {Manager} from "./manager";
import {Song} from "../model/song";

export class ManagerSong implements Manager<Song>{
   listSong:Song[]=[]
    add(t: Song) {
       this.listSong.push(t)
    }

    delete(name: string) {
        let index = this.findByIndex(name)
        this.listSong.splice(index,1)
    }

    edit(name: string, newName: string) {
        let index = this.findByIndex(name)
        this.listSong[index].editName(newName)
    }

    findByName(name:string) :Song{
       let index = this.findByIndex(name)
        return this.listSong[index]
    }
    findByIndex(name:string){
        for (let i = 0; i <this.listSong.length ; i++) {
            if(this.listSong[i].nameSong==name){
                return i
            }
        }
        return -1

    }


}
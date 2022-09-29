import {Song} from "./song";

export class Album{
    nameAlbum:string;
    soLuongSong:number=0

    constructor(nameAlbum: string) {
        this.nameAlbum = nameAlbum;
    }

    listSong: Song[]=[]
    add(song:Song){
        this.listSong.push(song)
        this.soLuongSong++
    }
    showSong(){
        for (let i = 0; i <this.listSong.length ; i++) {


        }
    }
    deleteSong(index){
        this.listSong.splice(index,1)
        this.soLuongSong=this.soLuongSong-1

    }


}
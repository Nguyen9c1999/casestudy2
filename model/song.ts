export class Song{
    nameSong:string;
    nameSinger:string;

    constructor(nameSong: string, nameSinger: string) {
        this.nameSong = nameSong;
        this.nameSinger = nameSinger;
    }

    editName(name:string):void{
        this.nameSong=name
    }
}
export interface Manager <T>{
    add(t:T)
    edit(name:string,newName:string)
    findByName(name:string)
    delete(name:string)
}
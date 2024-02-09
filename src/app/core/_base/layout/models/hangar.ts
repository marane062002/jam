export class Hangar {
id?:number
    numHangar?:number
    lib?:string
    description?:string
    constructor(numHangar,lib,description,id){
		this.id=id
        this.numHangar=numHangar
        this.lib=lib
        this.description=description
    }
}

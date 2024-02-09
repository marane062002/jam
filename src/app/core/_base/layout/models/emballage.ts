export class Emballage  implements IEmballage {


    constructor(
		public numEmballage?:number ,
		// public numEmballage1?:number ,
		// public numEmballage2?:number ,
		// public numEmballageImm?:String ,
		public categori?:string ,
		public description:string ="",
		// lib:string
		public poidEmballage?:number ){

    }


}
export interface IEmballage{
	// id?:number
	numEmballage?:number
	// numEmballage1?:number ,
	// numEmballage2?:number ,
	// numEmballageImm?:String ,
    categori?:string
    description?:string
    // lib:string
    poidEmballage?:number
}

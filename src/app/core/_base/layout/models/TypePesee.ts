export  class TypePesee implements ITypePesee
{
	id?:number;
	typePesee?:string;
	constructor(
		id?:number,
		typePesee?:string,
		){

	};
}
export interface ITypePesee{
	id?:number;
	typePesee?:string;
}

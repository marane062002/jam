export class Espece implements IEspece {
    constructor(
        public id : number,
        public espece : string,
        public description : string,
    ){

    }
  }

  export interface IEspece{
    id : number,
    espece : string,
    description : string,
  }
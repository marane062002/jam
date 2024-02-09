
export interface INonValideMissionDTO {
    
  
    id ?: number | null;
    textRejtee ?: string | null;

}
export class NonValideMissionDTO  implements INonValideMissionDTO{
    constructor(
      
        public id ?: number | null,
        public textRejtee ?: string | null,
     
    ){}
}

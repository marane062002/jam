export interface IApplicationUser {
    mail ?: string | null;
    pwd ?: string | null;
}
export class ApplicationUser implements IApplicationUser {
    constructor( public mail?: string | null, public pwd?: string | null) {}
  }

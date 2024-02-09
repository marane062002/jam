export class SaerchAssociationDTO {
	commune: any[] = [];
	type: any[] = [];
	dateDebut: Date;
	dateFin: Date;
	constructor(type: any[], commune: any[], dateDebut: Date, dateFin: Date) {
		this.commune = commune;
		this.type = type;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
	}
}

export class SaerchAssociationDTO2 {
	natureSubvention: any[] = [];
	dateDebut: Date;
	dateFin: Date;
	constructor(natureSubvention: any[], dateDebut: Date, dateFin: Date) {
		this.natureSubvention = natureSubvention;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
	}
}

export class SaerchAssociationDTO3 {
	dateDebut: Date;
	dateFin: Date;
	constructor(dateDebut: Date, dateFin: Date) {
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
	}
}
export class SaerchAssociationDTO4 {
	activite_de_rayonnement: any[] = [];
	dateDebut: Date;
	dateFin: Date;
	constructor(activite_de_rayonnement: any[], dateDebut: Date, dateFin: Date) {
		this.activite_de_rayonnement = activite_de_rayonnement;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
	}
}

export class SaerchAssociationDTO5 {
	arrondissement: any[] = [];
	dateDebut: Date;
	dateFin: Date;
	constructor(arrondissement: any[], dateDebut: Date, dateFin: Date) {
		this.arrondissement = arrondissement;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
	}
}
export class SaerchAssociationDTO6 {
	activite_de_rayonnement: any[] = [];
	arrondissement: any[] = [];
	dateDebut: Date;
	dateFin: Date;
	constructor(activite_de_rayonnement: any[], arrondissement: any[], dateDebut: Date, dateFin: Date) {
		this.arrondissement = arrondissement;
		this.activite_de_rayonnement = activite_de_rayonnement;
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
	}
}
export class SaerchAssociationDTO7 {
	typeActiviteAssociation: any[] = [];
	d1: Date;
	d2: Date;
	constructor(typeActiviteAssociation: any[], d1: Date, d2: Date) {
		this.typeActiviteAssociation = typeActiviteAssociation;
		this.d1 = d1;
		this.d2 = d2;
	}
}

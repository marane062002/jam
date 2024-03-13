import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { ProgrammeService } from "../../../../../../../app/views/pages/shared/ProgrammeService";
import Swal from "sweetalert2";
import { NatureService } from "../../../../../../../app/views/pages/shared/Nature.service";
 import { ConventionMarcheService } from "../../../../../../../app/views/pages/shared/conventionService";
import { TableauBordDialogComponent } from "../tableau-bord-dialog/tableau-bord-dialog.component";
import { TableauBordService } from "../../../../../../../app/views/pages/shared/tableau-bord.service";
@Component({
	selector: "kt-add-tableau-bord",
	templateUrl: "./add-tableau-bord.component.html",
	styleUrls: ["./add-tableau-bord.component.scss"],
})
export class AddTableauBordComponent implements OnInit {
	checkLang = localStorage.getItem("language");
	

	// ============================================
	// Presentation de datasource
	// ============================================

	// ============================================
	// Declarations
	// ============================================
	formGroup: FormGroup;
	codes = ["A", "B", "C", "D", "E", "F", "G", " H", "I", " J", "K", "L", "M", "N", " O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", " Y", "Z"];
	niveaux = ["structurant", "proximité"];
	etatsAvancement = ["ACHEVES", "EN_COURS", "NON_LANCES", "EN_ARRET", "ANNULE"];
	EtatAvancement: Array<etatAvancement> = [
		{
			type: "ACHEVES",
			color: "#ffd433",
		},
		{
			type: "EN_COURS",
			color: "#acdbb7",
		},
		{
			type: "NON_LANCES",
			color: "#acdcd7",
		},
		{
			type: "EN_ARRET",
			color: "#b4c6e7",
		},
		{
			type: "ANNULE",
			color: "#e7c1b4",
		},
	];

	getTypeColor(type) {
		let t = this.EtatAvancement.find((t) => t.type == type);
		if (!t) {
			return "#ffffff";
		}

		return t.color;
	}
	// ============================================
	// Controles pagination
	// ============================================

	constructor(private dialog: MatDialog,private tableauBordService:TableauBordService,
		private Natureservice: NatureService,
		private route: ActivatedRoute,
		private conventionMarcheService: ConventionMarcheService,
		private translate: TranslateService,
		private router: Router,
		 private programeServie: ProgrammeService,
		private datePipe: DatePipe, 
	
		) {
		this.formGroup = new FormGroup({
			programmePhasses: new FormArray([]),
			convention: new FormControl([]),
			date: new FormControl(null),
			dateFin: new FormControl(null),
			orientationStrategique: new FormControl([]),
			nature: new FormControl([]),
			niveau: new FormControl([]),
			maitreOuvrage: new FormControl([]),
			maitreOuvrageDelegue: new FormControl([]),
			codeOrientation: new FormControl([]),
			numProjet: new FormControl(""),
			codeProjet: new FormControl(""),
			objectifOperationnel: new FormControl([]),
			lieu: new FormControl([]),
			chefProjet: new FormControl([]),
			anneeDebut: new FormControl(""),
			anneeFin: new FormControl(""),
			axe: new FormControl([]),
			nameProjet: new FormControl(""),
			objectifStrategique: new FormControl([]),
			etatAvancement: new FormControl([]),
		});
	}
	listChefProjet = [];
	listAxe = [];
	listLieu = [];
	listCodeOrientation = [];
	listNature = [];
	listMaitreOuvrage = [];
	listMaitreOuvrageDelegue = [];
	listNiveau = [];
	listEtatsAvancement = [];
	listOrientationStrategique = [];
	listObjectifOperationnel = [];
	listObjectifStrategique = [];
	chefProjets;
	natures;
	orientationStrategique;
	objectifStrategique;
	objectifOperationnel;
	localisation;
	maitreOuvrage;
	maitreOuvrageDelegue;
	axe;
	pageSize
listConvention
listeConventionObject
	ngOnInit() {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == "ar") {
				this.checkLang = "ar";
			} else if (event.lang == "fr") {
				this.checkLang = "fr";
			}
		});
		this.Natureservice.findAll().then((res)=>{
			this.natures=res
			
		  })
	
		
			
		this.conventionMarcheService.all().subscribe(res => {
			this.listConvention = res;
			for(let i = 0; i < res.length; i++){
				if(this.checkLang=='fr'){
					this.listeConventionObject=res[i].object

				}
				if(this.checkLang=='ar'){
					this.listeConventionObject=res[i].objectAr

				}
			}
		  })
		if (this.checkLang == "fr") {
			this.programeServie.allChefProjets().subscribe((res) => {
				this.chefProjets = res;
			});
			
			this.programeServie.allOrientationStrategique().subscribe((res) => {
				this.orientationStrategique = res;
			});
			this.programeServie.allObjectifOperationnel().subscribe((res) => {
				this.objectifOperationnel = res;
			});
			this.programeServie.allObjectifStrategique().subscribe((res) => {
				this.objectifStrategique = res;
			});
			this.programeServie.allLocalisation().subscribe((res) => {
				this.localisation = res;
			});
			this.programeServie.allMaitreOuvrage().subscribe((res) => {
				this.maitreOuvrage = res;
			});
			this.programeServie.allMaitreOuvrageDelegue().subscribe((res) => {
				this.maitreOuvrageDelegue = res;
			});
			this.programeServie.allAxe().subscribe((res) => {
				this.axe = res;
			});
		}
		if (this.checkLang == "ar") {
			this.programeServie.allChefProjetsAr().subscribe((res) => {
				this.chefProjets = res;
			});
			
			this.programeServie.allOrientationStrategiqueAr().subscribe((res) => {
				this.orientationStrategique = res;
			});
			this.programeServie.allObjectifOperationnelAr().subscribe((res) => {
				this.objectifOperationnel = res;
			});
			this.programeServie.allObjectifStrategiqueAr().subscribe((res) => {
				this.objectifStrategique = res;
			});
			this.programeServie.allLocalisationAr().subscribe((res) => {
				this.localisation = res;
			});
			this.programeServie.allMaitreOuvrage().subscribe((res) => {
				this.maitreOuvrage = res;
			});
			this.programeServie.allMaitreOuvrageDelegue().subscribe((res) => {
				this.maitreOuvrageDelegue = res;
			});
			this.programeServie.allAxeAr().subscribe((res) => {
				this.axe = res;
			});
		}
		
		
	}
	
	  
	OrientationStarategiqueSelect(value) {
		console.log(value);
	
	}







	addItemChefProjet(event: any) {
		if (event[0] == "ALL") {
			this.listChefProjet = this.chefProjets;
			this.selectedOptionsCP = this.chefProjets.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.chefProjets.length) {
			this.listChefProjet = [];
			this.selectedOptionsCP = [];
		} else {
			this.listChefProjet = event;
			this.selectedOptionsCP = event;
		}
	}

	addItemAxe(event: any) {
		if (event[0] == "ALL") {
			this.listAxe = this.axe;
			this.selectedOptionsA = this.axe.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.axe.length) {
			this.listAxe = [];
			this.selectedOptionsA = [];
		} else {
			this.listAxe = event;
			this.selectedOptionsA = event;
		}
	}

	addItemLieu(event: any) {
		if (event[0] == "ALL") {
			this.listLieu = this.localisation;
			this.selectedOptionsL = this.localisation.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.localisation.length) {
			this.listLieu = [];
			this.selectedOptionsL = [];
		} else {
			this.listLieu = event;
			this.selectedOptionsL = event;
		}
	}

	selectedOptionsCO: string[] = [];
	selectedOptionsN: string[] = [];
	selectedOptionsMO: string[] = [];
	selectedOptionsMOD: string[] = [];
	selectedOptionsL: string[] = [];
	selectedOptionsCP: string[] = [];
	selectedOptionsNP: string[] = [];
	selectedOptionsA: string[] = [];
	selectedOptionsOP: string[] = [];
	selectedOptionsOS: string[] = [];
	selectedOptionsORS: string[] = [];
	selectedOptionsEA: string[] = [];

	addItemCodeOrientation(event: any) {
		if (event[0] == "ALL") {
			this.listCodeOrientation = this.codes;
			this.selectedOptionsCO = this.codes.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.codes.length) {
			this.listCodeOrientation = [];
			this.selectedOptionsCO = [];
		} else {
			this.listCodeOrientation = event;
			this.selectedOptionsCO = event;
		}
	}

	
	addItemMaitreOuvrage(event: any) {
		if (event[0] == "ALL") {
			this.listMaitreOuvrage = this.maitreOuvrage;
			this.selectedOptionsMO = this.maitreOuvrage.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.maitreOuvrage.length) {
			this.listMaitreOuvrage = [];
			this.selectedOptionsMO = [];
		} else {
			this.listMaitreOuvrage = event;
			this.selectedOptionsMO = event;
		}
	}

	addItemMaitreOuvrageDelegue(event: any) {
		if (event[0] == "ALL") {
			this.listMaitreOuvrageDelegue = this.maitreOuvrageDelegue;
			this.selectedOptionsMOD = this.maitreOuvrageDelegue.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.maitreOuvrageDelegue.length) {
			this.listMaitreOuvrageDelegue = [];
			this.selectedOptionsMOD = [];
		} else {
			this.listMaitreOuvrageDelegue = event;
			this.selectedOptionsMOD = event;
		}
	}

	addItemNiveau(event: any) {
		if (event[0] == "ALL") {
			this.listNiveau = this.niveaux;
			this.selectedOptionsN = this.niveaux.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.niveaux.length) {
			this.listNiveau = [];
			this.selectedOptionsN = [];
		} else {
			this.listNiveau = event;
			this.selectedOptionsN = event;
		}
	}

	addItemOrientationStrategique(event: any) {
		if (event[0] == "ALL") {
			this.listOrientationStrategique = this.orientationStrategique;
			this.selectedOptionsORS = this.orientationStrategique.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.orientationStrategique.length) {
			this.listOrientationStrategique = [];
			this.selectedOptionsORS = [];
		} else {
			this.listOrientationStrategique = event;
			this.selectedOptionsORS = event;
		}
	}

	addItemObjectifOperationnel(event: any) {
		if (event[0] == "ALL") {
			this.listObjectifOperationnel = this.objectifOperationnel;
			this.selectedOptionsOP = this.objectifOperationnel.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.objectifOperationnel.length) {
			this.listObjectifOperationnel = [];
			this.selectedOptionsOP = [];
		} else {
			this.listObjectifOperationnel = event;
			this.selectedOptionsOP = event;
		}
	}

	addItemObjectifStrategique(event: any) {
		if (event[0] == "ALL") {
			this.listObjectifStrategique = this.objectifStrategique;
			this.selectedOptionsOS = this.objectifStrategique.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.objectifStrategique.length) {
			this.listObjectifStrategique = [];
			this.selectedOptionsOS = [];
		} else {
			this.listObjectifStrategique = event;
			this.selectedOptionsOS = event;
		}
	}

	addItemEtatAvancement(event: any) {
		if (event[0] == "ALL") {
			this.listEtatsAvancement = this.etatsAvancement;
			this.selectedOptionsEA = this.etatsAvancement.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.etatsAvancement.length) {
			this.listEtatsAvancement = [];
			this.selectedOptionsEA = [];
		} else {
			this.listEtatsAvancement = event;
			this.selectedOptionsEA = event;
		}
	}
	addItemNature(event: any) {
		if (event.includes('ALL')) {
			this.listNature=this.natures.id
			this.selectedOptionsNP = this.natures.map(item => item.id);
		} else if (event.length == this.natures.length) {
			this.listNature = [];
			this.selectedOptionsNP = [];
		} else {
			this.listNature = event;
			this.selectedOptionsNP = event;
		}
	}

	selectedOptionsConvention
	listConventions
	ConventionChange(event){
		if (event[0] == "ALL") {
			this.listConventions = this.listConvention;
			this.selectedOptionsConvention = this.listConvention.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.listConvention.length) {
			this.listConventions = [];
			this.selectedOptionsConvention = [];
		} else {
			this.listConventions = event;
			this.selectedOptionsConvention = event;
		}
		
	}
	onSubmit() {
		if (this.formGroup.value.chefProjet.length == 0) {
			this.formGroup.value.chefProjet = "";
		}
		if (this.listChefProjet.length != 0) {
			this.formGroup.value.chefProjet = `(${this.listChefProjet.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.axe.length == 0) {
			this.formGroup.value.axe = "";
		}
		if (this.listAxe.length != 0) {
			this.formGroup.value.axe = `(${this.listAxe.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.lieu.length == 0) {
			this.formGroup.value.lieu = "";
		}
		if (this.listLieu.length != 0) {
			this.formGroup.value.lieu = `(${this.listLieu.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.codeOrientation.length == 0) {
			this.formGroup.value.codeOrientation = "";
		}
		if (this.listCodeOrientation.length != 0) {
			this.formGroup.value.codeOrientation = `(${this.listCodeOrientation.map((item) => `'${item}'`).join(", ")})`;
		}
		
		if (this.formGroup.value.maitreOuvrage.length == 0) {
			this.formGroup.value.maitreOuvrage = "";
		}
		if (this.listMaitreOuvrage.length != 0) {
			this.formGroup.value.maitreOuvrage = `(${this.listMaitreOuvrage.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.maitreOuvrageDelegue.length == 0) {
			this.formGroup.value.maitreOuvrageDelegue = "";
		}
		if (this.listMaitreOuvrageDelegue.length != 0) {
			this.formGroup.value.maitreOuvrageDelegue = `(${this.listMaitreOuvrageDelegue.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.niveau.length == 0) {
			this.formGroup.value.niveau = "";
		}
		if (this.listNiveau.length != 0) {
			this.formGroup.value.niveau = `(${this.listNiveau.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.orientationStrategique.length == 0) {
			this.formGroup.value.orientationStrategique = "";
		}
		if (this.listOrientationStrategique.length != 0) {
			this.formGroup.value.orientationStrategique = `(${this.listOrientationStrategique.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.objectifOperationnel.length == 0) {
			this.formGroup.value.objectifOperationnel = "";
		}
		if (this.listObjectifOperationnel.length != 0) {
			this.formGroup.value.objectifOperationnel = `(${this.listObjectifOperationnel.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.objectifStrategique.length == 0) {
			this.formGroup.value.objectifStrategique = "";
		}
		if (this.listObjectifStrategique.length != 0) {
			this.formGroup.value.objectifStrategique = `(${this.listObjectifStrategique.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.etatAvancement.length == 0) {
			this.formGroup.value.etatAvancement = "";
		}
		if (this.listEtatsAvancement.length != 0) {
			this.formGroup.value.etatAvancement = `(${this.listEtatsAvancement.map((item) => `'${item}'`).join(", ")})`;
		}
		if(this.formGroup.value.convention!=undefined){
			if (this.formGroup.value.convention.length == 0) {
				this.formGroup.value.convention = [];
			}
		}else{
			this.formGroup.value.convention = [];

		}
		if(this.listConventions!=undefined){
			if (this.listConventions.length != 0) {
				this.formGroup.value.convention = this.listConventions;
			}
		}
		
		if (this.formGroup.value.nature!=undefined) {
			if (this.formGroup.value.nature.length == 0) {

			this.formGroup.value.nature = [];}
		}
		if (this.listNature != undefined) {
			if (this.listNature.length != 0) {

			this.formGroup.value.nature = this.listNature;}
		}
		
		const dialogRef = this.dialog.open(TableauBordDialogComponent, {
			width: "600px",
			data: {
				name: "",
				orientationStrategique:this.formGroup.value.orientationStrategique,
				nature:this.formGroup.value.nature,
				convention:this.formGroup.value.convention,
				etatAvancement:this.formGroup.value.etatAvancement,
				objectifStrategique:this.formGroup.value.objectifStrategique,
				objectifOperationnel:this.formGroup.value.objectifOperationnel,
				maitreOuvrageDelegue:this.formGroup.value.maitreOuvrageDelegue,
				maitreOuvrage:this.formGroup.value.maitreOuvrage,
				chefProjet:this.formGroup.value.chefProjet,
				axe:this.formGroup.value.axe,
				lieu:this.formGroup.value.lieu,
				codeOrientation:this.formGroup.value.codeOrientation,
				nameProjet:this.formGroup.value.nameProjet,
				numProjet:this.formGroup.value.numProjet,
				codeProjet:this.formGroup.value.codeProjet,
				niveau:this.formGroup.value.niveau,
			},
		});

		dialogRef.afterClosed().subscribe((res) => {
			if (res) {
this.tableauBordService.save(res).subscribe((data)=>{
	
	this.router.navigate(['/programme/list-tableau-bord'])
})
			
				
			}
		});
	}
	
}


export class etatAvancement {
	type?: string;
	color?: string;
	cssClass?: string;
}

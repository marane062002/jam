import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BiensService } from "../../shared/biens.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ReclamationsService } from "../../shared/reclamations.service";
import { NgForm, FormControl } from "@angular/forms";
import * as $ from "jquery";
import { PPSource } from "../../personne-physique/personne-physique-list/personne-physique-list.component";
import { PersonnePhysiqueService } from "../../shared/personne-physique.service";
import { PersonneMoraleService } from "../../shared/personne-morale.service";
import { AutorisationsService } from "../../shared/autorisations.service";
import { FilesUtilsService } from "../../utils/files-utils.service";
import Swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material";

@Component({
	selector: "kt-autorisations-form",
	templateUrl: "./autorisations-form.component.html",
	styleUrls: ["./autorisations-form.component.scss"],
})
export class AutorisationsFormComponent implements OnInit {
	// ===============================================================
	//
	// ===============================================================
	arrondissements = [
		"المنارة",
		"جليز",
		"المدينة",
		"سيدي يوسف بن علي",
		"النخيل",
	];
	// ===============================================================
	//
	// ===============================================================
	@ViewChild("wizard", { static: true }) el: ElementRef;
	// ===============================================================
	//
	// ===============================================================
	constructor(
		private service: ReclamationsService,
		private service2: BiensService,
		private service1: AutorisationsService,
		private service3: PersonnePhysiqueService,
		private service4: PersonneMoraleService,
		private serviceFile: FilesUtilsService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	// ===============================================================
	//
	// ===============================================================
	timeDebutTraitement = { hour: 10, minute: 10 };
	timeFinTraitement = { hour: 10, minute: 10 };
	allcin;
	allrc;
	dataArray = [];
	dataArrayRc = [];
	formData;
	formDataBien;
	typeBien;
	typeAutorisation;
	espcaeBien;
	biens;
	TypeBien;
	EspaceBien;
	typesAutorisation;
	selectedFiles = [];
	temp=false
	allpjs = [];
	dataSource1: MatTableDataSource<any>;
	displayedColumns1 = [ "nomDoc", "actions"];

	formPj = {  selecetedFile: {} };

	date = new FormControl(new Date());
	serializedDate = new FormControl(new Date().toISOString());
	// ===============================================================
	//
	// ===============================================================
	ngOnInit() {
		this.serviceFile.fileSizeDetector();

		this.resetForm();
		this.service2.getTypesBien().subscribe((data) => {
			this.typeBien = data;
		});
		this.service2.getAllBien().then((data) => {
			this.biens = data;
		});
		this.service.getAllCinpp().subscribe((data) => {
			this.allcin = data;
			console.log(this.allcin);
			this.searchDpDropdown();
		});
		this.service.getAllRc().subscribe((data) => {
			this.allrc = data;
			this.searchDpDropdownRc();
		});
		this.service2.getTypeAutorisation().subscribe((data) => {
			this.typesAutorisation = data;
		});
	}
	// ===============================================================
	//
	// ===============================================================
	ngAfterViewInit(): void {
		// Initialize form wizard

		const wizard = new KTWizard(this.el.nativeElement, {
			startStep: 1,
		});

		// Validation before going to next page
		wizard.on("beforeNext", (wizardObj) => {
			// https://angular.io/guide/forms
			// https://angular.io/guide/form-validation
			// validate the form and use below function to stop the wizard's step
			// wizardObj.stop();
		});

		// Change event
		wizard.on("change", () => {
			setTimeout(() => {
				KTUtil.scrollTop();
			}, 500);
		});
	}
	// ===============================================================
	//
	// ===============================================================
	onClickDeletePj(e, i) {
		var x;
		this.selectedFiles = Array.from(this.selectedFiles);
		this.selectedFiles.splice(i, 1);
	}
	// ===============================================================
	//
	// ===============================================================
	// save(event: any): void {
	// 	this.selectedFiles = event.target.files;
	// } 
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
	}

	validerPj() {
		var champTexte:any = document.getElementById("test");
		
		if(champTexte.value == "" ){
			this.temp=false
			Swal.fire({
				title:"	Vous devez choisir une piéce jointe",

				icon:'error'
			})
		}else{
			this.allpjs.push(this.formPj);
			$("#test").val(null);
			console.log(this.allpjs);
			this.dataSource1 = new MatTableDataSource(this.allpjs);
			this.array=this.dataSource1.data
			
			this.formPj = {  selecetedFile: {}};
			champTexte.value = "";
		}
		
	}
	onDeletePj(id: number): void {
		
		this.temp=false
		this.allpjs.splice(id, 1);
		if (this.allpjs.length > 0) {
			this.dataSource1 = new MatTableDataSource(this.allpjs);
		} else {
			this.dataSource1 = null
			
		}
		
	}
	// ===============================================================
	//
	// ===============================================================
	resetForm(form?: NgForm) {
		if (form != null) form.resetForm();
		this.formData = {
			pps: {
				nom: "",
				prenom: "",
				cin: "",
				adresse: "",
				telephoneFixe: "",
				telephoneGsm: "",
				eMail: "",
				fax: "",
			},
			pms: {
				nom: "",
				rc: "",
				identifiantFiscal: "",
				numeroPatente: "",
				adresse: "",
				teleFixe: "",
				teleGsm: "",
				contact: "",
				eMail: "",
				siteWeb: "",
				fax: "",
				idvilleRegistreCommerce: 0,
			},
		};

		this.formDataBien = {
			dateDemande: "",
			adresseAuto: "",
			arrondissement: "",
			zone: "",
			objet: "",
			dateDebut: "",
			dateFin: "",
			descriptions: "",
			ppsourceautorisation: 0,
			pmsourceautorisation: 0,
			objetdemandeautorisation:"",
			// objetdemandeautorisation: {
			// 	id: 0,
			// 	objetDemandeAutorisation: "",
			// },
			// espace: {
			// 	id: 0,
			// 	espace: "",
			// },
			espace:'',
			typeobj: {
				id: 0,
				typeObjetAutorisation: "",
			},
			typeAutorisation: {
				id: 0,
				typeAutorisation: "",
			},
			statutdemandeautorisation: {
				id: 1,
				libelle: "مسجلة",
			},
		};
	}
	// ===============================================================
	//
	// ===============================================================
	show(typesource) {
		if (typesource == "pp") {
			this.formData["pms"] = {
				nom: "",
				rc: "",
				identifiantFiscal: "",
				numeroPatente: "",
				adresse: "",
				teleFixe: "",
				teleGsm: "",
				contact: "",
				eMail: "",
				siteWeb: "",
				fax: "",
				idvilleRegistreCommerce: 0,
			};
		} else {
			this.formData["pps"] = {
				nom: "",
				prenom: "",
				cin: "",
				adresse: "",
				telephoneFixe: "",
				telephoneGsm: "",
				eMail: "",
				fax: "",
			};
		}
	}
	// ===============================================================
	//
	// ===============================================================
	onKey(value) {
		this.dataArray = [];
		this.selectSearch(value);
	}
	// ===============================================================
	//
	// ===============================================================
	selectSearch(value: string) {
		let filter = value.toLowerCase();
		for (let i = 0; i < this.allcin.length; i++) {
			let option = this.allcin[i];
			if (option.toLowerCase().indexOf(filter) >= 0) {
				this.dataArray.push(option);
			}
		}
	}
	// ===============================================================
	//
	// ===============================================================
	onKeyRc(value) {
		this.dataArrayRc = [];
		this.selectSearchRc(value);
	}
	// ===============================================================
	//
	// ===============================================================
	onChangeofOptionsTypeBien(f) {
		this.service2.getByTypeBien(f.value.id).subscribe((data) => {
			this.TypeBien = data;
		});
	}
	// ===============================================================
	//
	// ===============================================================
	onChangeofOptionsBien(f) {
		this.service2.getEspaceByBien(f.value.id).subscribe((data) => {
			this.EspaceBien = data;
		});
	}
	// ===============================================================
	//
	// ===============================================================
	switch() {
		if (this.formData.pps.nom != "") {
			document.getElementById("pppp").style.display = "inline";
			document.getElementById("pmmm").style.display = "none";
		} else {
			document.getElementById("pmmm").style.display = "inline";
			document.getElementById("pppp").style.display = "none";
		}
	}
	// ===============================================================
	//
	// ===============================================================
	selectSearchRc(value: string) {
		let filter = value.toLowerCase();
		for (let i = 0; i < this.allrc.length; i++) {
			let option = this.allrc[i];
			if (option.toLowerCase().indexOf(filter) >= 0) {
				this.dataArrayRc.push(option);
			}
		}
	}
	// ===============================================================
	//
	// ===============================================================
	onChangeofOptions1(f) {
		console.log(f);

		this.service.getByCinpp(f.value).subscribe((data) => {
			this.formData["pps"] = data;
			console.log(this.formData["pps"]);
		});
	}
	// ===============================================================
	//
	// ===============================================================
	onChangeofOptionsrc(f) {
		this.service.getByRc(f.value).subscribe((data) => {
			this.formData["pms"] = data;
			//console.log(this.formData['pps']);
		});
	}
	// ===============================================================
	//
	// ===============================================================
	searchDpDropdownRc() {
		for (let i = 0; i < this.allrc.length; i++) {
			this.dataArrayRc.push(this.allrc[i]);
		}
	}
	// ===============================================================
	//
	// ===============================================================
	searchDpDropdown() {
		for (let i = 0; i < this.allcin.length; i++) {
			this.dataArray.push(this.allcin[i]);
		}
	}
	// ===============================================================
	//
	// ===============================================================
	array
	onSubmit() {
		
		
		if(this.formDataBien.typeobj.id == 0 || this.formDataBien.typeobj.id == null){
			// this.formDataBien.objetdemandeautorisation = null;
			// this.formDataBien.espace = null;
			this.formDataBien.typeobj = null;
		}else{
		// this.formDataBien.espace = { id: this.formDataBien.espace[0] * 1 };
		this.formDataBien.typeobj = { id: this.formDataBien.typeobj.id.id };
		}
		var personnePM;
		console.log("type OBJ : "+ JSON.stringify(this.formDataBien,null,2) )
		
		var dt = new Date(this.formDataBien.dateDebut);
		this.formDataBien.dateDebut = new Date(
			dt.getFullYear() +
				"/" +
				(dt.getMonth() + 1) +
				"/" +
				dt.getDate() +
				" " +
				this.timeDebutTraitement.hour +
				":" +
				this.timeDebutTraitement.minute
		);
		var dt1 = new Date(this.formDataBien.dateFin);
		this.formDataBien.dateFin = new Date(
			dt1.getFullYear() +
				"/" +
				(dt1.getMonth() + 1) +
				"/" +
				dt1.getDate() +
				" " +
				this.timeFinTraitement.hour +
				":" +
				this.timeFinTraitement.minute
		);
		if (this.formData.pps.nom != "") {
			personnePM = this.formData["pps"];
			this.service3.sendpp(personnePM).subscribe((res) => {
				this.formDataBien.ppsourceautorisation = res;
				console.log(this.formDataBien);
				this.service1.sendaut(this.formDataBien).subscribe((res1) => {
					
					if (this.allpjs.length > 0) {
						for (var i = 0; i < this.allpjs.length; i++) {

						this.service1
							.nouvellepj(this.allpjs[i].selecetedFile, res1.id)
							.subscribe((res) => {});}
					}
					this.router.navigate(["/autorisations/autorisations-list"]);
				});
			});
		} else {
			personnePM = this.formData["pms"];
			this.service4.sendpm(personnePM).subscribe((res) => {
				this.formDataBien.pmsourceautorisation = res;
				this.service1.sendaut(this.formDataBien).subscribe((res1) => {
					this.router.navigate(["/autorisations/autorisations-list"]);
					if (this.allpjs.length > 0) {
						for (var i = 0; i < this.allpjs.length; i++) {

						this.service1
							.nouvellepj(this.allpjs[i].selecetedFile, res1.id)
							.subscribe((res) => {});}
					}
					this.router.navigate(["/autorisations/autorisations-list"]);
				});
			});
		}
	}
}

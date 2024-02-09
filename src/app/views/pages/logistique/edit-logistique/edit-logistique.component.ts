import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatSelect, MatSelectChange } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../shared/notification.service";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { Location } from "@angular/common";
import { LogistiqueService } from "../../utils/logistique.service";
import { PieceJointeLogistiqueService } from "../../utils/piece-jointe-logistique.service";
import * as $ from "jquery";
import { environment } from "./../../../../../environments/environment";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { SpinnerService } from "../../utils/spinner.service";
import { AssociationService } from "../../utils/association.service";
import { finalize } from "rxjs/operators";

@Component({
	selector: "kt-edit-logistique",
	templateUrl: "./edit-logistique.component.html",
	styleUrls: ["./edit-logistique.component.scss"],
})
export class EditLogistiqueComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================

	files: Observable<any>;
	files1: Observable<any>;

	allpjs = [];
	formPj = { type: 0, selecetedFile: {} };

	isVisibleNature: boolean;
	isVisibleNature2: boolean;
	listArrondissements: any[];
	id: any;
	loading = false;
	test: string;
	submitted = false;
	addForm: FormGroup;
	statuts: any;
	listAssociations: any[];
	originalListAssociations :any[];
	types: any;
	sousTypes: any;
	selected: any;
	selectedIndex: any;
	organismes: any;
	fournisseurs: any;
	fournisseurs_impression: any;
	addFileForm: FormGroup;
	public uploadFiles: Array<File>;
	repo: string = "PieceJointeSubvention";
	type: string;
	columns: string[];
	constructor(private spinnerService:SpinnerService,private associationService:AssociationService, private pieceJointeLogistique: PieceJointeLogistiqueService, private service: LogistiqueService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private location: Location, private filesutils: FilesUtilsService, private notification: NotificationService, private translate: TranslateService) {
		this.getData();
		this.formBuilder();
		this.getArrondissements();
		// let input = this.addForm.get("test");
		// input.disable();
	}
	localChanged(event: any) {
		console.log(event);
		console.log(event.value);
		if (event.value == "المقاطعة") {
			this.isVisibleNature = true;
			this.isVisibleNature2 = false;
			console.log("true");
		} else {
			this.isVisibleNature = false;
			this.isVisibleNature2 = true;
			console.log("false");
		}
	}
	getArrondissements() {
		this.service.getArrondissements().subscribe(
			(data) => {
				this.listArrondissements = data;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	selectedValue1: number;
	selectedValue2: number;
	ngOnInit() {
		this.filesutils.fileSizeDetector();

		this.addFileForm = this.fb.group({
			_file: [],
		});
		this.formBuilder();

		this.filesutils.fileSizeDetector();

		// document.getElementById("autreAnnxe").style.display = "none";
		// document.getElementById("autreSpecialite").style.display = "none";
		this.id = this.route.snapshot.params["id"];
		this.files = this.pieceJointeLogistique.getByIdFiles(parseInt(this.id));
		this.pieceJointeLogistique.getByIdFiles(parseInt(this.id)).subscribe((res) => {
			this.files1 = res;
		});
		this.service
			.getObjectById("/logistique/show/", this.id)

			.subscribe((data) => {
				console.log("Fetch data  : " + JSON.stringify(data, null, 2));
				if (data.natureSubvention != null) {
					this.selectedOptionsORS = data.natureSubvention.split(', ');
					// this.addForm.value.natureSubvention = data.natureSubvention;
					// this.addItemOrientationStrategique(this.addForm.value.natureSubvention);
				}
				this.valueAssociation=data.numeroLocalAssociation;
				this.nomAssociation=data.nomAssociation;
				if (data) {
					if (data.date != null) this.addForm.controls["date"].patchValue(new Date(data.date).toISOString());
					this.addForm.controls["nomAssociation"].patchValue(data.nomAssociation);
					this.addForm.controls["cible"].patchValue(data.cible)
					this.addForm.controls["local"].patchValue(data.local)
					this.addForm.controls["montantDemande"].patchValue(data.montantDemande)
					this.addForm.controls["champActivite"].patchValue(data.champActivite)
					this.addForm.controls["numSubvention"].patchValue(data.numSubvention)
					this.addForm.controls["anneeSubvention"].patchValue(data.anneeSubvention)
					this.addForm.controls["nomProjet"].patchValue(data.nomProjet)
					this.addForm.controls["natureActivite"].patchValue(data.natureActivite)
					this.addForm.controls["activite_de_rayonnement"].patchValue(data.activite_de_rayonnement)
					this.addForm.controls["numeroLocalAssociation"].patchValue(data.numeroLocalAssociation)
					if(data.arrondissement!="" && data.arrondissement!=null){
						this.isVisibleNature=true;
						this.isVisibleNature2=false;
						this.addForm.controls["arrondissement"].patchValue(data.arrondissement)
					}
					if(data.nomEspace!="" && data.nomEspace!=null){
						this.isVisibleNature2=true;
						this.isVisibleNature=false;
						this.addForm.controls["nomEspace"].patchValue(data.nomEspace)
					}
				}
				if (data.suiveeExec.length > 0 && data.suiveeExec.includes('LITTERALE')) {
					this.selectedValue1 = 1;
				}
				else {
					this.selectedValue1 = 2;
				}
				if (data.suiveeExec.length > 0 && data.suiveeExec.includes('FINANCIERE')) {
					this.selectedValue2 = 1;
				}
				else {
					this.selectedValue2 = 2;
				}
				// this.addForm.patchValue({ ...data });



			});
	}

	// Select change paramettre
	@ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
	@Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	// ControlValueAccessor Implementation
	onChange: any = () => { };
	onTouched: any = () => { };
	// ============================================
	// Select changed type
	// ============================================
	valueAssociation: any = "";
	nomAssociation: string;
	nomas: any;
	suiviExecution: string[] = ["Oui", "Non"];
	suiviRapportsList: any[] = [];
	onchangeRapportfinancier(event: any) {
		if (event == "Oui") {
			this.suiviRapportsList.push("FINANCIERE");
		}
		if (event == "Non") {
			if (this.suiviRapportsList.includes("FINANCIERE")) {
				const index = this.suiviRapportsList.indexOf("FINANCIERE");
				if (index !== -1) {
					this.suiviRapportsList.splice(index, 1);
				}
			}
		}
	}

	selectedValueArrondissement(p1: any, p2: any) {
		if (p1.libelle && p2) {
			return p1.libelle === p2;
		}

		return false;
	}

	selectedValueAssociation(p1: any, p2: any) {
		if (p1.nom && p2) {
			return p1.nom === p2;
		}

		return false;
	}
	onchangeRapportLitteraire(event: any) {
		if (event == "Oui") {
			this.selectedValue1 = 1;
			this.suiviRapportsList.push("LITTERALE");
		}
		if (event == "Non") {
			this.selectedValue1 = 2;
			if (this.suiviRapportsList.includes("LITTERALE")) {
				const index = this.suiviRapportsList.indexOf("LITTERALE");
				if (index !== -1) {
					this.suiviRapportsList.splice(index, 1);
				}
			}
		}
	}

	typeChanged(event: MatSelectChange) {
		this.valueAssociation = event.value.prioriter;
		this.nomAssociation = event.value.nom;
	}

	selectionTypeChanged(event: MatSelectChange) {
		document.getElementById("Heberg").style.display = "none";
		document.getElementById("Resto").style.display = "none";
		document.getElementById("SousType").style.display = "none";
		document.getElementById("Montant").style.display = "none";
		document.getElementById("Print").style.display = "none";

		this.selectionChange.emit(new MatSelectChange(this.matSelect, event.value));
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		console.log("value changed : " + event.value);
		this.selected = event.value;
		console.log("touched type");
		// this.getAllSousTypeByType(this.selected.id);
		if (this.selected.id === 1) {
			document.getElementById("SousType").style.display = "none";
			document.getElementById("Montant").style.display = "inline";
			console.log("touched sous type" + this.selectedIndex);
		} else if (this.selected.id === 2) {
			document.getElementById("SousType").style.display = "inline";
			document.getElementById("Montant").style.display = "none";
			console.log("touched sous type" + this.selectedIndex);
		} else if (this.selected.id === 3) {
			document.getElementById("SousType").style.display = "inline";
			document.getElementById("Montant").style.display = "none";
			console.log("touched sous type" + this.selectedIndex);
		} else {
			document.getElementById("SousType").style.display = "none";
			document.getElementById("Montant").style.display = "none";
			console.log("touched sous type" + this.selectedIndex);
		}
	}
	// ============================================
	// Select changed sous type
	// ============================================
	selectionSousTypeChanged(event: MatSelectChange) {
		this.selectionChange.emit(new MatSelectChange(this.matSelect, event.value));
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		console.log("value changed : " + event.value);
		console.log("value index : " + this.selectedIndex);
		this.selected = event.value;
		console.log("touched sous type" + this.selected);

		if (this.selectedIndex === "خدمات الطعام") {
			document.getElementById("Heberg").style.display = "none";
			document.getElementById("Resto").style.display = "inline";
			document.getElementById("Print").style.display = "none";
			console.log("touched sous type" + this.selectedIndex);
			this.repo = "PjRestauration";
		} else if (this.selectedIndex === "الإقامة") {
			document.getElementById("Heberg").style.display = "inline";
			document.getElementById("Resto").style.display = "none";
			document.getElementById("Print").style.display = "none";
			console.log("touched sous type" + this.selectedIndex);
			this.repo = "PjHebergement";
		} else if (this.selectedIndex === "خدمات الطباعة") {
			document.getElementById("Heberg").style.display = "none";
			document.getElementById("Resto").style.display = "none";
			document.getElementById("Print").style.display = "inline";
			console.log("touched sous type" + this.selectedIndex);
			this.repo = "PjImpression";
		}
	}
	// ============================================
	// Liste des sous types
	// ============================================
	// private getAllSousTypeByType(id: number) {
	// 	this.service.getAllLogistiqueListById("/typeSubvention/sousType/", id).subscribe(
	// 		(data) => {
	// 			this.sousTypes = data;
	// 			console.log("result sous type subvention : " + id);
	// 		},
	// 		(err) => {
	// 			console.log(err);
	// 		}
	// 	);
	// }
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		const controls = this.addForm.controls;
		if (this.addForm.invalid) {
			Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
			return;
		}

		this.loading = true;
		this.addLogistique();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addLogistique() {
		let assocId = window.localStorage.getItem("assocId");
		console.log(JSON.stringify(this.addForm.value, null, 4));
		this.submitted = true;
		this.addForm.value.nomAssociation = this.nomAssociation;
		this.addForm.value.suiveeExec = this.suiviRapportsList;
		this.addForm.value.id=parseInt(this.id);
		console.log(this.addForm.value);
		this.selectedOptionsORS.splice(6, 1);
		if (this.selectedOptionsORS != null) {
			this.addForm.value.natureSubvention = this.selectedOptionsORS.join(', ');
		}
		if (this.selectedValue1 === 1) {
			this.suiviRapportsList.push("LITTERALE");
		}
		this.addForm.value.numeroLocalAssociation=this.valueAssociation;
		if(this.isVisibleNature==false){
			this.addForm.value.arrondissement=""
		}
		if(this.isVisibleNature2==false){
			this.addForm.value.nomEspace=""
		}
		if(this.addForm.value.arrondissement!=null){
		this.addForm.value.arrondissement=this.addForm.value.arrondissement.libelle;
		}
		this.service.updateObjectA("/logistique/edit/", this.addForm.value).subscribe(
			(data) => {
				console.log("saved successfuly ... ID : " + data);
				this.router.navigate(["logistique/list-logistique"]);
				// upload files to alfresco GED
				//console.log("ID DE COURRIER -data: " +JSON.stringify(data) +	" OU BIEN -data.id: " +data);
				if (this.allpjs2.length > 0 && data != undefined) {
					for (var i = 0; i < this.allpjs2.length; i++) {
						this.pieceJointeLogistique.nouvellepj(this.allpjs2, data, "PieceJointeLogistique").subscribe((data) => {
							console.log("C: " + JSON.stringify(data.id, null, 2));
						});
					}
				}
				this.notification.warn(this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"));
				this.location.back();
			},
			(error) => {
				alert(error);
			}
		);
	}
	// ============================================
	// Charger les elements du fourmulaire
	// ============================================
	formBuilder() {
		let assocId = window.localStorage.getItem("assocId");
		this.addForm = this.fb.group({
			test: [""],
			numSubvention: [""],
			anneeSubvention: [""],
			nomAssociation: [""],
			numeroLocalAssociation:[""],
			nomProjet: [""],
			champActivite: [""],
			natureActivite: [""],
			activite_de_rayonnement: [""],
			cible: [""],
			local: [""],
			date: [""],
			natureSubvention: [""],
			montantDemande: [""],
			suiveeExec: [""],
			suiveeExec1: [""],
			arrondissement: [""],
			nomEspace:[""],
			id: [""],
		});
	}
	// ============================================
	// Charger les liste externe
	// ============================================

	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.statuts = data[0];
				this.types = data[1];
				// this.nomAssociation = data[10];

				console.log("Liste de status: " + data[0]);
				console.log("Liste des associations: " + data[10]);
			},
			(err) => {
				console.log(err);
			}
		);

		this.getAssociation()
	}
isLoading:boolean=true;
	async getAssociation() {
        this.isLoading = true;
        var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
        await this.associationService
            .getRessource("/association/index2")
            .pipe(
                finalize(() => {
                    this.spinnerService.stop(spinnerRef); // stop spinner
                })
            )
            .subscribe(
                (data) => {
                    //console.log('Liste Ass : ' + JSON.stringify(data, null, 2))
                    this.isLoading = false;
                    this.listAssociations = data;
					this.originalListAssociations=data;
                },
                (err) => {
                    this.isLoading = false;
                    console.log(err);
                }
            );
    }
	// ============================================
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
		this.addFileForm.reset();
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}
	// ============================================================
	// Upload files
	// ============================================================
	fileChange(event) {
		this.uploadFiles = event.target.files;
		if (event.target.files.length > 0) {
			console.log("file size !! " + event.target.files.length);
			this.addFileForm.patchValue(this.uploadFiles);
		}
	}

	// ============================================================
	// field validation
	// ============================================================
	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.addForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	filtrerAssociations(event: any) {
		const filterValue = event.target.value.trim().toLocaleLowerCase();
		if (event.target.value != '') {
			console.log(event.target.value);
			this.listAssociations = this.originalListAssociations.filter(association =>
				association.nom.toLocaleLowerCase().includes(filterValue)
			);
		}
		if (event.target.value == '') {
			this.listAssociations =this.originalListAssociations;
		}

	}

	onDeleteFile2(id: number): void {
		this.allpjs2.splice(id, 1);
	}
	onDeleteFile(id: number): void {
		Swal.fire({
			title: this.translate.instant("PAGES.PROGRAMME.MESSAGE_SUPPRESSION"),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant("PAGES.PROGRAMME.OUI"),
			cancelButtonText: this.translate.instant("PAGES.PROGRAMME.NON"),
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.pieceJointeLogistique.deleteByIdFiles(id).subscribe(
					(res) => {
						Swal.fire({
							position: "center",
							icon: "success",
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500,
						});
						this.ngOnInit();
					},
					(err: HttpErrorResponse) => {
						console.log(err.status);
						console.log(err.headers);

						if (err.status == 500) {
							Swal.fire({
								position: "center",
								icon: "error",
								title: "impossible de supprimer cette enregistrement",
								showConfirmButton: false,
								timer: 1500,
							});
						}
					}
				);
			}
		});
	}
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PieceJointeLogistique/" + r);
	}
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
		this.allpjs.push(this.formPj);
	}
	allpjs2 = [];
	addFile() {
		for (let i = 0; i < this.allpjs.length; i++) {
			this.allpjs2.push(this.allpjs[i].selecetedFile[i]);
			$("#test").val(null);
			this.allpjs = [];
		}
	}
	FileName(file) {
		return this.filesutils.getFileName(file);
	}

	FileExtension(file) {
		return this.filesutils.getExtensionFile(file);
	}

	selectedOptionsORS: string[] = [];
	listOrientationStrategique = [];

	addItemOrientationStrategique(event: any) {
		this.columns = ["طباعة", "استقبال", "إطعام", "إقامة", "نقل", "عتاد الحفلات", "لوازم الرياضة"];

		if (event[0] == "ALL") {
			this.listOrientationStrategique = this.columns;

			this.selectedOptionsORS = this.columns.concat(event[0]);



			event[0] = [];
		} else if (event.length == this.columns.length) {
			this.listOrientationStrategique = [];

			this.selectedOptionsORS = [];
		} else {
			this.listOrientationStrategique = event;

			this.selectedOptionsORS = event;
		}
	}
}

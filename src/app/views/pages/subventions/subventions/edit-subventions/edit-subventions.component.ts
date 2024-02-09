import { environment } from "./../../../../../../environments/environment";
import { Component, OnInit } from "@angular/core";
import { finalize, first } from "rxjs/operators";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SubventionsService } from "./../../../utils/subventions.service";
import { Observable } from "rxjs";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { Location } from "@angular/common";
import { SpinnerService } from "../../../utils/spinner.service";
import { MatSelectChange } from "@angular/material";
import * as $ from "jquery";
import { PieceJointeSubventionService } from "../../../utils/piece-jointe-subvention.service";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { PieceJointeAutorisationService } from "../../../utils/piece-jointe-autorisation.service";
import { AssociationService } from "../../../utils/association.service";

@Component({
	selector: "kt-edit-subventions",
	templateUrl: "./edit-subventions.component.html",
	styleUrls: ["./edit-subventions.component.scss"],
})
export class EditSubventionsComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	files1: Observable<any>;

	formPj = { type: 0, selecetedFile: {} };
	allpjs = [];

	isVisibleNature: boolean;
	listArrondissements: any[];
	originalListAssociations :any[];
	id: any;
	loading = false;
	test: string;
	submitted = false;
	addForm: FormGroup;
	statuts: any;
	types: any;
	files: Observable<any>;
	start: boolean = true;
	public uploadFiles: Array<File>;
	addFileForm: FormGroup;
	repo: string = "PieceJointeSubvention";
	listAssociations: any[];
	valueAssociation: any = "";
	nomAssociation: string;

	constructor(private associationService: AssociationService, private pieceJointeSubventionService: PieceJointeSubventionService, private route: ActivatedRoute, private service: SubventionsService, private spinnerService: SpinnerService, private router: Router, private fb: FormBuilder, private notification: NotificationService, private translate: TranslateService, private filesutils: FilesUtilsService, private location: Location) {
		this.getData();
		this.getArrondissements();
	}
	selectedValue1: number
	selectedValue2: number
	ngOnInit() {
		this.filesutils.fileSizeDetector();

		this.addFileForm = this.fb.group({
			_file: [],
		});

		this.formBuilder();

		this.filesutils.fileSizeDetector();

		this.id = this.route.snapshot.params["id"];

		// var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner

		this.files = this.pieceJointeSubventionService.getByIdFiles(parseInt(this.id));
		this.pieceJointeSubventionService.getByIdFiles(parseInt(this.id)).subscribe((res) => {
			this.files1 = res;
		});
		this.service
			.getObjectById("/subvention/show/", this.id)

			.subscribe((data) => {
				console.log("Fetch data  : " + JSON.stringify(data, null, 2));
				//this.addForm.patchValue(data);
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
				this.valueAssociation = data.numeroLocalAssociation;
				this.nomAssociation = data.nomAssociation;
				this.addForm.patchValue({ ...data });
				if (data) {
					if (data.dateDepotDemande != null) this.addForm.controls["dateDepotDemande"].patchValue(new Date(data.dateDepotDemande).toISOString());
					if (data.date != null) this.addForm.controls["date"].patchValue(new Date(data.date).toISOString());
				}
				// if (data) {
				// 	;
				// 	this.addForm.controls["id"].patchValue(data.id);

				// this.addForm.patchValue({ ...data });
				if (data) {
					this.addForm.controls["id"].patchValue(data.id);

					this.addForm.controls["test"].patchValue(data.test);
					this.addForm.controls["numSubvention"].patchValue(data.numSubvention);
					this.addForm.controls["anneeSubvention"].patchValue(data.anneeSubvention);
					this.addForm.controls["nomAssociation"].patchValue(data.nomAssociation);
					this.addForm.controls["nomProjet"].patchValue(data.nomProjet);
					this.addForm.controls["champActivite"].patchValue(data.champActivite);
					this.addForm.controls["natureActivite"].patchValue(data.natureActivite);
					this.addForm.controls["cible"].patchValue(data.cible);
					this.addForm.controls["local"].patchValue(data.local);
					this.addForm.controls["durre"].patchValue(data.durre);
					if (data.date != null) this.addForm.controls["date"].patchValue(new Date(data.date).toISOString());

					this.addForm.controls["activite_de_rayonnement"].patchValue(data.activite_de_rayonnement);
					this.addForm.controls["montantDemande"].patchValue(data.montantDemande);
					if (data.dateDepotDemande != null) this.addForm.controls["dateDepotDemande"].patchValue(new Date(data.dateDepotDemande).toISOString());

					this.addForm.controls["montantSubvention"].patchValue(data.montantSubvention);
					this.addForm.controls["montantSubventionAutre"].patchValue(data.montantSubventionAutre);

					this.addForm.controls["suiveeExec"].patchValue(data.suiveeExec);
					this.addForm.controls["suiveeExec1"].patchValue(data.suiveeExec1);

					this.addForm.controls["arrondissement"].patchValue(data.arrondissement);
				}
			});
	}
	// ============================================
	localChanged(event: any) {
		console.log(event);
		console.log(event.value);
		if (event.value == "المقاطعة") {
			this.isVisibleNature = true;
			console.log("true");
		} else {
			this.isVisibleNature = false;
			console.log("false");
		}
	}

	selectedValueAssociation(p1: any, p2: any) {
		if (p1.nom && p2) {
			return p1.nom === p2;
		}

		return false;
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
	// ============================================
	typeChanged(event: MatSelectChange) {
		this.valueAssociation = event.value.prioriter;
		this.nomAssociation = event.value.nom;
	}
	// OnSubmit
	// ============================================
	onSubmit() {
		const controls = this.addForm.controls;
		/** check form */
		// if (this.addForm.invalid) {
		// 	Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
		// 	return;
		// }

		this.addSubvention();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addSubvention() {
		this.addForm.get("modificateurUser").setValue(window.localStorage.getItem("fullnameUser"));
		console.log(JSON.stringify(this.addForm.value));
		this.submitted = true;
		this.addForm.value.nomAssociation = this.nomAssociation;
		this.addForm.value.numeroLocalAssociation = this.valueAssociation;

		this.addForm.value.suiveeExec = this.suiviRapportsList;

		console.log(this.addForm.value);
		if (this.selectedValue1 === 1) {
			this.suiviRapportsList.push("LITTERALE")
		}
		if (this.selectedValue2 === 1) {
			this.suiviRapportsList.push("FINANCIERE");
			// this.addForm.value.suiveeExec1='Oui'
		}
		this.service
			.updateObject("/subvention/edit/", this.addForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					this.loading = true;
					var id = this.addForm.get("id").value;
					console.log("ID courrier: " + id);
					// upload file
					if (this.allpjs2.length > 0 && data != undefined) {
						for (var i = 0; i < this.allpjs2.length; i++) {
							this.pieceJointeSubventionService.nouvellepj(this.allpjs2, data.id, "PieceJointeSubvention").subscribe((data) => {
								console.log("C: " + JSON.stringify(data.id, null, 2));
							});
						}
					}

					this.location.back();
					// Notification
					this.notification.warn(this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED"));
				},
				(error) => {
					alert(error);
				}
			);
	}
	// Delete file from server
	// =================================================================
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
				this.pieceJointeSubventionService.deleteByIdFiles(id).subscribe(
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
	// ============================================
	// Charger les elements du fourmulaire
	// ============================================
	formBuilder() {
		let assocId = window.localStorage.getItem("assocId");
		let subvId = window.localStorage.getItem("subId");
		this.addForm = this.fb.group({
			test: [""],
			numSubvention: [""],
			anneeSubvention: [""],
			nomAssociation: [""],
			numeroLocalAssociation: [""],
			nomProjet: [""],
			champActivite: [""],
			natureActivite: [""],
			cible: [""],
			local: [""],
			durre: [""],
			//etatSubvention: ["",Validators.required],
			// added 30.07.20
			date: [""],
			activite_de_rayonnement: [""],
			montantDemande: [""],
			dateDepotDemande: [""],
			montantSubvention: [""],
			montantSubventionAutre: [""],
			suiveeExec: [""],
			suiveeExec1: [""],
			arrondissement: [""],
			id: [subvId],

			modificateurUser: [window.localStorage.getItem("fullnameUser")],
		});

		this.service.getObjectById("/subvention/show/", +subvId).subscribe((data) => {
			console.log(data);
			this.addForm.controls["statutProjet"].setValue(data.statutProjet);
			this.valueAssociation = data.numeroLocalAssociation;
			this.nomAssociation = data.nomAssociation;
			this.addForm.patchValue(data);

			//	this.addForm.controls['dateSubvention'].patchValue(new Date(data.dateSubvention).toISOString());
			this.addForm.controls["dateSortSubvention"].patchValue(new Date(data.dateSortSubvention).toISOString());
			this.addForm.controls["dateDepotDemande"].patchValue(new Date(data.dateDepotDemande).toISOString());
			this.addForm.controls["dateConseil"].patchValue(new Date(data.dateConseil).toISOString());
			// this.addForm.controls["numSubvention"].patchValue(new Date(data.numSubvention).toISOString());
		});
		setTimeout(() => {
			if (subvId != null) this.files = this.service.getByIdFiles(subvId, this.repo);
			this.start = false;
		}, 1000);
	}
	suiviExecution: string[] = ["Oui", "Non"];
	suiviRapportsList: any[] = [];
	onchangeRapportfinancier(event: any) {
		if (event == "Oui") {
			this.selectedValue2 = 1;
			this.suiviRapportsList.push("FINANCIERE");
		}
		if (event == "Non") {
			this.selectedValue2 = 2;
			if (this.suiviRapportsList.includes("FINANCIERE")) {
				const index = this.suiviRapportsList.indexOf("FINANCIERE");
				if (index !== -1) {
					this.suiviRapportsList.splice(index, 1);
				}
			}
		}
	}
	onchangeRapportLitteraire(event: any) {
		if (event == "Oui") {
			this.selectedValue1 = 1
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
	isLoading: boolean = true;
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

	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file) {
		return this.filesutils.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file) {
		return this.filesutils.getExtensionFile(file);
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PieceJointeSubvention/" + r);
	}

	// =================================================================

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
}

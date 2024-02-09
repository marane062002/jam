import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AssociationService } from "../../utils/association.service";
import { OrganisationService } from "../../organisation/organisation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { first, finalize } from "rxjs/operators";
import { NotificationService } from "../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { SpinnerService } from "../../utils/spinner.service";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { environment } from "./../../../../../environments/environment";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import * as $ from "jquery";

interface pays {
	id: number;
	libelle: string;
}

interface classements {
	libelle: string;
}

@Component({
	selector: "kt-edit-association",
	templateUrl: "./edit-association.component.html",
	styleUrls: ["./edit-association.component.scss"],
})
export class EditAssociationComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	id: any;
	loading = false;
	submitted = false;
	addForm: FormGroup;
	addFileForm1: FormGroup;
	addFileForm2: FormGroup;
	addFileForm3: FormGroup;
	addFileForm4: FormGroup;
	addFileForm5: FormGroup;
	addFileForm: FormGroup;

	public uploadFiles: Array<File>;

	public uploadFiles1: Array<File>;
	public uploadFiles2: Array<File>;
	public uploadFiles3: Array<File>;
	public uploadFiles4: Array<File>;
	public uploadFiles5: Array<File>;
	// Listes
	arrondissements: any;
	statuts: any;
	typeActivites: any;
	villes: any;
	annexesAdmin: any;
	// Liste des payes
	pays: pays[] = [
		{ id: 1, libelle: "المغرب" },
		{ id: 2, libelle: "بلد آخر" },
	];

	files: Observable<any>;
	files1: Observable<any>;

	allpjs = [];
	formPj = { type: 0, selecetedFile: {} };

	// Liste des classements
	classements: classements[] = [{ libelle: "A" }, { libelle: "B" }, { libelle: "C" }, { libelle: "D" }, { libelle: "E" }, { libelle: "F" }, { libelle: "G" }, { libelle: "H" }, { libelle: "I" }, { libelle: "J" }, { libelle: "K" }, { libelle: "L" }, { libelle: "M" }, { libelle: "N" }, { libelle: "O" }, { libelle: "P" }, { libelle: "Q" }, { libelle: "R" }, { libelle: "S" }, { libelle: "T" }, { libelle: "U" }, { libelle: "V" }, { libelle: "W" }, { libelle: "X" }, { libelle: "Y" }, { libelle: "Z" }];

	constructor(private filesUtil: FilesUtilsService, private filesutils: FilesUtilsService, private service: AssociationService, private service2: OrganisationService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private location: Location, private notification: NotificationService, private translate: TranslateService, private spinnerService: SpinnerService) {
		this.getData();
		this.formBuilder();
	}

	ngOnInit() {
		// ==================== show pj =========================================
		this.filesutils.fileSizeDetector();
		this.addFileForm = this.fb.group({
			_file: [],
		});
		// document.getElementById("autreAnnxe").style.display = "none";
		// document.getElementById("autreSpecialite").style.display = "none";
		this.fileBuilder();
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.id = this.route.snapshot.params["id"];
		this.files = this.service.getByIdFiles(parseInt(this.id));
		this.service.getByIdFiles(parseInt(this.id)).subscribe((res) => {
			this.files1 = res;
		});
		//=========================================================================

		document.getElementById("autreAnnxe").style.display = "none";
		document.getElementById("autreSpecialite").style.display = "none";
		this.fileBuilder2();
		this.fileBuilder();
		this.filesUtil.fileSizeDetector();

		// var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		// this.id = this.route.snapshot.params["id"];
		this.service
			.getObjectById("/association/showBy/", this.id)
			.pipe(
				finalize(() => {
					this.spinnerService.stop(spinnerRef); // stop spinner
				})
			)
			.subscribe((data) => {
				console.log("Fetch data  : " + JSON.stringify(data, null, 2));
				//this.addForm.patchValue(data);
				if (data) {
					this.addForm.controls["id"].patchValue(data.id);

					this.addForm.controls["prioriter"].patchValue(data.prioriter);
					this.addForm.controls["nom"].patchValue(data.specialisation);
					this.addForm.controls["isInterest"].patchValue(data.isInterest);
					this.addForm.controls["nom"].patchValue(data.nom);
					this.addForm.controls["dateCreation"].patchValue(data.dateCreation);
					this.addForm.controls["objectifs"].patchValue(data.objectifs);
					this.addForm.controls["nomPresident"].patchValue(data.nomPresident);
					this.addForm.controls["periodiciteBureau"].patchValue(data.periodiciteBureau);
					this.addForm.controls["observations"].patchValue(data.observations);

					this.addForm.controls["classification"].patchValue(data.classification);
					// this.addForm.controls['champActivite'].patchValue(data.champActivite);
					this.addForm.controls["adresseLocal"].patchValue(data.adresseLocal);
					this.addForm.controls["email"].patchValue(data.email);
					this.addForm.controls["fax"].patchValue(data.fax);
					this.addForm.controls["agenceBanquaire"].patchValue(data.agenceBanquaire);
					this.addForm.controls["numeroCompte"].patchValue(data.numeroCompte);
					this.addForm.controls["numDepot"].patchValue(data.numDepot);
					this.addForm.controls["natureFicheDepot"].patchValue(data.natureFicheDepot);
					this.addForm.controls["autreAnnexe"].patchValue(data.autreAnnexe);
					this.addForm.controls["natureFicheDepot"].patchValue(data.natureFicheDepot);
					this.addForm.controls["nbrMembreBureau"].patchValue(data.nbrMembreBureau);
					this.addForm.controls["nbrHomme"].patchValue(data.nbrHomme);
					this.addForm.controls["nbrFemme"].patchValue(data.nbrFemme);

					if (data.villeActivite != null) {
						this.addForm.controls["villeActivite"].patchValue(data.villeActivite);
					}

					if (data.communeActivite != 0) {
						this.addForm.controls["communeActivite"].patchValue(data.communeActivite);
					} else {
						this.addForm.get("communeActivite").disable();
					}

					if (data.statutAssociation != null) {
						this.addForm.controls["statutAssociation"].patchValue(data.statutAssociation);
					}

					if (data.typeActiviteAssociation != null) {
						this.addForm.controls["typeActiviteAssociation"].patchValue(data.typeActiviteAssociation);
					}
					if (data.annexeAdministratif != null) {
						if (data.annexeAdministratif != 31) document.getElementById("autreAnnxe").style.display = "none";
						this.addForm.controls["annexeAdministratif"].patchValue(data.annexeAdministratif);
					} else {
						this.addForm.get("annexeAdministratif").disable();
					}

					if (data.payeAssociation != null) this.addForm.controls["payeAssociation"].patchValue(data.payeAssociation);
					if (data.valorisation != null) this.addForm.controls["valorisation"].patchValue(data.valorisation);
					if (data.classement != null) this.addForm.controls["classement"].patchValue(data.classement);
					if (data.typeActiviteAssociation != null) this.addForm.controls["typeActiviteAssociation"].patchValue(data.typeActiviteAssociation);
					if (data.autreType != null) this.addForm.controls["autreType"].patchValue(data.autreType);

					// Association dates
					if (data.datePvChangementBureau != null) this.addForm.controls["datePvChangementBureau"].patchValue(new Date(data.datePvChangementBureau).toISOString());
					if (data.dateCreation != null) this.addForm.controls["dateCreation"].patchValue(new Date(data.dateCreation).toISOString());
					// Fiche de depot dates
					if (data.dateFicheDepot != null) this.addForm.controls["dateFicheDepot"].patchValue(new Date(data.dateFicheDepot).toISOString());
				}
			});

		// change events
		this.addForm.get("communeActivite").valueChanges.subscribe((value) => {
			if (value != null) {
				this.arrondissementChanged();
			}
		});

		// change events
		this.addForm.get("annexeAdministratif").valueChanges.subscribe((value) => {
			//console.log("value: " + value.id)
			if (value != null) {
				if (value.id == 31) {
					document.getElementById("autreAnnxe").style.display = "inline";
				} else {
					document.getElementById("autreAnnxe").style.display = "none";
					this.addForm.get("autreAnnexe").setValue(null);
				}
			}
		});

		// change events
		this.addForm.get("typeActiviteAssociation").valueChanges.subscribe((value) => {
			//console.log("value: " + value.id)
			if (value.id != null) {
				if (value.id == 6) {
					document.getElementById("autreSpecialite").style.display = "inline";
				} else {
					document.getElementById("autreSpecialite").style.display = "none";
					this.addForm.get("autreSpecialite").setValue(null);
				}
			} else {
				document.getElementById("autreSpecialite").style.display = "none";
			}
		});
	}

	compareVille(p1: any, p2: any): boolean {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	campareWithId(p1: any, p2: any): boolean {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		//console.log("Association :: " + JSON.stringify(this.addForm.value,null, 2))
		const controls = this.addForm.controls;
		/** check form */
		if (this.addForm.invalid) {
			Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
			return;
		}

		this.loading = true;

		this.addAssociation();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addAssociation() {
		this.checkList();

		console.log("Submit : " + JSON.stringify(this.addForm.value, null, 2));

		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.service
			.updateObject("/association/edit/", this.addForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					this.router.navigate(["associations/list-association"]);
					this.notification.warn(this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED"));
					window.localStorage.removeItem("associationId");
					window.localStorage.setItem("associationId", data.id);

					// upload files to alfresco GED
					//console.log("ID DE COURRIER -data: " +JSON.stringify(data) +	" OU BIEN -data.id: " +data);
					// if (this.uploadFiles)
					// 	this.service.updloadFile(this.uploadFiles, data.id).subscribe(
					// 		(res) => console.log("File inserted " + JSON.stringify(res)),
					// 		(err) => console.log("File not inserted " + JSON.stringify(err))
					// 	);
					if (this.allpjs2.length > 0 && data.id != undefined) {
						for (var i = 0; i < this.allpjs2.length; i++) {
							this.service.updloadFile(this.allpjs2, data.id).subscribe((data) => {
								console.log("C: " + JSON.stringify(data.id, null, 2));
							});
						}
					}

					this.router.navigate(["associations/list-association"]);
					this.notification.warn(this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"));
				},
				(error) => {
					alert(error);
				}
			);
	}

	checkList() {
		if (this.addForm.get("villeActivite").value == null || this.addForm.get("villeActivite").value.id == "" || this.addForm.get("villeActivite").value.id == null) this.addForm.removeControl("villeActivite");

		if (this.addForm.get("statutAssociation").value == null || this.addForm.get("statutAssociation").value.id == "" || this.addForm.get("statutAssociation").value.id == null) this.addForm.removeControl("statutAssociation");

		if (this.addForm.get("typeActiviteAssociation").value == null || this.addForm.get("typeActiviteAssociation").value.id == "" || this.addForm.get("typeActiviteAssociation").value.id == null) this.addForm.removeControl("typeActiviteAssociation");

		//	if (this.addForm.get("annexeAdministratif").value.id == "" || this.addForm.get("annexeAdministratif").value.id == null)
		//	this.addForm.removeControl("annexeAdministratif");
		//
	}
	// ============================================
	// Charger les elements du fourmulaire
	// ============================================
	formBuilder() {
		this.addForm = this.fb.group({
			id: [],
			prioriter: [""],
			nom: ["", Validators.required],
			communeActivite: [""], // Arrondissement
			dateCreation: [""],
			objectifs: [""],
			villeActivite: [""],
			nomPresident: [""],
			periodiciteBureau: [""],
			datePvChangementBureau: [""],
			observations: [""],
			statutAssociation: [null], // statutAssociation: [{"id":1}],
			typeActiviteAssociation: [null], // Autres typeActiviteAssociation: [{"id":8}]
			autreType: [null],
			payeAssociation: [null],
			classification: [""],
			// champActivite: [""],
			adresseLocal: [""],
			email: [""],
			fax: [""],
			// specialisation:[""],
			nbrHomme: [""],
			nbrFemme: [""],
			nbrMembreBureau: [""],
			agenceBanquaire: [""],
			numeroCompte: [""],
			valorisation: [null],
			// classement: [null],
			// **** information du fiche de dépot ****
			numDepot: [""],
			natureFicheDepot: [""],
			annexeAdministratif: [null],
			autreAnnexe: [""],
			dateFicheDepot: [""],
			isInterest: [false],
			modificateurUser: [window.localStorage.getItem("fullnameUser")],
		});
	}
	// ============================================
	// Files upload
	// ============================================
	fileBuilder() {
		this.addFileForm1 = this.fb.group({
			statut_file: [],
		});
		this.addFileForm2 = this.fb.group({
			pvConstitution_file: [],
		});
		this.addFileForm3 = this.fb.group({
			dernierPv_file: [],
		});
		this.addFileForm4 = this.fb.group({
			recipisse_file: [],
		});
		this.addFileForm5 = this.fb.group({
			membreBureau_file: [],
		});
	}
	// ============================================
	fileBuilder2() {
		this.addFileForm = this.fb.group({
			_file: [],
		});
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.statuts = data[0];
				this.typeActivites = data[1];
				this.villes = data[2];
				//this.annexesAdmin = data[3];
				//console.log(data[1]);
			},
			(err) => {
				console.log(err);
			}
		);

		this.service2.getRessource("/arrondissements/index").subscribe((data) => {
			(this.arrondissements = data), console.log(data);
		});
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
		this.router.navigate(["associations/list-association"]);
	}
	// ============================================
	// Upload file event fileChangePjStatut
	// ============================================
	fileChangePjStatut(event) {
		this.uploadFiles1 = event.target.files;
		if (event.target.files.length > 0) {
			console.log("target statut : " + event.target.files.length);
			const file = event.target.files[0];
			this.addFileForm1.patchValue(this.uploadFiles1);
			console.log("OK get pj statut");
		}
	}
	// Upload files
	// ============================================================
	fileChange(event) {
		this.uploadFiles = event.target.files;
		if (event.target.files.length > 0) {
			console.log("file size !! " + event.target.files.length);
			this.addFileForm.patchValue(this.uploadFiles);
		}
	}
	// ============================================
	// Upload file event fileChangePjPvConstitution
	// ============================================
	fileChangePjPvConstitution(event) {
		this.uploadFiles2 = event.target.files;
		if (event.target.files.length > 0) {
			console.log("target constitution: " + event.target.files.length);
			const file = event.target.files[0];
			this.addFileForm2.patchValue(this.uploadFiles2);
			console.log("OK get pj pv constitution");
		}
	}
	// ============================================
	// Upload file event fileChangePjDernierPv
	// ============================================
	fileChangePjDernierPv(event) {
		this.uploadFiles3 = event.target.files;
		if (event.target.files.length > 0) {
			console.log("target dernier pv: " + event.target.files.length);
			const file = event.target.files[0];
			this.addFileForm3.patchValue(this.uploadFiles3);
			console.log("OK get pj dernier pv");
		}
	}
	// ============================================
	// Upload file event fileChangePjRecipisse
	// ============================================
	fileChangePjRecipisse(event) {
		this.uploadFiles4 = event.target.files;
		if (event.target.files.length > 0) {
			console.log("target recipisse: " + event.target.files.length);
			const file = event.target.files[0];
			this.addFileForm4.patchValue(this.uploadFiles4);
			console.log("OK get pj recipisse");
		}
	}
	// ============================================
	// Upload file event fileChangePjMembreBureau
	// ============================================
	fileChangePjMembreBureau(event) {
		this.uploadFiles5 = event.target.files;
		if (event.target.files.length > 0) {
			console.log("target membre bureau: " + event.target.files.length);
			const file = event.target.files[0];
			this.addFileForm5.patchValue(this.uploadFiles5);
			console.log("OK get pj membre bureau :");
		}
	}
	// ============================================
	// paysChanged events
	// ============================================
	paysChanged() {
		let pays = this.addForm.get("payeAssociation").value;
		if (pays != null && pays == "المغرب") {
			this.addForm.get("villeActivite").enable();
		} else if (pays != null && pays == "بلد آخر") {
			this.addForm.get("villeActivite").disable();
			this.addForm.get("villeActivite").reset();
			this.addForm.get("communeActivite").disable();
			this.addForm.get("communeActivite").reset();
			this.addForm.get("annexeAdministratif").disable();
			this.addForm.get("annexeAdministratif").reset();
			this.addForm.get("autreAnnexe").reset();
		} else {
			this.addForm.get("villeActivite").disable();
			this.addForm.get("villeActivite").reset();
			this.addForm.get("communeActivite").disable();
			this.addForm.get("communeActivite").reset();
			this.addForm.get("annexeAdministratif").disable();
			this.addForm.get("annexeAdministratif").reset();
			this.addForm.get("autreAnnexe").reset();
		}
	}
	// ============================================
	// annexeChanged events
	// ============================================
	annexeChanged() {
		let annexeAdm = this.addForm.get("annexeAdministratif").value;
		console.log("Id annexe: " + annexeAdm.id);
		this.addForm.get("autreAnnxe").reset();
		if (annexeAdm.id == 31) {
			document.getElementById("autreAnnxe").style.display = "inline";
			this.addForm.get("autreAnnexe").setValue(null);
		} else {
			document.getElementById("autreAnnxe").style.display = "none";
			this.addForm.get("autreAnnexe").setValue(null);
		}
	}
	// ============================================
	// type changed events
	// ============================================
	typeChanged() {
		let type = this.addForm.get("typeActiviteAssociation").value;
		console.log("type : " + JSON.stringify(type));
		if (type.id != null) {
			if (type.id == 6) {
				document.getElementById("autreSpecialite").style.display = "inline";
				this.addForm.get("autreType").setValue(null);
			} else {
				document.getElementById("autreSpecialite").style.display = "none";
				this.addForm.get("autreType").setValue(null);
			}
		} else {
			document.getElementById("autreSpecialite").style.display = "none";
		}
	}
	// ============================================
	// villeChanged events
	// ============================================
	villeChanged(event: any) {
		let ville = this.addForm.get("villeActivite").value;
		document.getElementById("autreAnnxe").style.display = "none";
		if (ville.id == "1") {
			this.addForm.get("communeActivite").enable();
			this.addForm.get("communeActivite").reset();
			this.addForm.get("annexeAdministratif").enable();
			this.addForm.get("annexeAdministratif").reset();
			this.addForm.get("autreAnnexe").reset();
			// this.addForm.get("communeActivite").setValidators(Validators.required);
			// this.addForm.get("annexeAdministratif").setValidators(Validators.required);
		} else {
			this.addForm.get("communeActivite").disable();
			this.addForm.get("communeActivite").reset();
			this.addForm.get("annexeAdministratif").disable();
			this.addForm.get("annexeAdministratif").reset();
			this.addForm.get("autreAnnexe").reset();
			// this.addForm.get("communeActivite").setValidators(null);
			// this.addForm.get("annexeAdministratif").setValidators(null);
		}
		// this.addForm.get('communeActivite').updateValueAndValidity();
		// this.addForm.get('annexeAdministratif').updateValueAndValidity();
	}
	// ============================================
	// ArrondissementChanged events
	// ============================================
	arrondissementChanged() {
		document.getElementById("autreAnnxe").style.display = "none";
		this.addForm.get("annexeAdministratif").reset();
		let arr = this.addForm.get("communeActivite").value;
		this.service.getAllObjectListById("/annexeAdministratif/arrondissement/", arr).subscribe((data) => {
			(this.annexesAdmin = data), console.log(data);
		});
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
				this.service.deleteByIdFiles(id).subscribe(
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
		window.open(environment.API_ALFRESCO_URL + "/PjAssociation/" + r);
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
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { finalize, first } from "rxjs/operators";
import { NotificationService } from "../../shared/notification.service";
import { AcquisitionService } from "../../utils/acquisition.service";
import { SpinnerService } from "../../utils/spinner.service";
import { Location } from "@angular/common";
import { MatSelectChange } from "@angular/material";
import * as $ from "jquery";
import { PieceJointeAutorisationService } from "../../utils/piece-jointe-autorisation.service";
import { PieceJointeSubventionService } from "../../utils/piece-jointe-subvention.service";
import Swal from "sweetalert2";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { Observable } from "rxjs";
import { environment } from "./../../../../../environments/environment";
import { HttpErrorResponse } from "@angular/common/http";

interface pays {
	id: number;
	libelle: string;
}

interface classements {
	libelle: string;
}

@Component({
	selector: "kt-edit-acquisition",
	templateUrl: "./edit-acquisition.component.html",
	styleUrls: ["./edit-acquisition.component.scss"],
})
export class EditAcquisitionComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================

	files: Observable<any>;
	files1: Observable<any>;

	allpjs = [];
	formPj = { type: 0, selecetedFile: {} };

	isVisibleAssociation: boolean;
	isVisiblemorale: boolean;
	isVisiblephysique: boolean;
	isVisibleetablissement: boolean;
	isVisible: any;
	isSelected: boolean = true;
	id: any;
	isVisibleNature: boolean;
	isVisibleNature2: boolean;
	listArrondissements: any[];
	loading = false;
	submitted = false;
	addForm: FormGroup;
	addFileForm1: FormGroup;
	addFileForm2: FormGroup;
	addFileForm3: FormGroup;
	addFileForm4: FormGroup;
	addFileForm5: FormGroup;
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

	addFileForm;
	// Liste des payes
	pays: pays[] = [
		{ id: 1, libelle: "المغرب" },
		{ id: 2, libelle: "بلد آخر" },
	];

	// Liste des classements
	classements: classements[] = [{ libelle: "A" }, { libelle: "B" }, { libelle: "C" }, { libelle: "D" }, { libelle: "E" }, { libelle: "F" }, { libelle: "G" }, { libelle: "H" }, { libelle: "I" }, { libelle: "J" }, { libelle: "K" }, { libelle: "L" }, { libelle: "M" }, { libelle: "N" }, { libelle: "O" }, { libelle: "P" }, { libelle: "Q" }, { libelle: "R" }, { libelle: "S" }, { libelle: "T" }, { libelle: "U" }, { libelle: "V" }, { libelle: "W" }, { libelle: "X" }, { libelle: "Y" }, { libelle: "Z" }];

	constructor(private pieceJointeAutorisationService: PieceJointeAutorisationService, private filesutils: FilesUtilsService, private pieceJointeAutorisation: PieceJointeAutorisationService, private service: AcquisitionService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private location: Location, private notification: NotificationService, private translate: TranslateService, private spinnerService: SpinnerService) {
		this.getData();
		this.formBuilder();
		this.getArrondissements();
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
	// ============================================
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
	beneficierChanged(event: any) {
		console.log(event);
		console.log(event.value);
		if (event.value == "0") {
			this.isVisibleAssociation = true;
			console.log(this.isVisibleAssociation);
		} else {
			this.isVisibleAssociation = false;
		}

		if (event.value == "1") {
			this.isVisiblemorale = true;
			console.log("isVisiblemorale");
		} else {
			this.isVisiblemorale = false;
		}
		if (event.value == "2") {
			this.isVisiblephysique = true;
			console.log("isVisiblephysique");
		} else {
			this.isVisiblephysique = false;
		}
		if (event.value == "3") {
			this.isVisibleetablissement = true;
			console.log("isVisibleetablissement");
		} else {
			this.isVisibleetablissement = false;
		}
	}

	ngOnInit() {
		this.filesutils.fileSizeDetector();
		this.addFileForm = this.fb.group({
			_file: [],
		});
		// document.getElementById("autreAnnxe").style.display = "none";
		// document.getElementById("autreSpecialite").style.display = "none";
		this.fileBuilder();
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.id = this.route.snapshot.params["id"];

		this.files = this.pieceJointeAutorisationService.getByIdFiles(parseInt(this.id));
		this.pieceJointeAutorisationService.getByIdFiles(parseInt(this.id)).subscribe((res) => {
			this.files1 = res;
		});

		this.service
			.getObjectById("/acquisition/show/", this.id)
			.pipe(
				finalize(() => {
					this.spinnerService.stop(spinnerRef); // stop spinner
				})
			)
			.subscribe((data) => {
				console.log("Fetch data  : " + JSON.stringify(data, null, 2));
				//this.addForm.patchValue(data);
				if(data.arrondissement!="" && data.arrondissement!=null){
					this.isVisibleNature=true;
					this.isVisibleNature2=false;
					this.addForm.value.arrondissement=data.arrondissement;
				}
				if(data.nomEspace!="" && data.nomEspace!=null){
					this.isVisibleNature2=true;
					this.isVisibleNature=false;
				}
				this.addForm.patchValue({ ...data });
				if(data.paiement==true){
					this.isVisible=1;
				}
				if(data.paiement==false){
					this.isVisible=0;
				}
				// if (data) {
				// 	;
				// 	this.addForm.controls["id"].patchValue(data.id);

				// 	this.addForm.controls["test"].patchValue(data.test);
				// 	this.addForm.controls["numAcquisition"].patchValue(data.numAcquisition);
				// 	this.addForm.controls["nomAssociation"].patchValue(data.nomAssociation);
				// 	this.addForm.controls["local"].patchValue(data.local);
				// 	this.addForm.controls["nomProjet"].patchValue(data.nomProjet);
				// 	this.addForm.controls["champActivite"].patchValue(data.champActivite);
				// 	this.addForm.controls["natureActivite"].patchValue(data.natureActivite);
				// 	this.addForm.controls["cible"].patchValue(data.cible);
				// 	this.addForm.controls["activite_de_rayonnement"].patchValue(data.activite_de_rayonnement);
				// 	// this.addForm.controls['champActivite'].patchValue(data.champActivite);
				// 	this.addForm.controls["durre"].patchValue(data.durre);
				// 	this.addForm.controls["paiement"].patchValue(data.paiement);
				// 	this.addForm.controls["montantDemande"].patchValue(data.montantDemande);
				// }
			});
	}
	valueAssociation: any = "";
	nomAssociation: string;

	selectedValueArrondissement(p1: any, p2: any) {
		if (p1.libelle && p2) {
			return p1.libelle === p2;
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

		this.addAcquisition();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addAcquisition() {
		this.addForm.value.nomAssociation = this.nomAssociation;

		console.log("Submit : " + JSON.stringify(this.addForm.value, null, 2));

		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		if(this.addForm.value.paiement==1){
			this.addForm.value.montantDemande=null;
		}
		if(this.isVisibleNature==false){
			this.addForm.value.arrondissement=""
		}
		if(this.isVisibleNature2==false){
			this.addForm.value.nomEspace=""
		}
		if(this.addForm.value.arrondissement!=null){
		this.addForm.value.arrondissement=this.addForm.value.arrondissement.libelle;
		}
		this.service
			.updateObject("/acquisition/edit/", this.addForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					if (this.allpjs2.length > 0 && data.id != undefined) {
						for (var i = 0; i < this.allpjs2.length; i++) {
							this.pieceJointeAutorisation.nouvellepj(this.allpjs2, data.id, "PieceJointeAcquisition").subscribe((data) => {
								console.log("C: " + JSON.stringify(data.id, null, 2));
							});
						}
					}
					this.router.navigate(["acquisition/list-acquisition"]);
					this.notification.warn(this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED"));
					window.localStorage.removeItem("associationId");
					window.localStorage.setItem("associationId", data.toString());
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
			numAcquisition: [""],
			nomAssociation: [""],
			local: [""],
			nomProjet: [""],
			champActivite: [""],
			natureActivite: [""],
			cible: [""],
			activite_de_rayonnement: [""],
			duree: [""],
			paiement: [""],
			montantDemande: [""],
			arrondissement: [""],
			nomEspace:[""],
			modificateurUser: [window.localStorage.getItem("fullnameUser")],
			id: [""],

			cin: [""],
			prenom: [""],
			nom: [""],
			beneficier: [""],
			raisonsociale: [""],
			rc: [""],
			etablissement: [""],
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
	// Charger les liste externe
	// ============================================
	disabled: boolean = true;
	listAssociations: any[];
	getData() {
		this.disabled = false;
		this.service.getAssociation().subscribe(
			(data) => {
				this.listAssociations = data;
			},
			(err) => {
				console.log(err);
			}
		);
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
	}
	// ============================================
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.router.navigate(["acquisition/list-acquisition"]);
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
	typeChanged(event: MatSelectChange) {
		this.valueAssociation = event.value.prioriter;
		this.nomAssociation = event.value.nom;
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
				this.pieceJointeAutorisation.deleteByIdFiles(id).subscribe(
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
		window.open(environment.API_ALFRESCO_URL + "/PieceJointeAcquisition/" + r);
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

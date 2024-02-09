import { environment } from './../../../../../../environments/environment';
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { first } from "rxjs/operators";
import { FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { OrganisationService } from "../../../organisation/organisation.service";
import { MatRadioChange, MatRadioButton } from "@angular/material";
import { ActivitesService } from '../../../utils/activites.service';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { FilesUtilsService } from '../../../utils/files-utils.service';

@Component({
	selector: "kt-edit-activites-commune",
	templateUrl: "./edit-activites-commune.component.html",
	styleUrls: ["./edit-activites-commune.component.scss"]
})
export class EditActivitesCommuneComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	test: string;
	submitted = false;
	editForm: FormGroup;
	statuts: any;
	types: any;
	arrondissements: any;
	associations: any;
	files : Observable<any>;
	start:boolean=true;
	public uploadFiles: Array<File>;
	addFileForm: FormGroup;
	institutions: any;
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() change: EventEmitter<MatRadioChange>;
	constructor(
		private service: ActivitesService,
		private service2: OrganisationService,
		private router: Router,
		private fb: FormBuilder,
		private notification: NotificationService,
		private translate: TranslateService,
		private fileUtils:FilesUtilsService,
	) {
		this.getData();
	}

	ngOnInit() {
		this.formBuilder();
		this.fileUtils.fileSizeDetector();

		this.addFileForm = this.fb.group({
			_file: [],
		});
	}
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		const controls = this.editForm.controls;
		/** check form */
		if (this.editForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;
		this.editActivities();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	editActivities() {
		let assocId = window.localStorage.getItem("assocId");

		this.submitted = true;
		if (this.editForm.invalid) {
			return;
		}
		console.log('id personne morale: '+ this.editForm.get(['pmActiv','id']).value)
		console.log(" B4: " + JSON.stringify(this.editForm.value));
		if(this.editForm.get(['pmActiv','id']).value == null){
			delete this.editForm.value.pmActiv;
			console.log(" AFTR: " + JSON.stringify(this.editForm.value));
		}

		this.service
			.updateObject("/activite/edit/", this.editForm.value)
			.pipe(first())
			.subscribe(
				data => {
					this.loading = true;
					var id = this.editForm.get('id').value;
					// upload file
					if (this.uploadFiles)
						this.service.updloadFile(this.uploadFiles, id).subscribe(
					(res) =>
						console.log("File inserted " + JSON.stringify(res)),
					(err) =>
						console.log("File not inserted " + JSON.stringify(err))
					);

					this.router.navigate(["activites/list-activites-commune"]);

					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED")
					);
				},
				error => {
					alert(error);
				}
			);
	}
	// ============================================
	// Charger les elements du fourmulaire
	// ============================================
	formBuilder() {
		let activId = window.localStorage.getItem("activiteId");
		this.editForm = this.fb.group({
			id: [activId],
			dateActivite: [""],
			//lieu: [""],
			populationImpactee: [""],
			//idCommune: [""],
			objet: [""],
			numAutorisation: [""],
			note: [""],
			idAssociation: [""],
			typeActivites: this.fb.group({
				id: []
			}),
			pmActiv: this.fb.group({
				id: []
			}),
			enPartenariat:[""],
			arrondissements: [],
			partenariat:[""]
		});

		this.service
			.getObjectById("/activite/showBy/", +activId)
			.subscribe(data => {
				console.log("Arrondissement! "+ JSON.stringify(data.arrondissements))
				//this.editForm.patchValue(data);
				this.editForm.controls['dateActivite'].patchValue(new Date(data.dateActivite).toISOString());
				this.editForm.controls['populationImpactee'].patchValue(data.populationImpactee);
				this.editForm.controls['objet'].patchValue(data.objet);
				this.editForm.controls['numAutorisation'].patchValue(data.numAutorisation);
				this.editForm.controls['note'].patchValue(data.note);
				this.editForm.controls['idAssociation'].patchValue(data.idAssociation);
				this.editForm.controls['typeActivites'].patchValue(data.typeActivites);
				this.editForm.controls['enPartenariat'].patchValue(data.enPartenariat);
				this.editForm.controls['arrondissements'].patchValue(data.arrondissements);
				this.editForm.controls['partenariat'].patchValue(data.partenariat);
				if (data.pmActiv != null){
					document.getElementById("institution").style.display = "inline";
					this.editForm.controls['pmActiv'].patchValue(data.pmActiv);
				}else {
					document.getElementById("institution").style.display = "none";
				}

			});


			// change events
			this.editForm.get('partenariat').valueChanges.subscribe(
				value=> {
					console.log("partenariat value: "+ value)
					if (value == null || value == ""){
						document.getElementById("association").style.display = "none";
						document.getElementById("institution").style.display = "none";
						document.getElementById("enPartenariat").style.display = "none";
					}else if(value != null || value != ""){
						if(value == true){
							document.getElementById("enPartenariat").style.display = "inline";
						}else{
							document.getElementById("enPartenariat").style.display = "none";
						}

					}

				}
			 );

			 // change events
			this.editForm.get('enPartenariat').valueChanges.subscribe(
				value=> {
					console.log("enPartenariat value: "+ value)
					if (value == '' || value == null){
						document.getElementById("association").style.display = "none";
						document.getElementById("institution").style.display = "none";
					}else if(value != ''){
						if(value == "institution"){
							document.getElementById("association").style.display = "none";
							document.getElementById("institution").style.display = "inline";
						}else{
							document.getElementById("association").style.display = "inline";
							document.getElementById("institution").style.display = "none";
						}

					}

				}
			 );

			// import file from server
			setTimeout(() => {
				if (activId!=null)
				this.files = this.service.getByIdFiles(activId);
				this.start = false;
			}, 1000);
	}
	// getter

	public getAssoc() {return this.editForm.get("idAssociation");}
	public getInstit() {return this.editForm.get("pmActiv");}
	get name(): AbstractControl { // name property
		return this.editForm.get('idAssociation')
	 }

	 compare(val1, val2) {
		if(val1 && val2)
		return val1.id === val2.id;

	  }
	// ============================================================
	// get file name
	// ============================================================
	FileName(file){
		return this.fileUtils.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file){
		return this.fileUtils.getExtensionFile(file);
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r=e.substring(0,e.length-4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjActivite/"+r);
	}
	// =================================================================
	// Delete file from server
	// =================================================================
	onDeleteFile(id:any) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
		console.log("Delete file ID: " + id);
		this.service
			.deletefiles("/PjActivite/", id)
			.subscribe(data => {
				console.log("File courrier deleted : " + id);
			});
		// Refresh
		let activiteId = window.localStorage.getItem("activiteId");
		if (!activiteId) {
			alert("Invalid action.");
			this.back();
			return;
		}
		// reset object
		this.files = null;
		// start progress bar
		this.start = true;

		// Notification
		this.notification.warn(
			this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
		);
		// fill datatable
		setTimeout(() => {
			if (activiteId!=null)
			this.files = this.service.getByIdFiles(activiteId);
			this.start = false;
		}, 1000);
		}
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
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.service.getData().subscribe(
			data => {
				this.types = data[0];
				this.associations = data[1];
				this.institutions = data[2];
				this.arrondissements = data[3];
			},
			err => {
				console.log(err);
			}
		);
		/*
		this.service2.getRessource("/arrondissements/index").subscribe((data) => {
			(this.arrondissements = data), console.log(data);
		});
		*/
	}

	// =====================================
	// back to list
	// =====================================
	back() {
		this.router.navigate(["activites/list-activites-commune"]);
	}
	// ============================================
	// OnChange mode d'aquisition -> marche / BC
	// ============================================
	selectionChanged1() {
			document.getElementById("association").style.display = "none";
			document.getElementById("institution").style.display = "none";
			this.editForm.get('enPartenariat').reset();
			this.editForm.get('idAssociation').reset();
			this.editForm.get('pmActiv').reset();
		let part = this.editForm.get('partenariat').value
		if (part == true) {
			document.getElementById("enPartenariat").style.display = "inline";
		} else if(part == false) {
			document.getElementById("enPartenariat").style.display = "none";

		}
		//this.onChangeVal(event1);
	}

	selectionChanged2(event2: MatRadioChange) {
		if (event2.value == "association") {
			this.editForm.get('idAssociation').reset();
			this.editForm.get('pmActiv').reset();
			document.getElementById("association").style.display = "inline";
			document.getElementById("institution").style.display = "none";

		} else if(event2.value == "institution"){
			this.editForm.get('idAssociation').reset();
			this.editForm.get('pmActiv').reset();
			document.getElementById("institution").style.display = "inline";
			document.getElementById("association").style.display = "none";

		}
		this.onChangeVal(event2);
	}
	// test radio button
	onChangeVal(mrChange: MatRadioChange) {
		console.log("change value" + mrChange.value);
		let mrButton: MatRadioButton = mrChange.source;
		console.log(mrButton.name);
		console.log(mrButton.checked);
		console.log(mrButton.inputId);
	}

	// ControlValueAccessor Implementation
	onChange: any = () => {};
	onTouched: any = () => {};
}

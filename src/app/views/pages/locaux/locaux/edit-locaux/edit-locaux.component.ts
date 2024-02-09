import { environment } from './../../../../../../environments/environment';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LaucauxService } from '../../../utils/locaux.service';
import { OrganisationService } from '../../../organisation/organisation.service';
import { Router } from '@angular/router';
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'kt-edit-locaux',
  templateUrl: './edit-locaux.component.html',
  styleUrls: ['./edit-locaux.component.scss']
})
export class EditLocauxComponent implements OnInit {

	// ============================================
	// Declarations
	// ============================================
	loading = false;
	test: string;
	submitted = false;
	editForm: FormGroup;
	addFileForm: FormGroup;
	statuts: any;
	types: any;
	arrondissements: any;
	public uploadFiles: Array<File>;
	files : Observable<any>;
	start:boolean=true;
	// ============================================
	//
	// ============================================
	constructor(
		private service: LaucauxService,
		private service2: OrganisationService,
		private router: Router,
		private fb: FormBuilder,
		//private location: Location,
		private filesUtil: FilesUtilsService,
		private notification: NotificationService,
		private translate: TranslateService,
	) {
		this.getData();
	}
	// ============================================
	//
	// ============================================
	ngOnInit() {
		this.formBuilder();
		this.addFileForm = this.fb.group({
			_file: [],
		});

		this.filesUtil.fileSizeDetector();
	}
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		const controls = this.editForm.controls;
		/** check form */
		if (this.editForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.editLocaux();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	editLocaux() {
		let assocId = window.localStorage.getItem("assocId");
		console.log(JSON.stringify(this.editForm.value));
		this.submitted = true;
		if (this.editForm.invalid) {
			return;
		}
		this.service.updateObject("/locaux/edit/", this.editForm.value)
		.pipe(first())
		.subscribe(
			(data) => {
				this.loading = true;
					var id = this.editForm.get('id').value;
					console.log("ID courrier: " + id);
					// upload file
					if (this.uploadFiles)
						this.service.updloadFile(this.uploadFiles, id).subscribe(
					(res) =>
						console.log("File inserted " + JSON.stringify(res)),
					(err) =>
						console.log("File not inserted " + JSON.stringify(err))
					);

					this.router.navigate([
						"associations/show-association/" + assocId,
					]);

					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED")
					);

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
		let localId = window.localStorage.getItem("localId");
		this.editForm = this.fb.group({
			id: [localId],
			nomLocal: ["", Validators.required],
			dateDemrrageGestion: ["", Validators.required],
			dateFinGestion: ["", Validators.required],
			adresseLocal: ["", Validators.required],
			idCommune: ["", Validators.required],
			localisation: ["", Validators.required],
			duree: ["", Validators.required],
			idAssociation: [assocId],
			statutGestion: ["", Validators.required],// type et statut Edit 
			typeLocal: ["", Validators.required],
		});

		this.service
			.getObjectById("/locaux/showBy/", +localId)
			.subscribe(data => {
				//console.log("Liste: " + JSON.stringify(data,null,4));
				console.log("haa "+ data.typeLocal)
				this.editForm.patchValue(data);
				this.editForm.controls['dateDemrrageGestion'].patchValue(new Date(data.dateDemrrageGestion).toISOString());
				this.editForm.controls['dateFinGestion'].patchValue(new Date(data.dateFinGestion).toISOString());
				//this.editForm.controls['typeLocal'].patchValue(data.typeLocal);
			});

			setTimeout(() => {
				if (localId!=null)
				this.files = this.service.getByIdFiles(localId);
				this.start = false;
			}, 1000);
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.types = data[0];
				this.statuts = data[1];
				console.log(data[0]);
			},
			(err) => {
				console.log(err);
			}
		);
		this.service2.getRessource("/arrondissements/index").subscribe((data) => {
			(this.arrondissements = data), console.log(data);
		});
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		//this.location.back();
		let assocId = window.localStorage.getItem("assocId");
		this.router.navigate([
			"../../../associations/show-association/" + assocId,
		]);
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
		const control = this.editForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
// ============================================================
	// get file name
	// ============================================================
	FileName(file){
		return this.filesUtil.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file){
		return this.filesUtil.getExtensionFile(file);
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r=e.substring(0,e.length-4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjLocaux/"+r);
	}
	// =================================================================
	// Delete file from server
	// =================================================================
	onDeleteFile(id:any) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
		console.log("Delete file ID: " + id);
		this.service
			.deletefiles("/PjLocaux/", id)
			.subscribe(data => {
				console.log("File courrier deleted : " + id);
			});
		// Refresh
		let localId = window.localStorage.getItem("localId");
		if (!localId) {
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
			if (localId!=null)
			this.files = this.service.getByIdFiles(localId);
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
}

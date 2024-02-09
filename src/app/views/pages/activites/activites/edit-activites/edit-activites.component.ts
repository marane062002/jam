import { environment } from './../../../../../../environments/environment';
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { OrganisationService } from "../../../organisation/organisation.service";
import { first } from "rxjs/operators";
import { ActivitesService } from '../../../utils/activites.service';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { FilesUtilsService } from '../../../utils/files-utils.service';

@Component({
  selector: 'kt-edit-activites',
  templateUrl: './edit-activites.component.html',
  styleUrls: ['./edit-activites.component.scss']
})
export class EditActivitesComponent implements OnInit {

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
	files : Observable<any>;
	start:boolean=true;
	public uploadFiles: Array<File>;
	addFileForm: FormGroup;
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
		console.log(JSON.stringify(this.editForm.value));
		this.submitted = true;
		if (this.editForm.invalid) {
			return;
		}
		this.service.updateObject("/activite/edit/", this.editForm.value)
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

				this.router.navigate(["associations/show-association/" + assocId]);

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
		let assocId = window.localStorage.getItem("assocId");
		let activId = window.localStorage.getItem("activiteId");
		this.editForm = this.fb.group({
			id: [activId],
			dateActivite: [""],
			populationImpactee: [""],
			arrondissements: [],
			objet: [""],
			numAutorisation: [""],
			note: [""],
			idAssociation: [assocId],
			typeActivites : this.fb.group({
				id: [],
				libelle: [""]
			})
		});

		this.service
			.getObjectById("/activite/showBy/", +activId)
			.subscribe(data => {
				console.log("Data : "+ JSON.stringify(data,null,2))
				this.editForm.patchValue(data);
				this.editForm.controls['dateActivite'].patchValue(new Date(data.dateActivite).toISOString());
			});
			setTimeout(() => {
				if (activId!=null)
				this.files = this.service.getByIdFiles(activId);
				this.start = false;
			}, 1000);
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
				this.arrondissements = data[3];
			},
			err => {
				console.log(err);
			}
		);
	}
	compare(val1, val2) {
		if(val1 && val2)
		return val1.id === val2.id;

	  }
	// =====================================
	// back to list
	// =====================================
	back() {
		//this.location.back();
		let assocId = window.localStorage.getItem("assocId");
		this.router.navigate(["associations/show-association/" + assocId
		]);
	}

}

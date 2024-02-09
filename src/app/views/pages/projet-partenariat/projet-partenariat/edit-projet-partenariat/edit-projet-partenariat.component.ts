import { environment } from './../../../../../../environments/environment';
import { ProjetService } from "./../../../utils/projet-part.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { OrganisationService } from "../../../organisation/organisation.service";
import { first } from "rxjs/operators";
import { Observable } from 'rxjs';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { FilesUtilsService } from '../../../utils/files-utils.service';
@Component({
	selector: "kt-edit-projet-partenariat",
	templateUrl: "./edit-projet-partenariat.component.html",
	styleUrls: ["./edit-projet-partenariat.component.scss"],
})
export class EditProjetPartenariatComponent implements OnInit {
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
	// ============================================
	//
	// ============================================
	constructor(
		private service: ProjetService,
		private service2: OrganisationService,
		private router: Router,
		private fb: FormBuilder,
		private notification: NotificationService,
		private translate: TranslateService,
		private fileUtils:FilesUtilsService,
	) {
		this.getData();
	}
	// ============================================
	//
	// ============================================
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
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.editProjetPartenariat();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	editProjetPartenariat() {
		let assocId = window.localStorage.getItem("assocId");
		console.log(JSON.stringify(this.editForm.value));
		this.submitted = true;
		if (this.editForm.invalid) {
			return;
		}
		this.service
			.updateObject("/projetPartenariat/edit/", this.editForm.value)
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
		let projetId = window.localStorage.getItem("projetId");
		this.editForm = this.fb.group({
			id: [projetId],
			nomProjet: [""],
			dateDemarrage: [""],
			dateFin: [""],
			budgetAlloue: [""],
			idCommune: [""],
			finaliteProjet: [""],
			objet: [""],
			populationImpactee: [""],
			idAssociation: [assocId],
			typeProjetPartenariat: this.fb.group({
				id: [],
				libelle: [""],
			}),
		});

		this.service
			.getObjectById("/projetPartenariat/showBy/", +projetId)
			.subscribe((data) => {
				this.editForm.patchValue(data);
				this.editForm.controls['dateDemarrage'].patchValue(new Date(data.dateDemarrage).toISOString());
				this.editForm.controls['dateFin'].patchValue(new Date(data.dateFin).toISOString());
			});
			setTimeout(() => {
				if (projetId!=null)
				this.files = this.service.getByIdFiles(projetId);
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
		this.router.navigate(["associations/show-association/" + assocId]);
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
		window.open(environment.API_ALFRESCO_URL + "/PjProjetPartenariat/"+r);
	}
	// =================================================================
	// Delete file from server
	// =================================================================
	onDeleteFile(id:any) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
		console.log("Delete file ID: " + id);
		this.service
			.deletefiles("/PjProjetPartenariat/", id)
			.subscribe(data => {
				console.log("File courrier deleted : " + id);
			});
		// Refresh
		let projetId = window.localStorage.getItem("projetId");
		if (!projetId) {
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
			if (projetId!=null)
			this.files = this.service.getByIdFiles(projetId);
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

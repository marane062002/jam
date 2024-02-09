import { Component, OnInit, ViewChild, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { first } from "rxjs/operators";
import { InsertPubService } from '../../../utils/insert-pub.service';
import { OrganisationService } from '../../../organisation/organisation.service';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSelectChange, MatSelect } from '@angular/material';
import * as $ from "jquery";
import { Observable } from 'rxjs';
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { environment } from './../../../../../../environments/environment';

@Component({
	selector: "kt-edit-insertion-publicitaire",
	templateUrl: "./edit-insertion-publicitaire.component.html",
	styleUrls: ["./edit-insertion-publicitaire.component.scss"]
})
export class EditInsertionPublicitaireComponent implements OnInit {
	// ==================================================
	//
	// ==================================================
	selectedList: number;
	divisions: any;
	services: any;
	loading = false;
	medias: any;
	statuts: any;
	supports: any;
	selectedValue: String;
	submitted = false;
	// upload file attributes
	uploadFileForm: FormGroup;
	upform: any;
	public file;
	editForm: FormGroup;
	editFileForm: FormGroup;
	//today's date
	todayDate: Date = new Date();
	supportId:number;

	public uploadFiles: Array<File>;
	addFileForm: FormGroup;
	files : Observable<any>;
	start:boolean=true;
	// =============================================
	// date debut change
	// =============================================
	dateDebutchange() {
		this.editForm.controls["datePublication"].setValue(null);
	}
	// ==================================================
	//
	// ==================================================
	constructor(
		private service: InsertPubService,
		private service1: OrganisationService,
		private service2: FilesUtilsService,
		private router: Router,
		private formBuilder: FormBuilder,
		private location: Location,
		private notification: NotificationService,
		private translate: TranslateService
	) {
		let ipId = window.localStorage.getItem("pubId");
		this.editForm = this.formBuilder.group({
			id: [ipId],
			numEdition: ["", Validators.required],
			dateEdition: ["", Validators.required],
			datePublication: ["", Validators.required],
			objet: ["", Validators.required],
			idDivision: ["", Validators.required],
			idService: ["", Validators.required],
			factureInsertionPublicitaire: this.formBuilder.group({
				id: [],
				numeroFacture: ["", Validators.required],
				montantHT: ["", Validators.required],
				montantTtc: ["", Validators.required],
				statutFacturel: this.formBuilder.group({
					id: [],
					libelle: [""]
				})
			}),
			media: this.formBuilder.group({
				id: [],
				nom: [""],
				supportPublicitaire: this.formBuilder.group({
					id: [],
					nomSupport: [""]
				}),
			})
		});

		this.editFileForm = this.formBuilder.group({
			_file: []
		});

		if (!ipId) {
			alert("Invalid action.");
			this.router.navigate([
				"insertion-publicitaire/list-insertion-publicitaire"
			]);
			return;
		}

		this.service
			.getObjectById("/insertionPublicitaires/show/edit/", +ipId)
			.subscribe(data => {
				this.editForm.patchValue(data);
			});
		console.log("data + " +this.editForm +" |" +this.editForm.status +" | " +this.editForm);

		// get files from alfresco by id
		this.getFiles(ipId);
	}
	// ============================================================
	// get files from alfresco
	// ============================================================
	getFiles(id){
		return setTimeout(() => {
			if (id!=null)
			this.files = this.service.getByIdPublicitaireFiles(id);
			this.start = false;
		}, 1000);
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file){
		return this.service2.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file){
		return this.service2.getExtensionFile(file);
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r=e.substring(0,e.length-4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjPublicitaire/"+r);
	}
	// =================================================================
	// Delete file from server
	// =================================================================
	onDeleteFile(id:any) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
		console.log("Delete file ID: " + id);
		this.service
			.deletefiles("/PjPublicitaire/", id)
			.subscribe(data => {
				console.log("File courrier deleted : " + id);
			});
		// Refresh
		let ipId = window.localStorage.getItem("pubId");
		if (!ipId) {
			alert("Invalid action.");
			this.router.navigate(["insertion-publicitaire"]);
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
		// get files from alfresco by id
		this.getFiles(ipId);
		}
	}
	// ==================================================
	//
	// ==================================================
	ngOnInit() {

		this.service2.fileSizeDetector();

		//Charger les types des courriers
		this.getMedias();

		// get all statuts
		this.getStatuts();

		// get all supports media
		this.getSupports();

		// set current date
		this.editForm.controls["dateEdition"].setValue(this.currentDate());

		// get all devision
		this.service1.getRessource("/divisions/index").subscribe((data) => {
			this.divisions = data;
			//console.log(data);
		});
		// // get all service
		// this.service1.getRessource("/services/index").subscribe((data) => {
		// 	this.services = data;
		// 	//console.log(data);
		// });

		this.changedOrganisationList();
	}
	// ==================================================
	//
	// ==================================================
	changedOrganisationList(){
		const _this = this; // important !!!
		this.editForm.get('idDivision').valueChanges.subscribe(
			value=> {
				if(value!=0){
					this.service1.getRessourceById(value,'/services/divisions/')
				  .subscribe(data =>{
					_this.services = data;
					 },
					error => console.log(error)
				  );
				}
			}
		 );
		}
	// ==================================================
	//
	// ==================================================
	currentDate() {
		const currentDate = new Date();
		return currentDate.toLocaleDateString("en-GB");
	}
	// ==================================================
	//
	// ==================================================
	private getMedias() {
		this.service.getAllObject("/MediaPublicitaires/index").subscribe(
			data => {
				this.medias = data;
			},
			err => {
				console.log(err);
			}
		);
	}
	// ==================================================
	//
	// ==================================================
	private getStatuts() {
		this.service.getAllObject("/StatutFacturels/index").subscribe(
			data => {
				this.statuts = data;
			},
			err => {
				console.log(err);
			}
		);
	}
	// ==================================================
	//
	// ==================================================
	private getSupports() {
		this.service.getAllObject("/SupportPublicitaires/index").subscribe(
			(data) => {
				this.supports = data;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ==================================================
	//
	// ==================================================
	onSubmit() {

		console.log(this.editForm.value,null,4)
		const controls = this.editForm.controls;
		/** check form */
		if (this.editForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.submitted = true;
		if (this.editForm.invalid) {
			return;
		}
		this.service
			.updateObject("/insertionPublicitaires/edit/", this.editForm.value)
			.pipe(first())
			.subscribe(
				data => {
					this.loading = true;
					var id = this.editForm.get('id').value;
					// upload file
					if (this.uploadFiles)
						this.service.updloadFilePublicitaire(this.uploadFiles, id).subscribe(
					(res) =>
						console.log("File inserted " + JSON.stringify(res)),
					(err) =>
						console.log("File not inserted " + JSON.stringify(err))
					);

					this.router.navigate([
						"insertion-publicitaire/list-insertion-publicitaire"
					]);
					this.notification.warn(
						this.translate.instant(
							"PAGES.GENERAL.MSG_UPDATE_CONFIRMED"
						)
					);
				},
				error => {
					alert(error);
				}
			);
	}
	// ==================================================
	//
	// ==================================================
	private getMediasBySupport(support: number) {
		this.service
			.getObjectById("/MediaPublicitaires/support/", support)
			.subscribe(
				(data) => {
					this.medias = data;
					console.log('media' + this.medias);
				},
				(err) => {
					console.log(err);
				}
			);
	}
	// ==================================================
	//
	// ==================================================
	// upload files
	fileChange(event) {
		this.uploadFiles = event.target.files;
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.editFileForm.patchValue(this.uploadFiles);
		}
	}
	// ==================================================
	//
	// ==================================================
	back() {
		this.location.back();
	}
	// ==================================================
	//
	// ==================================================
	public getObjet() {
		return this.editForm.get("objet");
	}
	// ==================================================
	//
	// ==================================================
	@ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
	@Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<
		MatSelectChange
	>();
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	// ==================================================
	// Select changed
	// ==================================================
	selectionChanged(event: MatSelectChange) {
		this.selectionChange.emit(
			new MatSelectChange(this.matSelect, event.value)
		);
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		this.selectedList = event.value;
		this.editForm.get("idService").reset();
		if (this.selectedList != 0) {
			this.getAllServiceByDivision(this.selectedList);
		} else {
			this.services = null;
		}
	}
	// ControlValueAccessor Implementation
	onChange: any = () => {};
	onTouched: any = () => {};

	// ==================================================
	// Support changed
	// ==================================================
	supportChanged(event: MatSelectChange) {
		this.selectionChange.emit(
			new MatSelectChange(this.matSelect, event.value)
		);
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		this.supportId = event.value;
		console.log("support "+ this.supportId);
		this.getMediasBySupport(this.supportId);
		/*this.editForm.get("media").reset();
		if (this.selectedList != null) {
			this.getMediasBySupport(this.supportId);
		} else {
			this.medias = null;
		}*/
	}
	// ============================================
	// Liste des services
	// ============================================
	private getAllServiceByDivision(id: number) {
		this.service1.getRessourceById(id, "/services/divisions/").subscribe(
			(data) => {
				this.services = data;
				if (this.services != "") {
					this.editForm.get("idService").enable();
				} else {
					this.editForm.get("idService").disable();
				}
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ============================================
	// Checking control validation
	// ============================================
	/**
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
	// ============================================
	// check file size
	// ============================================
	fileCheck() {
		$(function () {
			// We can attach the `fileselect` event to all file inputs on the page
			$(document).on("change", ":file", function () {
				var input = $(this),
					numFiles = input.get(0).files
						? input.get(0).files.length
						: 1,
					label =  (new String(input.val())).replace(/\\/g, "/").replace(/.*\//, "");
				input.trigger("fileselect", [numFiles, label]);
			});

			// We can watch for our custom `fileselect` event like this
			$(document).ready(function () {
				$(":file").on("fileselect", function (event, numFiles, label) {
					var input = $(this).parents(".input-group").find(":text"),
						log = numFiles > 1 ? numFiles + " وثائق مختارة" : label;

					if (input.length) {
						input.val(log);
					} else {
						if (log) alert(log);
					}
				});
			});
		});
	}
}

import { environment } from "./../../../../../environments/environment";
import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from "@angular/core";
import { AssociationService } from "../../utils/association.service";
import { Router, ActivatedRoute } from "@angular/router";
import { delay } from "rxjs/operators";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotificationService } from "../../shared/notification.service";
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
	selector: "kt-tab-documents",
	templateUrl: "./tab-documents.component.html",
	styleUrls: ["./tab-documents.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabDocumentsComponent implements OnInit, OnDestroy {
	id: number;
	private unsubscribe: Subscription[] = [];
	@ViewChild('inputFile', { static: true }) inputFile: ElementRef;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"icon",
		"name",
		"dateFile",
		"fSize",
		"actions",
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;
	public uploadFiles: Array<File>;
	addFileForm: FormGroup;
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: AssociationService,
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private fileService: FilesUtilsService,
		private notification: NotificationService,
		private translate: TranslateService
	) {

	}

	ngOnInit() {

		this.fileService.fileSizeDetector();

		this.addFileForm = this.formBuilder.group({
			_file: [],
		});

		this.getAssociationFiles();

	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
		console.log("destroy");
	}
	// ============================================
	// Recuperer tous les association
	// ============================================
	public getAssociationFiles() {
		this.id = this.route.snapshot.params["id"];
		//this.service.getFilesById("/PjAssociation/Allpjs/", this.id).then(
		this.service.getByIdFiles(this.id)
			.subscribe(
				(data) => {
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);

	}

	// ============================================
	// Filter de recherche
	// ============================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	// ============================================
	// Methode de suppression des associations
	// ============================================
	deleteHebergement(id: number): void {
		Swal.fire({
			title: 'هل تريد مسح هذه المعطيات ؟',
			icon: 'question',
			iconHtml: '؟',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: 'نعم',
			cancelButtonText: 'لا',
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service
					.deletefiles("/PjAssociation/", id)
					.subscribe((data) => {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500
						})
						this.getAssociationFiles();
					});
			}
		})
	}
	// ============================================
	// Methode de modification activites
	// ============================================
	editHebergement(id) {
		this.id = this.route.snapshot.params["id"];
		window.localStorage.removeItem("assocId");
		window.localStorage.setItem("assocId", "" + this.id);

		window.localStorage.removeItem("hebergId");
		window.localStorage.setItem("hebergId", "" + id);
		this.router.navigate(["hebergement/edit-hebergement/" + id]);
	}

	detailsHebergement(id: number) {
		let idHeb = this.route.snapshot.params["id"];
		window.localStorage.removeItem("hebergId");
		window.localStorage.setItem("hebergId", "" + idHeb);
		this.router.navigate(["/hebergement/show-hebergement/" + id]);
	}
	// ============================================
	// Methode d'insertion des convention
	// ============================================
	addDocuments(): void {
		this.id = this.route.snapshot.params["id"];
		window.localStorage.removeItem("assocId");
		window.localStorage.setItem("assocId", "" + this.id);
		this.router.navigate(["document-admin/add-document-admin"]);
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjAssociation/" + r);
	}
	// =================================================================
	// Delete file from server
	// =================================================================
	onDeleteFile(id: any) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			console.log("Delete file ID: " + id);
			this.service
				.deletefiles("/PjAssociation/", id)
				.subscribe((data) => {
					console.log("File courrier deleted : " + id);
					this.isLoading = true;
					this.dataSource = new MatTableDataSource([]);
					this.getAssociationFiles();
				});
			// Notification
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);

		}
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file) {
		return this.fileService.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file) {
		return this.fileService.getExtensionFile(file);
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
	// OnSubmit
	// ============================================
	onSubmit() {
		const controls = this.addFileForm.controls;
		/** check form */
		if (this.addFileForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		//console.log("insert test !!");
		this.id = this.route.snapshot.params["id"];
		//console.log("id : " + this.id + " et file " + this.uploadFiles.length);
		if (this.uploadFiles != null) {
			this.service.updloadFile(this.uploadFiles, this.id)
				.subscribe(
					(res) => {
						console.log("File inserted " + JSON.stringify(res)),
							this.isLoading = true;
						this.dataSource = new MatTableDataSource([]);
						this.getAssociationFiles();
						// reset file input
						this.inputFile.nativeElement.value = '';
					},
					(err) => console.log("File not inserted " + JSON.stringify(err))
				);
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
			);
		}

	}
	// ============================================
	// reset file
	// ============================================
	resetFile() {
		// reset file input
		this.inputFile.nativeElement.value = '';
		this.addFileForm.get('_file').reset();
	}
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AssociationService } from '../../utils/association.service';
import { FilesUtilsService } from '../../utils/files-utils.service';
import { NotificationService } from '../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: "kt-add-document-admin",
	templateUrl: "./add-document-admin.component.html",
	styleUrls: ["./add-document-admin.component.scss"]
})
export class AddDocumentAdminComponent implements OnInit {
	addFileForm: FormGroup;
	public uploadFiles: Array<File>;

	constructor(
		private service: AssociationService,
		private router: Router,
		private fb: FormBuilder,
		private filesUtil: FilesUtilsService,
		private notification: NotificationService,
		private translate: TranslateService,
	) {}

	ngOnInit() {
		this.filesUtil.fileSizeDetector();

		this.fileBuilder();
	}
	onSubmit() {
		const controls = this.addFileForm.controls;
		/** check form */
		if (this.addFileForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.sendToGed();
		this.back();
	}

	sendToGed() {
		let assocId = window.localStorage.getItem("assocId");
		// Upload files
		if (this.uploadFiles != null)
			this.service.updloadFile(this.uploadFiles, assocId).subscribe(
				res => console.log("File inserted " + JSON.stringify(res)),
				err => console.log("File not inserted " + JSON.stringify(err))
			);
		this.notification.warn(
			this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
		)
		this.router.navigate(["associations/show-association/" + assocId]);
	}
	// ============================================
	// Files upload
	// ============================================
	fileBuilder() {
		this.addFileForm = this.fb.group({
			_file: [null, Validators.required]
		});

	}

	// =====================================
	// back to list
	// =====================================
	back() {
		let assocId = window.localStorage.getItem("assocId");
		this.router.navigate(["associations/show-association/" + assocId]);
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
		const control = this.addFileForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
}

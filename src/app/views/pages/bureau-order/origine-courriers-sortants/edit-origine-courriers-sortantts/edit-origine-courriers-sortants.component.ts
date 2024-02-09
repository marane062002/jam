import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { first, finalize } from "rxjs/operators";
import { BoServiceService } from '../../../utils/bo-service.service';
import { SpinnerService } from '../../../utils/spinner.service';
import { NotificationService } from '../../../shared/notification.service';
import { NotificationType } from '../../../shared/NotificationMessage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: "kt-edit-origine-courriers-sortants",
	templateUrl: "./edit-origine-courriers-sortants.component.html",
	styleUrls: ["./edit-origine-courriers-sortants.component.scss"]
})
export class EditOrigineCourriersSortantsComponent implements OnInit {
	// ============================================================
	// 
	// ============================================================
	loading = false;
	typeCourrier: any;
	editForm: FormGroup;
	// ============================================================
	// 
	// ============================================================
	constructor(
		private boService: BoServiceService,
		private router: Router,
		private formBuilder: FormBuilder,
		private location: Location,
		private spinnerService: SpinnerService,
		private notification: NotificationService,
		private translate: TranslateService,
	) {
		let courrierId = window.localStorage.getItem("personneMoralId");
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.editForm = this.formBuilder.group({
			id: [],
			raisonSociale: ["", Validators.required],
			tel: [""],
			adresse: [""],
			mail:["", Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
			fax:[""],
			typeOrigineExterne :["pm"],
		});

		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["origine-courriers-sortants"]);
			return;
		}
		this.boService
			.getObjectById("/origineCourierEntrants/show/", +courrierId)
			.pipe(finalize(() => {
				this.spinnerService.stop(spinnerRef);// stop spinner
			}))
			.subscribe(data => {
				this.editForm.patchValue(data);
			});
	}
	// ============================================================
	// 
	// ============================================================
	ngOnInit() {}
	// ============================================================
	// 
	// ============================================================
	onSubmit() {
		const controls = this.editForm.controls;
		/** check form */
		if (this.editForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.loading = true;
		this.boService
			.updateObject("/origineCourierEntrants/edit/", this.editForm.value)
			.pipe(first())
			.subscribe(
				data => {
					this.router.navigate([
						"origine-courriers-sortants/list-origine-courriers-sortants"
					]);
					this.notification.sendMessage({
						message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
						type: NotificationType.success
					});
				},
				error => {
					alert(error);
				}
			);
	}
	// ============================================================
	// 
	// ============================================================
	backList() {
		this.location.back();
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
}

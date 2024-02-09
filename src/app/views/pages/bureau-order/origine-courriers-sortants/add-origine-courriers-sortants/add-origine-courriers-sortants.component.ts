import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BoServiceService } from "../../../utils/bo-service.service";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { NotificationType } from '../../../shared/NotificationMessage.service';

@Component({
	selector: "kt-add-origine-courriers-sortants",
	templateUrl: "./add-origine-courriers-sortants.component.html",
	styleUrls: ["./add-origine-courriers-sortants.component.scss"],
})
export class AddOrigineCourriersSortantsComponent implements OnInit {
	// ============================================================
	//
	// ============================================================
	constructor(
		private service: BoServiceService,
		private notification: NotificationService,
		private translate: TranslateService,
		private router: Router,
		private formBuilder: FormBuilder,
	) {}
	// ============================================================
	//
	// ============================================================
	loading = false;
	addForm: FormGroup;
	submitted = false;
	// ============================================================
	//
	// ============================================================
	ngOnInit() {
		this.addForm = this.formBuilder.group({
			id: [],
			raisonSociale: ["", Validators.required],
			tel: [""],
			adresse: [""],
			fax:[""],
			typeOrigineExterne :["pm"],
			mail:["", Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],

		});
	}
	// ============================================================
	//
	// ============================================================
	onSubmit() {
		const controls = this.addForm.controls;
		/** check form */
		if (this.addForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.addOriginCourrierSortant();
		this.loading = true;
	}
	// ============================================================
	//
	// ============================================================
	addOriginCourrierSortant() {
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}

		this.service
			.createObject("/origineCourierEntrants/new", this.addForm.value)
			.subscribe((data) => {
				this.router.navigate([
					"origine-courriers-sortants/list-origine-courriers-sortants",
				]);
				this.notification.sendMessage({
					message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
					type: NotificationType.success
				});
			});
	}
	// ============================================================
	//
	// ============================================================
	backList() {
		this.router.navigate([
			"origine-courriers-sortants/list-origine-courriers-sortants",
		]);
	}
	// ============================================================
	//
	// ============================================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
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

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
}

import { NotificationService } from './../../../../shared/notification.service';
import { ActivitesService } from './../../../../utils/activites.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kt-add-personne-morale',
  templateUrl: './add-personne-morale.component.html',
  styleUrls: ['./add-personne-morale.component.scss']
})
export class AddPersonneMoraleComponent implements OnInit {

	// ============================================================
	//
	// ============================================================
	constructor(
		private service: ActivitesService,
		private notification: NotificationService,
		private translate: TranslateService,
		private router: Router,
		private formBuilder: FormBuilder
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
			raisonSociale: ["", Validators.required],
			rc: [""],
			identifiantFiscal: [""],
			numeroPatente: [""],
			adresse: [""],
			teleFixe: ["", Validators.required],
			fax: [""],
			teleGsm: [""],
			contact: [""],
			eMail: [""],
			siteWeb: [""],
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
			.createObject("/pmActivite/new", this.addForm.value)
			.subscribe((data) => {
				this.router.navigate([
					"activites/list-personne-morale",
				]);
				this.notification.warn(
					this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
				);
			});
	}
	// ============================================================
	//
	// ============================================================
	backList() {
		this.router.navigate([
			"activites/list-personne-morale",
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

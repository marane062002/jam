import { ActivatedRoute } from '@angular/router';
import { NotificationService } from './../../../../shared/notification.service';
import { ActivitesService } from './../../../../utils/activites.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-edit-personne-morale',
  templateUrl: './edit-personne-morale.component.html',
  styleUrls: ['./edit-personne-morale.component.scss']
})
export class EditPersonneMoraleComponent implements OnInit {

	id:number;
	// ============================================================
	//
	// ============================================================
	constructor(
		private service: ActivitesService,
		private notification: NotificationService,
		private translate: TranslateService,
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder
	) {
		this.id = this.route.snapshot.params["id"];
		this.formField();
	}
	// ============================================================
	//
	// ============================================================
	loading = false;
	editForm: FormGroup;
	submitted = false;
	// ============================================
	// Charger les elements du fourmulaire
	// ============================================
	formField() {
		this.editForm = this.formBuilder.group({
			id:[this.id],
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
	ngOnInit() {
		this.service
			.getObjectById("/pmActivite/show/", this.id)
			.subscribe((data) => {
				this.editForm.patchValue(data);
			});

	}
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
		this.editPmActivite();
		this.loading = true;
	}
	// ============================================================
	//
	// ============================================================
	editPmActivite() {
		this.submitted = true;
		if (this.editForm.invalid) {
			return;
		}

		this.service
			.createObject("/pmActivite/new", this.editForm.value)
			.subscribe((data) => {
				this.router.navigate([
					"activites/list-personne-morale",
				]);
				this.notification.warn(
					this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED")
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

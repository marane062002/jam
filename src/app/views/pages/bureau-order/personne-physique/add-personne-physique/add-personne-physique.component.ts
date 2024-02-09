import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BoServiceService } from '../../../utils/bo-service.service';
import { NotificationService } from '../../../shared/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-add-personne-physique',
  templateUrl: './add-personne-physique.component.html',
  styleUrls: ['./add-personne-physique.component.scss']
})
export class AddPersonnePhysiqueComponent implements OnInit {

	// ============================================================
	//
	// ============================================================
	constructor(
		private service: BoServiceService,
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
			id: [],
			nom: ["", Validators.required],
			prenom: ["", Validators.required],
			cin:[""],
			tel: [""],
			typeOrigineExterne :["pp"]
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
					"personne-physique/list-personne-physique",
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

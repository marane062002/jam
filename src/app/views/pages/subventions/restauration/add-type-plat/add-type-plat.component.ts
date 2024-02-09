import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup, FormBuilder } from '@angular/forms';
import { SubventionsService } from '../../../utils/subventions.service';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-add-type-plat',
  templateUrl: './add-type-plat.component.html',
  styleUrls: ['./add-type-plat.component.scss']
})
export class AddTypePlatComponent implements OnInit {

	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	addForm: FormGroup;
	statuts: any;
	organismes: any;
	// ============================================
	//
	// ============================================
	constructor(
		private service: SubventionsService,
		private fb: FormBuilder,
		private location: Location,
		private notification: NotificationService,
		private translate: TranslateService,
		private route: ActivatedRoute,
	) {}
	// ============================================
	//
	// ============================================
	ngOnInit() {
		this.formBuilder();
	}
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		const controls = this.addForm.controls;
		/** check form */
		if (this.addForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;
		this.addSubvention();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addSubvention() {
		console.log(JSON.stringify(this.addForm.value, null, 4));
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.service
			.createObject("/typePlat/new", this.addForm.value)
			.subscribe(
				(data) => {
					this.location.back();
					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
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
		let restoId = window.localStorage.getItem("restoId"); // id resto
		this.addForm = this.fb.group({
			designation: [""],
			prixUnitaire: [""],
			quantite: [""],
			totalHT: [""],
			totalTTC: [""],
			restauration: this.fb.group({
				id: [restoId],
			}),
		});
	}

	// ============================================
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}

}

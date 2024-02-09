import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup, FormBuilder } from '@angular/forms';
import { SubventionsService } from '../../../utils/subventions.service';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'kt-edit-type-plat',
  templateUrl: './edit-type-plat.component.html',
  styleUrls: ['./edit-type-plat.component.scss']
})
export class EditTypePlatComponent implements OnInit {

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
			.updateObject("/typePlat/edit/", this.addForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					this.location.back();
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
		let restoId = window.localStorage.getItem("restoId"); // id resto
		let idType = this.route.snapshot.params["idType"];

		this.addForm = this.fb.group({
			id:[idType],
			designation: [""],
			prixUnitaire: [""],
			quantite: [""],
			totalHT: [""],
			totalTTC: [""],
			restauration: this.fb.group({
				id: [restoId],
			}),
		});
		this.service
			.getObjectById("/typePlat/show/", +idType)
			.subscribe((data) => {
				console.log("ID++++ "+ idType);
				console.log(JSON.stringify(data,null,4));
				this.addForm.patchValue(data);
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

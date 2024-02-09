import { NotificationService } from './../../../../shared/notification.service';
import { SubventionsService } from './../../../../utils/subventions.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'kt-edit-fournisseur',
  templateUrl: './edit-fournisseur.component.html',
  styleUrls: ['./edit-fournisseur.component.scss']
})
export class EditFournisseurComponent implements OnInit {

	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	addForm: FormGroup;
	constructor(
		private service: SubventionsService,
		private router: Router,
		private fb: FormBuilder,
		private notification: NotificationService,
		private translate: TranslateService,
	) {}

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
		this.SaveData();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	SaveData() {
		console.log(JSON.stringify(this.addForm.value));
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.service
			.updateObject("/fournisseurImpression/edit/", this.addForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					this.router.navigate([
						"/impression/list-fournisseur",
					]);
					this.notification.warn(
						this.translate.instant(
							"PAGES.GENERAL.MSG_UPDATE_CONFIRMED"
						)
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
		let id = window.localStorage.getItem("ref");
		this.addForm = this.fb.group({
			id: [id],
			nom: ["", Validators.required],
			prenom: [""],
			mail: [""],
			fax: [""],
			gsm: [""],
			adresse: [""],
		});
		this.service
			.getObjectById("/fournisseurImpression/show/", +id)
			.subscribe((data) => {
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
		this.router.navigate(["/impression/list-fournisseur"]);
	}

}

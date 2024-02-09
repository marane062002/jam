import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AssociationService } from '../../utils/association.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';
import { Location } from "@angular/common";

@Component({
  selector: 'kt-add-membre',
  templateUrl: './add-membre.component.html',
  styleUrls: ['./add-membre.component.scss']
})
export class AddMembreComponent implements OnInit {

	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	addForm: FormGroup;

	constructor(
		private service: AssociationService,
		private router: Router,
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private notification: NotificationService,
		private translate: TranslateService,
		private location: Location,
	) {
		this.formBuilder();
	}

	ngOnInit() {}
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		this.loading = true;

		this.addAssociation();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addAssociation() {
		console.log(JSON.stringify(this.addForm.value));
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.service
			.createObject("/membreBureau/new", this.addForm.value)
			.subscribe(
				(data) => {
					this.location.back();
					this.notification.warn(
						this.translate.instant(
							"PAGES.GENERAL.MSG_SAVED_CONFIRMED"
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
		let id = this.route.snapshot.params["id"];
		this.addForm = this.fb.group({
			id:[],
			nom: ["", Validators.required],
			prenom: ["", Validators.required],
			cin: [""],
			fonction: [""],
			adresse: [""],
			sexe:[""],
			trancheAge:[""],
			poste:[""],
			niveauScolaire:[""],
			mandatBureaus: this.fb.array([
					this.fb.group({
						id: [id],
					  })
			])
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
		let id = this.route.snapshot.params["id"];
		this.router.navigate(["associations/show-mandat/"+id]);
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

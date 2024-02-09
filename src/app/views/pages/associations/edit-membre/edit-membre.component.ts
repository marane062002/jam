import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { AssociationService } from '../../utils/association.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotificationService } from '../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-edit-membre',
  templateUrl: './edit-membre.component.html',
  styleUrls: ['./edit-membre.component.scss']
})
export class EditMembreComponent implements OnInit {

	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	addForm: FormGroup;
	id:any;
	constructor(
		private service: AssociationService,
		private router: Router,
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private location: Location,
		private notification: NotificationService,
		private translate: TranslateService,
	) {
		this.formBuilder();
	}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.service
			.getObjectById("/membreBureau/show/", this.id)
			.subscribe((data) => {
				this.addForm.patchValue(data);
			});
	}
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
			.updateObject("/membreBureau/edit/", this.addForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					this.location.back();
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
		this.location.back();
	}

}

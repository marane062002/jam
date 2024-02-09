import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { first } from "rxjs/operators";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BoServiceService } from '../../../utils/bo-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-edit-personne-physique',
  templateUrl: './edit-personne-physique.component.html',
  styleUrls: ['./edit-personne-physique.component.scss']
})
export class EditPersonnePhysiqueComponent implements OnInit {

	loading = false;
	typeCourrier: any;
	editForm: FormGroup;
	constructor(
		private boService: BoServiceService,
		private router: Router,
		private formBuilder: FormBuilder,
		private location: Location
	) {
		let personneId = window.localStorage.getItem("personneId");
		this.editForm = this.formBuilder.group({
			id: [],
			nom: ["", Validators.required],
			prenom: ["", Validators.required],
			cin:[""],
			tel: [""],
			typeOrigineExterne :["pp"]
		});

		if (!personneId) {
			alert("Invalid action.");
			this.router.navigate(["personne-physique"]);
			return;
		}
		this.boService
			.getObjectById("/origineCourierEntrants/show/", +personneId)
			.subscribe(data => {
				this.editForm.patchValue(data);
			});
	}

	ngOnInit() {}

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
						"personne-physique/list-personne-physique"
					]);
				},
				error => {
					alert(error);
				}
			);
	}

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

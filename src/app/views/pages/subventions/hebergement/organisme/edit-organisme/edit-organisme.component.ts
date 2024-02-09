import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { SubventionsService } from "./../../../../utils/subventions.service";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
	selector: "kt-edit-organisme",
	templateUrl: "./edit-organisme.component.html",
	styleUrls: ["./edit-organisme.component.scss"],
})
export class EditOrganismeComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	editForm: FormGroup;

	constructor(
		private service: SubventionsService,
		private router: Router,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		this.formBuilder();
	}
	// ============================================
	// OnSubmit
	// ============================================
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
		this.EditData();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	EditData() {
		console.log(JSON.stringify(this.editForm.value));
		this.submitted = true;
		if (this.editForm.invalid) {
			return;
		}
		this.service
			.updateObject("/organismeAccueil/edit/", this.editForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					this.router.navigate(["/hebergement/list-organisme"]);
					console.log("saved successfuly ... ID : " + data);
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
		this.editForm = this.fb.group({
			id: [id],
			nom: ["", Validators.required],
			adresse: [""],
			fax: [""],
			mail: [""],
			rc: [""],
			gsm: [""],
		});
		this.service
			.getObjectById("/organismeAccueil/show/", +id)
			.subscribe((data) => {
				this.editForm.patchValue(data);
			});
	}
	// ============================================
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.editForm.reset();
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.router.navigate(["/hebergement/list-organisme"]);
	}
}

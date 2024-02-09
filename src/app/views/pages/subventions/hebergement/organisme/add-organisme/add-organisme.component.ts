import { SubventionsService } from "./../../../../utils/subventions.service";
import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "kt-add-organisme",
	templateUrl: "./add-organisme.component.html",
	styleUrls: ["./add-organisme.component.scss"],
})
export class AddOrganismeComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	addForm: FormGroup;

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
			.createObject("/organismeAccueil/new", this.addForm.value)
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
		this.addForm = this.fb.group({
			nom: ["", Validators.required],
			adresse: [""],
			fax: [""],
			mail: [""],
			rc: [""],
			gsm: [""],
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
		this.router.navigate(["/hebergement/list-organisme"]);
	}
}

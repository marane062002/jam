import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup, FormBuilder } from '@angular/forms';
import { SubventionsService } from '../../../utils/subventions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FilesUtilsService } from '../../../utils/files-utils.service';

@Component({
  selector: 'kt-add-type-chambre',
  templateUrl: './add-type-chambre.component.html',
  styleUrls: ['./add-type-chambre.component.scss']
})
export class AddTypeChambreComponent implements OnInit {

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
			.createObject("/typeChambre/new", this.addForm.value)
			.subscribe(
				(data) => {

					console.log("saved successfuly ... ID : " + data);
					this.location.back();
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
		let hebergId = window.localStorage.getItem("hebergId"); // id hebergement
		this.addForm = this.fb.group({
			designation: [""],
			prixUnitaire: [""],
			quantite: [""],
			totalHT: [""],
			totalTTC: [""],
			hebergement: this.fb.group({
				id: [hebergId],
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

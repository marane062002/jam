import { Component, OnInit } from "@angular/core";
import { NgForm, FormArray, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { BiensReservationService } from "../../shared/biens-reservation.service";

@Component({
	selector: "kt-bien-reservation-form",
	templateUrl: "./bien-reservation-form.component.html",
	styleUrls: ["./bien-reservation-form.component.scss"],
})
export class BienReservationFormComponent implements OnInit {
	myForm: FormGroup;
	arr: FormArray;
	formData = {
		objetDemandeAutorisation: "",
		adresse: "",
		arrondissement: 1,
		quartier: 1,
		typebiendemandeReservation: { id: 0 },
	};
	typeAll;
	constructor(
		private fb: FormBuilder,
		private service: BiensReservationService,
		private router: Router
	) {}

	ngOnInit() {
		this.myForm = this.fb.group({
			arr: this.fb.array([this.createItem()]),
		});

		this.service.getTypesBien().subscribe((res) => {
			console.log(res);
			this.typeAll = res;
		});
	}
	createItem() {
		return this.fb.group({
			espace: [""],
			prix: [""],
		});
	}

	addItem() {
		this.arr = this.myForm.get("arr") as FormArray;
		this.arr.push(this.createItem());
	}

	removeGroup(i: number) {
		// remove address from the list
		this.arr = this.myForm.get("arr") as FormArray;
		//const control = <FormArray>this.myForm.controls['times'];
		this.arr.removeAt(i);
	}

	onSubmit1() {
		console.log(this.myForm.value.arr);
	}

	onSubmitForm(form: NgForm) {
		var esp = { espace: "", prix: "", bienReservation: { id: 0 } };
		console.log(this.formData);
		this.service.sendbien(this.formData).subscribe((res) => {
			for (var i = 0; i < this.myForm.value.arr.length; i++) {
				console.log(this.myForm.value.arr[i]);
				esp.espace = this.myForm.value.arr[i].espace;
				esp.prix = this.myForm.value.arr[i].prix;
				esp.bienReservation.id = res;
				console.log(esp);
				this.service.sendespace(esp).subscribe((resultat) => {
					console.log(resultat);
				});
			}
			this.router.navigate(["/reservations/bienreservations-list"]);
		});
	}
}

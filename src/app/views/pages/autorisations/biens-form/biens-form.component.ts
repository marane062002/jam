import { Component, OnInit } from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	FormArray,
	Validators,
	NgForm,
	FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { BiensService } from "../../shared/biens.service";

@Component({
	selector: "kt-biens-form",
	templateUrl: "./biens-form.component.html",
	styleUrls: ["./biens-form.component.scss"],
})
export class BiensFormComponent implements OnInit {
	// ===============================================================
	//
	// ===============================================================
	myForm: FormGroup;
	arr: FormArray;
	myGroup:FormGroup;
	formData = {
		typeObjetReservation: "",
		objetDemandeAutorisation: "",
		adresse: "",
		arrondissement: this.fb.group({ id: [] }),

	};
	arrondissements:any;
	typeBien
	typeAll;
	// ===============================================================
	//
	// ===============================================================
	constructor(
		private fb: FormBuilder,
		private service: BiensService,
		private router: Router
	) {
		this.myGroup = new FormGroup({
			typeObjetReservation: new FormControl(),
		objetDemandeAutorisation: new FormControl(),
	     	adresse: new FormControl(),
			 arrondissement:new FormControl(),
			// arrondissement: new FormGroup({ id: new FormControl() })
		 });
	}
	// ===============================================================
	//
	// ===============================================================
	ngOnInit() {
		this.service.getTypesBien().subscribe((data) => {
			this.typeBien = data;
		});
		this.myForm = this.fb.group({
			arr: this.fb.array([this.createItem()]),
		});

		/*this.service.getTypesBien().subscribe((res) => {
			this.typeAll = res;
		});*/

		this.getArrondissement();
	}

	getArrondissement(){
		
		this.service.getArrondissement().subscribe
		(data =>{ this.arrondissements=data})
	
	}  
	// ===============================================================
	//
	// ===============================================================
	createItem() {
		return this.fb.group({
			espace: [""],
		});
	}
	// ===============================================================
	//
	// ===============================================================
	addItem() {
		this.arr = this.myForm.get("arr") as FormArray;
		this.arr.push(this.createItem());
	}
	// ===============================================================
	//
	// ===============================================================
	removeGroup(i: number) {
		// remove address from the list
		this.arr = this.myForm.get("arr") as FormArray;
		//const control = <FormArray>this.myForm.controls['times'];
		this.arr.removeAt(i);
	}
	// ===============================================================
	//
	// ===============================================================
	onSubmit1() {
		console.log(this.myForm.value.arr);
	}
	// ===============================================================
	//
	// ===============================================================
	//onSubmitForm(form: NgForm) {
	onSubmit(){
		var esp = { espace: "", objetDemandeAutorisation: { id: 0 } };
		console.log(this.myGroup.value);

		this.service.sendbien(this.myGroup.value	).subscribe((res) => {
			// this.router.navigate(['/personne-physique/personne-physique-list']);
			for (var i = 0; i < this.myForm.value.arr.length; i++) {
				console.log(this.myForm.value.arr[i]);
				esp.espace = this.myForm.value.arr[i].espace;
				esp.objetDemandeAutorisation.id = res;
				console.log(esp);
				this.service.sendespace(esp).subscribe((resultat) => {
					console.log(resultat);
				});
			}
			this.router.navigate(["/autorisations/biens-list"]);
		}); 
	}
	// ===============================================================
	//
	// ===============================================================
	back() {
		this.router.navigate(["/autorisations/biens-list"]);
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	 isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.myForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }
}

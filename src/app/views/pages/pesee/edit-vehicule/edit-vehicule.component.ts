import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { IVehicule, Vehicule } from "../../../../core/_base/layout/models/vehicule";
import { VehiculeService } from "../Services/vehicule.service";

@Component({
	selector: "kt-edit-vehicule",
	templateUrl: "./edit-vehicule.component.html",
	styleUrls: ["./edit-vehicule.component.scss"],
})
export class EditVehiculeComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private vehiculeService: VehiculeService,
		private translate: TranslateService,
		protected activatedRoute: ActivatedRoute
	) { }
	series = [
		{ name: 'أ' },
		{ name: 'ب' },
		{ name: 'ت' },
		{ name: 'ث' },
		{ name: 'ج' },
		{ name: 'ح' },
		{ name: 'خ' },
		{ name: 'د' },
		{ name: 'ذ' },
		{ name: 'ر' },
		{ name: 'ز' },
		{ name: 'س' },
		{ name: 'ش' },
		{ name: 'ص' },
		{ name: 'ض' },
		{ name: 'ط' },
		{ name: 'ظ' },
		{ name: 'ع' },
		{ name: 'غ' },
		{ name: 'ف' },
		{ name: 'ق' },
		{ name: 'ك' },
		{ name: 'ل' },
		{ name: 'م' },
		{ name: 'ن' },
		{ name: 'ه' },
		{ name: 'و' },
		{ name: 'ي' },
	];

	editForm = this.fb.group({
		refTransport: new FormControl("", [Validators.required]),
		numCarteGrise: new FormControl("", [Validators.required, Validators.minLength(5)]),
		numVehicule: new FormControl("", [Validators.required]),
		numVehiculeNumbers: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]*$')]),
    	numVehiculeAlphabet: new FormControl('', [Validators.required]),
    	numVehiculeTwoNumbers: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]*$')]),
		tarra: new FormControl("", [Validators.required]),
		genre: new FormControl("", [Validators.required]),
		nomConducteur: new FormControl("", [Validators.required]),
		tel: new FormControl("", [Validators.required]),
		message: new FormControl("", [Validators.required]),
		numCnie: new FormControl("", [Validators.minLength(3)]),
		numCnies: new FormArray([]),
		numPermi: new FormControl("", [Validators.minLength(1)]),
		numPermis: new FormArray([]),
	});
	Vehicule: any;
	ngOnInit() {
		this.activatedRoute.data.subscribe(({ vehicule }) => {
			this.editForm.patchValue({ ...vehicule });
			console.log(this.editForm.value);
			this.Vehicule = vehicule;
		});
	}
	back() {
		this.router.navigate(["pesee/list-vehicule"]);
	}
	edit() {
		const numVehiculeNumbers = this.editForm.get('numVehiculeNumbers').value;
    const numVehiculeAlphabet = this.editForm.get('numVehiculeAlphabet').value;
    const numVehiculeTwoNumbers = this.editForm.get('numVehiculeTwoNumbers').value;
    const numVehicule = `${numVehiculeNumbers}${numVehiculeAlphabet}${numVehiculeTwoNumbers}`;
		let V = {
			
			id: this.Vehicule.id,
			refTransport: this.editForm.get("refTransport").value,
			numCarteGrise: this.editForm.get("numCarteGrise").value,
			numVehicule: this.editForm.get("numVehicule").value,
			numVehiculeNumbers: this.editForm.get("numVehiculeNumbers").value,
			numVehiculeAlphabet: this.editForm.get("numVehiculeAlphabet").value,
			numVehiculeTwoNumbers: this.editForm.get("numVehiculeTwoNumbers").value,
			tarra: this.editForm.get("tarra").value,
			genre: this.editForm.get("genre").value,
			nomConducteur: this.editForm.get("nomConducteur").value,
			tel: this.editForm.get("tel").value,
			message: this.editForm.get("message").value,
			numCnie: this.editForm.get("numCnie").value,
			numPermi: this.editForm.get("numPermi").value,
			numCnies: this.editForm.get("numCnies").value,
			numPermis: this.editForm.get("numPermis").value,


		};
		const vehicule = this.createFromForm();
		if (vehicule !== undefined) {
			this.vehiculeService.updateVehicule(V).subscribe(
				(res) => {
					console.log("res ==> ", res.body);
					Swal.fire({
						position: "center",
						icon: "success",
						title: this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED"),
						showConfirmButton: false,
						timer: 1500,
					}).then((result) => {
						this.router.navigate(["pesee/list-vehicule"]);
					});
				},
				(error) => {
					Swal.fire({
						position: "center",
						icon: "error",
						title: this.translate.instant("PAGES.GENERAL.MSG_UPDATE_NOCONFIRMED"),
						showConfirmButton: false,
						timer: 1500,
					});
					console.log("error ===> ", error);
				}
			);
		}
	}

	onSelectionChangeTarra(event) {

		if (event < 600) {
			this.editForm.get("genre").setValue("Autre")

		} else if (600 <= event && event < 2200) {
			this.editForm.get("genre").setValue("Pick-up")

		} else if (event >= 2200 && event <= 5000) {
			this.editForm.get("genre").setValue("Canter")

		} else {
			this.editForm.get("genre").setValue("Camion")

		}

	}
	get numCniesArray() {
		return this.editForm.get("numCnies") as FormArray;
	}

	addNumCnieField() {
		this.numCniesArray.push(new FormControl(""));
	}

	removeNumCnieField(index: number) {
		this.numCniesArray.removeAt(index);
	}
	get numPermisArray() {
		return this.editForm.get("numPermis") as FormArray;
	}

	addNumPermisField() {
		this.numPermisArray.push(new FormControl(""));
	}

	removeNumPermisField(index: number) {
		this.numPermisArray.removeAt(index);
	}

	protected createFromForm(): IVehicule {
		return {
			...new Vehicule(),
			id: this.Vehicule.id,
			refTransport: this.editForm.get(["refTransport"])!.value,
			numVehicule: this.editForm.get(["numVehicule"])!.value,
			numCarteGrise: this.editForm.get(["numCarteGrise"])!.value,
			numCnie: this.editForm.get(["numCnie"])!.value,
			tarra: this.editForm.get(["tarra"])!.value,
			genre: this.editForm.get(["genre"])!.value,
			nomConducteur: this.editForm.get(["nomConducteur"])!.value,
			tel: this.editForm.get(["tel"])!.value,
			message: this.editForm.get(["message"])!.value,
			numCnies: this.editForm.get(["numCnies"])!.value,
			numPermis: this.editForm.get(["numCnies"])!.value,
		};
	}
}

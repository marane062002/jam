import { Component, OnInit } from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl,
} from "@angular/forms";
import { AuthService } from "../../../../core/auth";
import { PersonnelService } from "../../rh/services/personnel.service";
import { OrganisationService } from "../../organisation/organisation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MustMatch } from "../user-new/must-match";
import { Location } from "@angular/common";

@Component({
	selector: "kt-user-edit-pwd",
	templateUrl: "./user-edit-pwd.component.html",
	styleUrls: ["./user-edit-pwd.component.scss"],
})
export class UserEditPwdComponent implements OnInit {
	loading = false;
	id: number;
	roles: any;
	registerForm: FormGroup;
	_existe: any;
	_confirmed: boolean;
	divisions: any;
	services: any;
	personnels: any;
	changePasse = new FormControl(false);

	constructor(
		private service: AuthService,
		private service1: PersonnelService,
		private service2: OrganisationService,
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private location: Location,
	) {
		this.route.queryParams.subscribe((params) => {
			this.id = params["id"];
		});
	}

	creatFormGroup(formBuilder: FormBuilder) {
		return formBuilder.group(
			{
				id:[null],
				idPersonnel: [0],
				idDivision:[0],
				idService:[0],
				fullname:['',Validators.required],
				username:[null],

				pic:[null]  ,
				password:{value:null},
				passeConfirmed:{value:null},
				roles:[]
			},
			{
				validator: MustMatch("password", "passeConfirmed"),
			}
		);
	}

	ngOnInit() {
		this.registerForm = this.creatFormGroup(this.fb);
		this.registerForm.get("password").setValue(null);
		this.registerForm.get("passeConfirmed").setValue(null);
		this.getRegisterFormData(this.id);
	}

	getRegisterFormData(id) {
		this.service.getRegisterFormData(id).then((data) => {
			this.registerForm.patchValue(data[0]);
		});
	}

	onSubmit() {
		const formValues = this.registerForm.value;
		const controls = this.registerForm.controls;
		/** check form */
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;
		const compte: any = Object.assign({}, formValues);
		this.service.updateCompte(compte, compte.id).subscribe(
			(data) => {
				this.location.back();
				this.loading = true;
			},
			(error) => (this._existe = error)
		);
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}

	compare(val1, val2) {
		if (val1 && val2) return val1.id === val2.id;
	}

	backList() {
		this.location.back();
	}
}

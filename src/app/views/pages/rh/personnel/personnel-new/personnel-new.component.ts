import { Component, OnInit } from "@angular/core";
import {
	FormControl,
	FormGroup,
	FormBuilder,
	Validators,
	FormArray,
} from "@angular/forms";
import { PersonnelService } from "../../services/personnel.service";
import { OrganisationService } from "../../../organisation/organisation.service";
import { Router } from "@angular/router";
import { MatriculeValidator } from "./matricule-validator";
import { UPDATE } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { delay, flatMap } from "rxjs/operators";
import localeAr from "@angular/common/locales/ar-MA";
import { registerLocaleData } from "@angular/common";
import { PjUsersService } from "../../../shared/pj-users.service";
import { NotificationService } from "../../../shared/notification.service";

registerLocaleData(localeAr, "ar");

@Component({
	selector: "kt-personnel-new",
	templateUrl: "./personnel-new.component.html",
	styleUrls: ["./personnel-new.component.scss"],
})
export class PersonnelNewComponent implements OnInit {
	loading = false;
	//notLoading = true;
	niveauAcademiques: any;
	typePersonnels: any;
	typeConges: any;
	sex: any;
	situationFamilials: any;
	personnelForm: FormGroup;
	id: any;
	divisions: any;
	services: any;
	existe = false;

	constructor(
		private service: PersonnelService,
		private service1: PjUsersService,
		private service2: OrganisationService,
		private matriculeValidator: MatriculeValidator,
		private translate: TranslateService,
		private router: Router,
		private fb: FormBuilder,
		private notification: NotificationService
	) {
		this.getData();
	}

	ngOnInit() {
		this.personnelForm = this.fb.group({
			matricule: ["", Validators.required],
			nom: ["", Validators.required],
			prenom: ["", Validators.required],
			telephonefix: [null],

			email: [
				"",
				Validators.compose([Validators.email, Validators.minLength(3)]),
			],
			grade: [0],
			echelle: [0],
			echlon: [0],
			cin: ["", Validators.required],
			idDivision: [0],
			idService: { value: 0, disabled: true },
			sex: [null, Validators.required],
			situationFamiliale: [null, Validators.required],
			nbEnfantsM: [0],
			nbEnfantsF: [0],
			telephoneGsm: [null],
			dateEmbauche: [new Date().toISOString()],
			typePersonnel: [null, Validators.required],
			niveauAcademique: [null],
			typesConges: [],
		});
	}

	async getData() {
		await this.service
			.getData()
			// .pipe(delay(1000))
			.subscribe(
				(data) => {
					this.typeConges = data[0];
					this.niveauAcademiques = data[1];
					this.typePersonnels = data[2];
					this.sex = data[3];
					this.situationFamilials = data[4];
					this.divisions = data[5];

					// this.notLoading = false;
				},
				(err) => {
					// this.notLoading = false;
					console.log(err);
				}
			);
	}

	onSubmit() {
		const formValues = this.personnelForm.value;
		const controls = this.personnelForm.controls;
		/** check form */
		if (this.personnelForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.loading = true;
		const personnel: any = Object.assign({}, formValues);
		//console.log("Info: "+ JSON.stringify(personnel))

		this.service
			.postRessource(personnel, "/personnels/new")
			.pipe(flatMap((res) => this.service1.createDocUser(res.id)))
			.subscribe(
				(res1) => {
					this.router.navigate(["/personnel/personnel-index"]);
					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
					);
				},
				(error) => console.log(error)
			);

		/*.subscribe(data =>{

             // this.router.navigate(['/personnel/personnel-show'], { queryParams: { id: data.id } })
              this.router.navigate(['/personnel/personnel-index'])


               },
              error => console.log(error)
            );  */
	}

	getServices(ob) {
		const id = ob.value;
		if (id != 0) {
			this.personnelForm.get("idService").enable();
			this.service2
				.getRessourceById(id, "/services/divisions/")
				.subscribe(
					(data) => {
						(this.services = data), console.log(this.services);
					},
					(error) => console.log(error)
				);
		} else {
			this.personnelForm.get("idService").setValue(0);
			this.personnelForm.get("idService").disable();
		}
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.personnelForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
	}

	checkMatricule() {
		const val = this.personnelForm.get("matricule").value;

		if (val) {
			this.service.checkMatricule(val).subscribe((res) => {
				if (res) {
					alert(
						this.translate.instant("PAGES.GENERAL.ALREADY_EXIST")
					);
					this.personnelForm.get("matricule").setValue("");
				}
			});
		}
	}

	onReset(){
		this.personnelForm.reset();
	}
	backList(){
		this.router.navigate(["/personnel/personnel-index"]);
	}
}

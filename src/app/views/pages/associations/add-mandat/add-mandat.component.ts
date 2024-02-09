import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AssociationService } from "../../utils/association.service";
import { Location } from "@angular/common";
import { NotificationService } from '../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: "kt-add-mandat",
	templateUrl: "./add-mandat.component.html",
	styleUrls: ["./add-mandat.component.scss"],
})
export class AddMandatComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	addForm: FormGroup;

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

	ngOnInit() { }
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
			.createObject("/mandatBureau/new", this.addForm.value)
			.subscribe(
				(data) => {
					this.location.back();
					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
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
			mandat: [""],
			dateDebut: [""],
			dateFin: [""],
			dureeMandat: [],
			dateRenouvelementBureau: [""],
			derniereAssembleeGene: [""],
			totalMembre: [0],
			totalMMembre: [0],
			totalFMembre: [0],
			president: [""],
			visePresident: [""],
			association: this.fb.group({
				id: [id],
			})
		});
	}

	// ============================================
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
	}
	// ============================================
	// back to list
	// ============================================
	back() {
		let id = this.route.snapshot.params["id"];
		this.router.navigate(["associations/show-association/" + id]);
	}
	// ============================================
	// Date debut change
	// ============================================

	dateDemarrageChangeFin(){

		let dateDp = this.addForm.controls['derniereAssembleeGene'].value
		let tmp = new Date(dateDp)
		let mois = Number(dateDp.getMonth())
		let duree = Number(this.addForm.controls['dureeMandat'].value)
		let num = mois+duree
		tmp.setMonth(num)

		this.addForm.controls['dateFin'].setValue(tmp);

	}

/*	dateDemarrageChangeDebut() {
		//this.addForm.get("dateFin").reset();
		//this.addForm.controls['dureeMandat'].reset();
		let dateFp = this.addForm.controls['dateFin'].value
		let dateDp = this.addForm.controls['dateDebut'].value
		if (dateFp && dateDp) {
			if (dateFp >= dateDp) {
				let diffc = dateFp.getTime() - dateDp.getTime();
				let duree = Math.round(Math.abs(diffc / (1000 * 60 * 60 * 24)));
				this.addForm.controls['dureeMandat'].setValue(duree)
			} else {
				this.addForm.get("dateFin").reset();
				this.addForm.controls['dureeMandat'].reset();
			}
		}
	}*/
	// ============================================
	// Date fin change
	// ============================================
	/*dateDemarrageChangeFin() {
		let dateFp = this.addForm.controls['dateFin'].value
		let dateDp = this.addForm.controls['dateDebut'].value
		if (dateFp && dateDp) {
			if (dateFp >= dateDp) {
				let diffc = dateFp.getTime() - dateDp.getTime();
				let duree = Math.round(Math.abs(diffc / (1000 * 60 * 60 * 24)));
				this.addForm.controls['dureeMandat'].setValue(duree)
			} else {
				this.addForm.get("dateFin").reset();
				this.addForm.controls['dureeMandat'].reset();
			}
		}
	}*/
	/** ================================================
 * Checking control validation
 *
 * @param controlName: string => Equals to formControlName
 * @param validationType: string => Equals to valitors name
 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.addForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}

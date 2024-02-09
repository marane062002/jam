import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssociationService } from '../../utils/association.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'kt-edit-mandat',
  templateUrl: './edit-mandat.component.html',
  styleUrls: ['./edit-mandat.component.scss']
})
export class EditMandatComponent implements OnInit {

	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	addForm: FormGroup;
	id:any;
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

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.service
			.getObjectById("/mandatBureau/show/", this.id)
			.subscribe((data) => {
				this.addForm.patchValue(data);
				this.addForm.controls['dateDebut'].patchValue(new Date(data.dateDebut).toISOString());
				this.addForm.controls['dateFin'].patchValue(new Date(data.dateFin).toISOString());
				this.addForm.controls['dateRenouvelementBureau'].patchValue(new Date(data.dateRenouvelementBureau).toISOString());
				this.addForm.controls['derniereAssembleeGene'].patchValue(new Date(data.derniereAssembleeGene).toISOString());
			});
	}
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
			.pipe(first())
			.subscribe(
				(data) => {
					this.location.back();
					this.notification.warn(
						this.translate.instant(
							"PAGES.GENERAL.MSG_UPDATE_CONFIRMED"
						)
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
			id:[],
			mandat: ["", Validators.required],
			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
			dureeMandat: [0, Validators.required],
			dateRenouvelementBureau:[""],
			derniereAssembleeGene:[""],
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
	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}
	// ============================================
	// Date debut change
	// ============================================
	dateDemarrageChangeDebut(){
		//this.addForm.get("dateFin").reset();
		//this.addForm.controls['dureeMandat'].reset();
		let dateFp = this.addForm.controls['dateFin'].value
   		let dateDp = this.addForm.controls['dateDebut'].value
		if(dateFp && dateDp){
			if(dateFp >= dateDp){
				let diffc = dateFp.getTime() - dateDp.getTime();
				let duree = Math.round(Math.abs(diffc/(1000*60*60*24)));
				this.addForm.controls['dureeMandat'].setValue(duree)
			}else{
				this.addForm.get("dateFin").reset();
				this.addForm.controls['dureeMandat'].reset();
			}
		}
	}
	// ============================================
	// Date fin change
	// ============================================
	dateDemarrageChangeFin(){
		let dateFp = this.addForm.controls['dateFin'].value
   		let dateDp = this.addForm.controls['dateDebut'].value
		if(dateFp && dateDp){
			if(dateFp >= dateDp){
				let diffc = dateFp.getTime() - dateDp.getTime();
				let duree = Math.round(Math.abs(diffc/(1000*60*60*24)));
				this.addForm.controls['dureeMandat'].setValue(duree)
			}else{
				this.addForm.get("dateFin").reset();
				this.addForm.controls['dureeMandat'].reset();
			}
   		}
	}
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

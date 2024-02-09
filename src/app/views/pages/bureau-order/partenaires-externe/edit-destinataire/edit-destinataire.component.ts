import { Component, OnInit } from '@angular/core';
import { BoServiceService } from '../../../utils/bo-service.service';
import { PersonnelService } from '../../../rh/services/personnel.service';
import { OrganisationService } from '../../../organisation/organisation.service';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'kt-edit-destinataire',
  templateUrl: './edit-destinataire.component.html',
  styleUrls: ['./edit-destinataire.component.scss']
})
export class EditDestinataireComponent implements OnInit {
// ============================================================
	//
	// ============================================================
	loading = false;
	courrierId: number;
	partnerId: number;
	showInterne = false;
	showExterne = true;
	submitted = false;
	partenaires:any;
	divisions: any;
	services: any;
	personnels: any;
	editForm: FormGroup;
	// ============================================================
	//
	// ============================================================
	constructor(
		private service: BoServiceService,
		private service1: PersonnelService,
		private service2: OrganisationService,
		private notification: NotificationService,
		private translate: TranslateService,
		private router: Router,
		private fb: FormBuilder
	) {
		this.partnerId = +window.localStorage.getItem("partnerId");
		this.formBuild(this.partnerId);
		this.getDivisions();
	}
	// ============================================================
	//
	// ============================================================
	ngOnInit() {
		this.changedOrganisationList();

		this.getData();
	}
	// ============================================================
	//
	// ============================================================
	changedOrganisationList(){
		const _this = this; // important !!!
		this.editForm.get('idDivision').valueChanges.subscribe(
			value=> {
				if(value!=0){
					this.service2.getRessourceById(value,'/services/divisions/')
				  .subscribe(data =>{
					_this.services = data;
					 },
					error => console.log(error)
				  );
				}
			}
		 );
		 this.editForm.get('idService').valueChanges.subscribe(
			value=> {
				if(value!=0){
					this.service1.getRessourceById(value,'/personnels/service/')
				  .then(data =>{
					_this.personnels = data;
					 },
					error => console.log(error)
				  );
				}
				this.editForm.get('idDivision').valueChanges.subscribe(
					value=> {
						if(value!=0){
							this.service1.getRessourceById(value,'/personnels/division/')
						  .then(data =>{
							_this.personnels = data;
							 },
							error => console.log(error)
						  );
						}
					}
				 );
			}
		 );
	}
	// ============================================================
	// Charger les liste externe
	// ============================================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.partenaires = data[1];
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ============================================================
	//
	// ============================================================
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// ============================================================
	//
	// ============================================================
	onChangeDivision() {
		const idDivision = this.editForm.get("idDivision").value;
		this.editForm.get("idService").setValue(0);
		this.editForm.get("idPersonnel").setValue(0);

		if (idDivision != 0) {
			this.service1
				.getRessourceById(idDivision, "/personnels/division/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
			this.service2
				.getRessourceById(idDivision, "/services/divisions/")
				.subscribe(
					(data) => {
						this.services = data;
					},
					(error) => console.log(error)
				);
		} else {
			this.services = null;
			this.personnels = null;
		}
	}
	// ============================================================
	//
	// ============================================================
	onChangeService() {
		const idService = this.editForm.get("idService").value;
		const idDivision = this.editForm.get("idDivision").value;
		this.editForm.get("idPersonnel").setValue(0);

		if (idService != 0) {
			this.service1
				.getRessourceById(idService, "/personnels/service/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
		} else if (idDivision != 0) this.onChangeDivision();
	}
	// ============================================================
	//
	// ============================================================
	formBuild(idPartner:number) {
		this.courrierId = +window.localStorage.getItem("csId");
		this.editForm = this.fb.group({
			id: [idPartner],
			courrierSortant:this.fb.group({
				id: [this.courrierId],
			}),
			typeDestinataire: [""],
			partenaire: [0],
			idDivision: [0],
			idService: [0],
			idPersonnel: [0],
		});
		this.getDestinataire(idPartner);
	}
	// ============================================================
	//
	// ============================================================
	getDestinataire(courrierId:number){
		this.service
			.getAllObjectById("/partenaire/show/", +courrierId)
			.subscribe((data) => {
				this.editForm.patchValue(data);
			});
	}
	// ============================================================
	//
	// ============================================================
	selectionChanged() {
		const type = this.editForm.get('typeDestinataire').value;
		if (type == "out") {
			this.showExterne = true;
			this.showInterne = false;
			this.editForm.get("idDivision").reset();
			this.editForm.get("idService").reset();
			this.editForm.get("idPersonnel").reset();
		} else {
			this.showExterne = false;
			this.showInterne = true;
			this.editForm.get("partenaire").reset();
		}
	}
	// ============================================================
	//
	// ============================================================
	onSubmit() {
		this.editDestinataire();
	}
	// ============================================================
	//
	// ============================================================
	editDestinataire(){
		this.submitted = true;
		if (this.editForm.invalid) {
			return;
		}
		this.loading = true;

		this.service
			.updateObject("/partenaire/edit/", this.editForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED")
					);
					this.router.navigate(["partenaires-externe/add-partenaires-externe"]);
				},
				(error) => {
					alert(error);
				}
			);
	}
	// ============================================================
	//
	// ============================================================
	backList() {
		this.router.navigate(["partenaires-externe/add-partenaires-externe"]);
	}
	// ============================================================
	//
	// ============================================================
	onReset() {
		this.submitted = false;
		this.editForm.reset();
	}
}

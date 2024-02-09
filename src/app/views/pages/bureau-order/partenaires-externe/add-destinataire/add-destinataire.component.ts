import { Component, OnInit } from "@angular/core";
import { BoServiceService } from '../../../utils/bo-service.service';
import { PersonnelService } from '../../../rh/services/personnel.service';
import { OrganisationService } from '../../../organisation/organisation.service';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: "kt-add-destinataire",
	templateUrl: "./add-destinataire.component.html",
	styleUrls: ["./add-destinataire.component.scss"],
})
export class AddDestinataireComponent implements OnInit {
	// ============================================================
	//
	// ============================================================
	loading = false;
	courrierId: number;
	showInterne = false;
	showExterne = true;
	submitted = false;
	partenaires:any;
	divisions: any;
	services: any;
	personnels: any;
	addForm: FormGroup;
	selectedList: string;
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
		this.getDivisions();
	}
	// ============================================================
	//
	// ============================================================
	ngOnInit() {

		this.formBuild();

		this.getData();

		this.selectedList = "out";
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
		const idDivision = this.addForm.get("idDivision").value;
		this.addForm.get("idService").setValue(0);
		this.addForm.get("idPersonnel").setValue(0);

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
			this.onChangePersonnel();
		}
	}
	// ============================================================
	//
	// ============================================================
	onChangePersonnel() {
		const personnel = this.addForm.get("idPersonnel").value;
	}
	// ============================================================
	//
	// ============================================================
	onChangeService() {
		const idService = this.addForm.get("idService").value;
		const idDivision = this.addForm.get("idDivision").value;
		this.addForm.get("idPersonnel").setValue(0);

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
	formBuild() {
		this.courrierId = +window.localStorage.getItem("csId");
		this.addForm = this.fb.group({
			id: [],
			courrierSortant:this.fb.group({
				id: [this.courrierId],
			}),
			typeDestinataire: [""],
			partenaire: [0],
			idDivision: [0],
			idService: [0],
			idPersonnel: [0],
		});
	}
	// ============================================================
	//
	// ============================================================
	selectionChanged() {
		const type = this.addForm.get('typeDestinataire').value;
		if (type == "out") {
			this.showExterne = true;
			this.showInterne = false;
			this.addForm.get("idDivision").reset();
			this.addForm.get("idService").reset();
			this.addForm.get("idPersonnel").reset();
		} else {
			this.showExterne = false;
			this.showInterne = true;
			this.addForm.get("partenaire").reset();
		}
	}
	// ============================================================
	//
	// ============================================================
	onSubmit() {
		this.addDestinataire();
	}
	// ============================================================
	//
	// ============================================================
	addDestinataire(){
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.loading = true;
		this.service
			.createObject("/partenaire/new", this.addForm.value)
			.subscribe((data) => {
				this.notification.warn(
					this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
				);
				this.router.navigate(["partenaires-externe/add-partenaires-externe"]);
			});
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
		this.addForm.reset();
	}
}

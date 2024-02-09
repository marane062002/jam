import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BoServiceService } from '../../../utils/bo-service.service';
import { PersonnelService } from '../../../rh/services/personnel.service';
import { OrganisationService } from '../../../organisation/organisation.service';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { MatRadioChange, MatRadioButton } from '@angular/material';
import { NotificationType } from '../../../shared/NotificationMessage.service';

interface destinataires {
	libelle: string;
}

@Component({
	selector: 'kt-add-destinataire',
	templateUrl: './add-destinataire.component.html',
	styleUrls: ['./add-destinataire.component.scss']
})
export class AddDestinataireComponent implements OnInit {
	// ============================================================
	//
	// ============================================================
	loading = false;
	courrierId: number;
	submitted = false;
	partenaires: any;
	divisions: any;
	services: any;
	personnels: any;
	addForm: FormGroup;
	selectedList: string;
	organigramme = true;
	autre = false;
	nature: string;
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() change: EventEmitter<MatRadioChange>;
	listDestinataire: destinataires[];

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
		private fb: FormBuilder,
		private location: Location
	) {
		this.getDivisions();
	}
	// ============================================================
	//
	// ============================================================
	ngOnInit() {
		this.formBuild();

		this.listDestinataire = [
			{ libelle: "ديوان الرئاسة" },
			{ libelle: "المقاطعة" },
			{ libelle: "المديرية العامة" },
		];

		this.addForm.get("idDivision").setValidators(Validators.required);
		this.addForm.get("typeDestinataire").setValidators(null);

		this.addForm.get('idDivision').updateValueAndValidity();
		this.addForm.get('typeDestinataire').updateValueAndValidity();
	}
	// ============================================================
	//
	// ============================================================
	getDivisions() {
		this.service.getAllObject("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// ============================================================
	//
	// ============================================================
	onChangeDivision() {
		const idDivision = this.addForm.get("idDivision").value;
		this.addForm.get("idService").setValue(0);
		this.addForm.get("idPersonne").setValue(0);

		if (idDivision != 0) {
			this.service1
				.getRessourceById(idDivision, "/personnels/division/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
			this.service
				.getDivisionById("/services/divisions/", idDivision)
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
		const idService = this.addForm.get("idService").value;
		const idDivision = this.addForm.get("idDivision").value;
		this.addForm.get("idPersonne").setValue(0);

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
		let courrierId = +window.localStorage.getItem("courrId");
		this.addForm = this.fb.group({
			id: [],
			idDivision: [0, Validators.required],
			idService: [0],
			idPersonne: [0],
			natureDestinataire: ["organigramme", Validators.required],
			typeDestinataire: [null, Validators.required],
			designation: [null],
			courrierEntrant: this.fb.group({
				id: [courrierId],
			}),
		});
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
	addDestinataire() {
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.loading = true;
		this.service
			.createObject("/destinataireCouriers/new", this.addForm.value)
			.subscribe((data) => {
				this.notification.sendMessage({
					message: 'تم تسجيل إختيارك !',
					type: NotificationType.info
				}),
					//this.router.navigate(["destinataire-courrier/add-destinataire-courrier"]);
					this.location.back();
			});
	}
	// ============================================================
	//
	// ============================================================
	backList() {
		this.router.navigate(["destinataire-courrier/add-destinataire-courrier"]);
	}
	// ============================================================
	//
	// ============================================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
	}
	// ============================================================
	//
	// ============================================================
	selectionChanged(event: MatRadioChange) {
		console.log("value changed : " + event.value);
		if (event.value == "organigramme") {
			this.organigramme = true;
			this.autre = false;

			this.addForm.get("idDivision").setValue(0);
			this.addForm.get("idPersonne").setValue(0);
			this.addForm.get("idPersonne").setValue(0);
			this.addForm.get("typeDestinataire").reset();
			this.addForm.get("designation").reset();

			this.addForm.get("idDivision").setValidators(Validators.required);
			this.addForm.get("typeDestinataire").setValidators(null);
		} else {
			this.organigramme = false;
			this.autre = true;

			this.addForm.get("idDivision").setValue(0);
			this.addForm.get("idPersonne").setValue(0);
			this.addForm.get("idPersonne").setValue(0);
			this.addForm.get("typeDestinataire").reset();
			this.addForm.get("designation").reset();

			this.addForm.get("typeDestinataire").setValidators(Validators.required);
			this.addForm.get("idDivision").setValidators(null);
		}
		this.addForm.get('idDivision').updateValueAndValidity();
		this.addForm.get('typeDestinataire').updateValueAndValidity();
	}

	// test radio button
	onChangeVal(mrChange: MatRadioChange) {
		console.log("change value" + mrChange.value);
		let mrButton: MatRadioButton = mrChange.source;
		console.log(mrButton.name);
		console.log(mrButton.checked);
		console.log(mrButton.inputId);
	}

	// ControlValueAccessor Implementation
	onChange: any = () => { };
	onTouched: any = () => { };

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BoServiceService } from '../../../utils/bo-service.service';
import { PersonnelService } from '../../../rh/services/personnel.service';
import { OrganisationService } from '../../../organisation/organisation.service';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatRadioChange, MatRadioButton } from '@angular/material';

interface destinataires {
	libelle: string;
}

@Component({
	selector: 'kt-edit-destinataire-courrierConv',
	templateUrl: './edit-destinataire-courrierConv.component.html',
	styleUrls: ['./edit-destinataire-courrierConv.component.scss']
})
export class EditDestinataireCourrierConvComponent implements OnInit {

	courrier_conv_id:any;
	loading = false;
	destinId: number;
	showInterne = false;
	showExterne = true;
	submitted = false;
	partenaires: any;
	divisions: any;
	services: any;
	personnels: any;
	editForm: FormGroup;

	organigramme: boolean;
	autre: boolean;
	nature: string;
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() change: EventEmitter<MatRadioChange>;
	listDestinataire: destinataires[];


	constructor(
		private service: BoServiceService,
		private service1: PersonnelService,
		private service2: OrganisationService,
		private notification: NotificationService,
		private translate: TranslateService,
		private router: Router,
		private fb: FormBuilder
	) {
		this.destinId = +window.localStorage.getItem("deCeId");
		this.formBuild(this.destinId);
		this.getDivisions();
	}


	ngOnInit() {
		this.changedOrganisationList();

		this.listDestinataire = [
			{ libelle: "ديوان الرئاسة" },
			{ libelle: "المقاطعة" },
			{ libelle: "المديرية العامة" },
		];
	}


	changedOrganisationList() {
		const _this = this;
		this.editForm.get('idDivision').valueChanges.subscribe(
			value => {
				if (value != 0) {
					this.service
						.getDivisionById("/services/divisions/", value)
						.subscribe(data => {
							_this.services = data;
						},
							error => console.log(error)
						);
				}
			}
		);
		this.editForm.get('idDivision').valueChanges.subscribe(
			value => {
				if (value != 0) {
					this.service1.getRessourceById(value, '/personnels/division/')
						.then(data => {
							_this.personnels = data;
						},
							error => console.log(error)
						);
				}
			}
		);
		this.editForm.get('idService').valueChanges.subscribe(
			value => {
				if (value != 0) {
					this.service1.getRessourceById(value, '/personnels/service/')
						.then(data => {
							_this.personnels = data;
						},
							error => console.log(error)
						);
				}
				this.editForm.get('idDivision').valueChanges.subscribe(
					value => {
						if (value != 0) {
							this.service1.getRessourceById(value, '/personnels/division/')
								.then(data => {
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


	getDivisions() {
		this.service.getAllObject("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}


	onChangeDivision() {
		const idDivision = this.editForm.get("idDivision").value;
		this.editForm.get("idService").setValue(0);
		this.editForm.get("idPersonne").setValue(0);

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
	
	onChangeService() {
		const idService = this.editForm.get("idService").value;
		const idDivision = this.editForm.get("idDivision").value;
		this.editForm.get("idPersonne").setValue(0);

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

	formBuild(idDest: number) {
		this.courrier_conv_id = parseInt(window.localStorage.getItem("courrier_conv_id"));
		this.editForm = this.fb.group({
			id: [idDest],
			idDivision: [""],
			idService: [0],
			idPersonne: [0],
			natureDestinataire: [""],
			typeDestinataire: [""],
			designation: [""],
			courrierConvocation: this.fb.group({
				id: [this.courrier_conv_id],
			}),
			statutConvocation:[''],
			motif:['']
		});
		this.getDestinataire(idDest);

		this.editForm.get('natureDestinataire').valueChanges.subscribe(
			value => {
				this.editForm.get("idDivision").setValidators(null);
				this.editForm.get("typeDestinataire").setValidators(null);
				console.log("natureDestinataire value: " + value)
				if (value == null || value == "") {
					this.organigramme = true;
					this.autre = true;
				} else if (value != null || value != "") {
					if (value == "autre") {
						this.organigramme = false;
						this.autre = true;
					} else {
						this.organigramme = true;
						this.autre = false;
					}

				}

			}
		);
		this.editForm.get('idDivision').updateValueAndValidity();
		this.editForm.get('typeDestinataire').updateValueAndValidity();
	}

	getDestinataire(destId: number) {
		this.service
			.getAllObjectById("/destinataireCourriersConvocations/show/", +destId)
			.subscribe((data) => {
				this.editForm.patchValue(data);
			});
	}

	onSubmit() {
		this.editDestinataire();
	}

	editDestinataire() {
		this.submitted = true;
		if (this.editForm.invalid) {
			return;
		}
		this.loading = true;
		this.service
			.updateObject("/destinataireCourriersConvocations/edit/", this.editForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED")
					);
					this.router.navigate(["destinataire-courrier/add-destinataire-courrier-convocation"]);
				},
				(error) => {
					alert(error);
				}
			);
	}

	backList() {
		this.router.navigate(["destinataire-courrier/add-destinataire-courrier-convocation"]);
	}

	onReset() {
		this.submitted = false;
		this.editForm.reset();
	}

	selectionChanged(event: MatRadioChange) {
		console.log("value changed : " + event.value);
		if (event.value == "organigramme") {
			this.organigramme = true;
			this.autre = false;

			this.editForm.get("idDivision").reset();
			this.editForm.get("idPersonne").reset();
			this.editForm.get("idPersonne").reset();
			this.editForm.get("typeDestinataire").reset();
			this.editForm.get("designation").reset();

			this.editForm.get("idDivision").setValidators(Validators.required);
			this.editForm.get("typeDestinataire").setValidators(null);
		} else {
			this.organigramme = false;
			this.autre = true;

			this.editForm.get("idDivision").reset();
			this.editForm.get("idPersonne").reset();
			this.editForm.get("idPersonne").reset();
			this.editForm.get("typeDestinataire").reset();
			this.editForm.get("designation").reset();

			this.editForm.get("typeDestinataire").setValidators(Validators.required);
			this.editForm.get("idDivision").setValidators(null);
		}
		this.editForm.get('idDivision').updateValueAndValidity();
		this.editForm.get('typeDestinataire').updateValueAndValidity();
	}

	onChangeVal(mrChange: MatRadioChange) {
		console.log("change value" + mrChange.value);
		let mrButton: MatRadioButton = mrChange.source;
		console.log(mrButton.name);
		console.log(mrButton.checked);
		console.log(mrButton.inputId);
	}

	onChange: any = () => { };
	onTouched: any = () => { };
}

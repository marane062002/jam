import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BoServiceService } from '../../../utils/bo-service.service';
import { PersonnelService } from '../../../rh/services/personnel.service';
import { OrganisationService } from '../../../organisation/organisation.service';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { AuthService } from '../../../../../core/auth/_services/auth.service';
import { userInfo } from 'os';

@Component({
	selector: 'kt-add-destinataire-interne',
	templateUrl: './add-destinataire-interne.component.html',
	styleUrls: ['./add-destinataire-interne.component.scss']
})
export class AddDestinataireInterneComponent implements OnInit {

	// ============================================================
	//
	// ============================================================
	loading = false;
	courrierId: number;
	submitted = false;
	partenaires: any;
	divisions: any;
	services: any;
	personnels: any[];
	addForm: FormGroup;
	selectedList: string;
	idDivision;
	// ============================================================
	//
	// ============================================================
	constructor(
		private service: BoServiceService,
		private serviceUser: AuthService, 
		private service1: PersonnelService,
		private service2: OrganisationService,
		private notification: NotificationService,
		private translate: TranslateService,
		private router: Router,
		private fb: FormBuilder,
		private location: Location,
		private activatedRoute: ActivatedRoute,
	) {
		//this.getDivisions();

		this.activatedRoute.queryParams.subscribe((params) => {
			this.idDivision = params["div"];
			this.idPerson = params["chefDiv"];
		});

		this.getServices();

	}
	// ============================================================
	//
	// ============================================================
	idPerson;

	ngOnInit() {
		this.formBuild();
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
	// userinfo;
	usercompte
	getServices() {
		let nom = localStorage.getItem('fullnameUser');
		this.serviceUser.getUserByUserName(nom).then((res: any) => {
			console.log(res);
			this.usercompte = res;
			// this.service1.getPersonnelById(this.usercompte.idPersonnel).then((res) => {
			// 	console.log(res);
			// 	this.userinfo = res;
				let bo = {
					chefService: 0,
					id: this.usercompte.idService, 
					libelle: "مكتب الضبط",
					libelleFR: "BO"
				}
				this.service2
					.getRessourceById(this.idDivision, "/services/divisions/")
					.subscribe(
						(data) => {
							this.services = data;
							this.services.push(bo);
						},
						(error) => console.log(error)
					);
			// })
		})


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
	isChefDivision: boolean = false;
	nomPrenomChefDivision = null;
	onChangeService() {
		this.personnels = [];
		const idService = this.addForm.get("idService").value;
		const idDivision = this.addForm.get("idDivision").value;
		this.addForm.get("idPersonne").setValue(0);
		if (idService == this.usercompte.idService) {
			this.isChefDivision = true;
			// this.nomPrenomChefDivision = this.userinfo.nom + ' ' + this.userinfo.prenom;
			this.nomPrenomChefDivision = this.usercompte.fullname;
			this.addForm.value.idPersonne = parseInt(this.usercompte.idPersonnel);
			this.addForm.value.idDivision = parseInt(this.usercompte.idDivision);
			this.addForm.value.idService = parseInt(this.usercompte.idService);
			let courrierId = +window.localStorage.getItem("courrId");
			this.addForm = this.fb.group({
				id: [],
				idDivision: [this.usercompte.idDivision],
				idService: [this.usercompte.idService],
				idPersonne: [this.usercompte.idPersonnel],
				comment: "",
				courrierEntrant: this.fb.group({
					id: [courrierId],
				}),
			});
		}
		else if (idService != 0) {
			this.isChefDivision = false;
			this.service1
				.getRessourceById(idService, "/personnels/service/")
				.then(
					(data) => {
						for (let i = 0; i < data.length; i++) {
							if (data[i].id == parseInt(this.idPerson)) {
								data.splice(i, 1);
							}
						}
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
			idDivision: [],
			idService: [],
			idPersonne: [],
			comment: "",
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
		
		this.service.createObject("/destinataireCouriers/div/new", this.addForm.value)
			.subscribe((data) => {
				if (this.isChefDivision == true) {
					let courrierId = +window.localStorage.getItem("courrId");
					this.service.updateSatutCourrie(courrierId, 4).subscribe(res => {
						console.log(res);
					})
				}
				this.notification.warn(
					this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
				);
				//this.router.navigate(["destinataire-courrier/add-destinataire-courrier"]);
				this.location.back();
			});
	}
	// ============================================================
	//
	// ============================================================
	backList() {
		//this.router.navigate(["destinataire-courrier/show-destinataire-interne"]);
		this.location.back();
	}
	// ============================================================
	//
	// ============================================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
	}

}

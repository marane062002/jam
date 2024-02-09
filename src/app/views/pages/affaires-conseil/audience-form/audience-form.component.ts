import { Component, OnInit, ViewChild } from "@angular/core";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { FormGroup, FormControl } from "@angular/forms";
import { flatMap, delay } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { OrganisationService } from "../../organisation/organisation.service";
import { PersonnelService } from "../../rh/services/personnel.service";

@Component({
	selector: "kt-audience-form",
	templateUrl: "./audience-form.component.html",
	styleUrls: ["./audience-form.component.scss"],
})
export class AudienceFormComponent implements OnInit {
	// ====================================================
	//
	//=====================================================
	displayedColumns = [
		"objet",
		// "budget",
		// "dateRealisation",
		"statut",
		"actions",
	];
	displayedColumns1 = ["nom", "actions"];
	// ====================================================
	//
	//=====================================================
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================================
	//
	//=====================================================
	isLoading = false;
	dataSize = 0;
	participantInterne = { audience: { id: 1 } };
	formDataPE = { audience: { id: 1 } };
	services = [];
	divisions = [];
	personnels = [];
	sessionIds = [];
	showRadio = false;
	selectedStatus = 0;
	eventEditForm: FormGroup;
	timeDebutAudience = { hour: 10, minute: 10 };
	timeFinAudience = { hour: 10, minute: 10 };
	formDataPersonnel = { audience: {}, service: 0};
	dataSource2: MatTableDataSource<any>;
	dataSource1: MatTableDataSource<any>;
	personnelAudience = [];
	participantsExternes = [];
	membresBureau;
	// ====================================================
	//
	//=====================================================
	formData = {
		heureDebut: null,
		heureFin: null,
		session: { id: 0 },
		dateAudience: null,
		//numAudience: "",
	};
	// ====================================================
	//
	//=====================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router,
		private service2: OrganisationService,
		private service3: PersonnelService
	) {}
	// ====================================================
	//
	//=====================================================
	ngOnInit() {
		this.eventEditForm = new FormGroup({
			completed: new FormControl(),
		});
		this.getDivisions();
		this.service.getAllMembreConseilByMondatActuel().subscribe((res) => {
			this.membresBureau = res;
			console.log(res);
		});
		this.service.getSessionOperationnelle().subscribe((data) => {
			for (var i = 0; i < data.length; i++) {
				this.sessionIds.push(data[i]);
			}
		});

		this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
		this.paginator._intl.nextPageLabel = "الصفحة التالية";
		this.paginator._intl.previousPageLabel = "الصفحة السابقة";
		this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
		this.paginator._intl.firstPageLabel = "الصفحة الأولى";
	}
	// ====================================================
	//
	//=====================================================
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// ====================================================
	//
	//=====================================================
	onChangeDivision(f) {
		const idDivision = f.value;
		this.formDataPersonnel.service = 0;
		if (idDivision != 0) {
			this.service3
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
	// ====================================================
	//
	//=====================================================
	onChangeService(f) {
		const idService = f.value;
		if (idService != 0) {
			this.service3
				.getRessourceById(idService, "/personnels/service/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
		}
	}
	// ====================================================
	//
	//=====================================================
	onChangeofOptionsSession(id) {
		this.isLoading = false;
		const _this = this;
		this.service
			.PointsForAudience(id.value)
			.pipe(delay(300))
			.subscribe((data) => {
				_this.dataSize = data.length;
				console.log("data size:: " + _this.dataSource);
				this.isLoading = false;
				this.dataSource = new MatTableDataSource(data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				console.log(data);
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			});
	}
	// ====================================================
	//
	//=====================================================
	addPointAudience(row) {
		console.log(row);
		row.audience = { id: 1 };
		console.log(this.dataSource.data);
	}
	// ====================================================
	//
	//=====================================================
	deletePointAudience(row) {
		row.audience = null;
	}
	// ====================================================
	//
	//=====================================================
	deletePersonnel(row, i) {
		this.personnelAudience.splice(i, 1);
		this.dataSource1 = new MatTableDataSource(this.personnelAudience);
	}
	// ====================================================
	//
	//=====================================================
	deletePersonneExterne(row, i) {
		this.participantsExternes.splice(i, 1);
		this.dataSource2 = new MatTableDataSource(this.participantsExternes);
	}
	// ====================================================
	//
	//=====================================================
	addPersonnelAudience() {
		this.showRadio = false;
		this.personnelAudience.push(this.formDataPersonnel);
		this.dataSource1 = new MatTableDataSource(this.personnelAudience);
		this.dataSource1.sort = this.sort;
		this.formDataPersonnel = { audience: { id: 1 }, service: 0 };
		console.log(this.personnelAudience);
	}
	// ====================================================
	//
	//=====================================================
	addPersonneExterneAudience() {
		this.showRadio = false;
		this.participantsExternes.push(this.formDataPE);
		this.dataSource2 = new MatTableDataSource(this.participantsExternes);
		this.dataSource2.sort = this.sort;
		this.formDataPE = { audience: { id: 1 } };
		console.log(this.participantsExternes);
	}
	// ====================================================
	//
	//=====================================================
	nouvelleLigne() {
		this.showRadio = true;
	}
	// ====================================================
	//
	//=====================================================
	sendInvitesEtPoints(idAudience) {
		for (var i = 0; i < this.dataSource.data.length; i++) {
			if (this.dataSource.data[i].audience != null) {
				this.dataSource.data[i].audience = { id: idAudience };
			}
		}
		for (var i = 0; i < this.dataSource1.data.length; i++) {
			this.dataSource1.data[i].audience = { id: idAudience };
			this.dataSource1.data[i].personnel = this.dataSource1.data[
				i
			].personnel.id;
		}
		for (var i = 0; i < this.dataSource2.data.length; i++) {
			this.dataSource2.data[i].audience = { id: idAudience };
		}
		var arrMembreBureauAudience = [];
		for (var i = 0; i < this.membresBureau.length; i++) {
			var m = {
				membre: this.membresBureau[i],
				audience: { id: idAudience },
			};
			arrMembreBureauAudience.push(m);
		}
		this.router.navigate(["/affaires-conseil/audience-list"]);

		return forkJoin(
			this.service.sendPoints(this.dataSource.data),
			this.service.sendPersonnelsAudience(this.dataSource1.data),
			this.service.sendMembresConcoquesAudience(this.dataSource2.data),
			this.service.sendmembreBureauAudience(arrMembreBureauAudience)
		);
	}
	// ====================================================
	//
	//=====================================================
	send() {
		this.formData.heureDebut = new Date(
			"2000/12/12" +
				" " +
				this.timeDebutAudience.hour +
				":" +
				this.timeDebutAudience.minute
		);
		this.formData.heureFin = new Date(
			"2000/12/12" +
				" " +
				this.timeFinAudience.hour +
				":" +
				this.timeFinAudience.minute
		);
		this.service
			.sendAudience(this.formData)
			.pipe(flatMap((res) => this.sendInvitesEtPoints(res.id)))
			.subscribe((resfork) => {
				console.log(resfork);
				this.router.navigate(["/affaires-conseil/audience-list"]);
			});
	}
	// ====================================================
	//
	//=====================================================
	backList(){

	}
	// ====================================================
	//
	//=====================================================
	onReset(){

	}
}

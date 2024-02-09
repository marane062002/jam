import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { flatMap } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { OrganisationService } from "../../organisation/organisation.service";
import { PersonnelService } from "../../rh/services/personnel.service";

@Component({
	selector: "kt-commission-conseil",
	templateUrl: "./commission-conseil.component.html",
	styleUrls: ["./commission-conseil.component.scss"],
})
export class CommissionConseilComponent implements OnInit {
	// =====================================================================
	//
	// =====================================================================
	formData = { mondat: { id: 0 }, objectif: "", nomCommission: "" };
	formDataMembresCommission = {
		membre: { membre: {} },
		commission: {},
		role: { id: 0 },
	};
	formDataPersonnel = { commission: {}, role: { id: 0 }, service: 0 };
	membreConseilCommission = [];
	personnelConseilCommission = [];
	services = [];
	divisions = [];
	personnels = [];
	eventEditForm: FormGroup;
	public toggleForm: boolean;
	selectedStatus = 1;
	showRadio = 0;
	membresCommission;
	roleCommissionAll;
	mondat;
	// =====================================================================
	//
	// =====================================================================
	displayedColumns = ["nom", "actions"];
	displayedColumns1 = ["nom", "actions"];
	dataSource: MatTableDataSource<any>;
	dataSource1: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// =====================================================================
	//
	// =====================================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router,
		private service2: OrganisationService,
		private service3: PersonnelService
	) {}
	// =====================================================================
	//
	// =====================================================================
	ngOnInit() {
		this.getDivisions();
		this.eventEditForm = new FormGroup({
			completed: new FormControl(),
		});

		this.service.getMondatActuel().subscribe((data) => {
			this.mondat = data;
			console.log(data);
		});

		this.service.getAllRoleMembreCommission().subscribe((data) => {
			this.roleCommissionAll = data;
		});

		this.service.getAllMembreConseilByMondatActuel().subscribe((data) => {
			console.log(data);
			this.membresCommission = data;
		});
	}
	// =====================================================================
	//
	// =====================================================================
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// =====================================================================
	//
	// =====================================================================
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
	// =====================================================================
	//
	// =====================================================================
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
	// =====================================================================
	//
	// =====================================================================
	nouvelleLigne() {
		this.showRadio = 1;
	}
	// =====================================================================
	//
	// =====================================================================
	deleteMembre(row, i) {
		this.membreConseilCommission.splice(i, 1);
		this.dataSource = new MatTableDataSource(this.membreConseilCommission);
	}
	// =====================================================================
	//
	// =====================================================================
	deletePersonnel(row, i) {
		this.personnelConseilCommission.splice(i, 1);
		this.dataSource1 = new MatTableDataSource(
			this.personnelConseilCommission
		);
	}
	// =====================================================================
	//
	// =====================================================================
	addMembreConseil(f) {
		this.membreConseilCommission.push(this.formDataMembresCommission);
		console.log(this.formDataMembresCommission);
		console.log(this.membreConseilCommission);
		this.formDataMembresCommission = {
			membre: { membre: {} },
			commission: {},
			role: { id: 0 },
		};
		this.dataSource = new MatTableDataSource(this.membreConseilCommission);
		this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
		this.paginator._intl.nextPageLabel = "الصفحة التالية";
		this.paginator._intl.previousPageLabel = "الصفحة السابقة";
		this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
		this.paginator._intl.firstPageLabel = "الصفحة الأولى";
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	// =====================================================================
	//
	// =====================================================================
	addPersonnelCommission() {
		this.personnelConseilCommission.push(this.formDataPersonnel);
		this.dataSource1 = new MatTableDataSource(
			this.personnelConseilCommission
		);
		this.formDataPersonnel = {
			commission: {},
			role: { id: 0 },
			service: 0,
		};
		console.log(this.formDataPersonnel);
	}
	// =====================================================================
	//
	// =====================================================================
	test(commissionId) {
		for (var i = 0; i < this.membreConseilCommission.length; i++) {
			this.membreConseilCommission[i].commission.id = commissionId;
		}
		for (var i = 0; i < this.personnelConseilCommission.length; i++) {
			this.personnelConseilCommission[i].commission.id = commissionId;
			this.personnelConseilCommission[
				i
			].idPersonnel = this.personnelConseilCommission[i].idPersonnel.id;
		}
		this.router.navigate(["/affaires-conseil/commission-list"]);
		return forkJoin(
			this.service.sendMembreConseilCommission(
				this.membreConseilCommission
			),
			this.service.sendPersonnelCommission(
				this.personnelConseilCommission
			)
		);
	}
	// =====================================================================
	//
	// =====================================================================
	send() {
		this.formData.mondat.id = this.mondat[0].id;
		this.service
			.sendCommission(this.formData)
			.pipe(flatMap((res) => this.test(res.id)))
			.subscribe((resfork) => {
				this.router.navigate(["/affaires-conseil/commission-list"]);
			});
	}
	// =====================================================================
	//
	// =====================================================================
	backList() {}
	// =====================================================================
	//
	// =====================================================================
	onReset() {}
}

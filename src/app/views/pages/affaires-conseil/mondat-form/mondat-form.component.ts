import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { NgForm } from "@angular/forms";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router } from "@angular/router";
import { flatMap } from "rxjs/operators";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
	selector: "kt-mondat-form",
	templateUrl: "./mondat-form.component.html",
	styleUrls: ["./mondat-form.component.scss"],
})
export class MondatFormComponent implements OnInit {
	// =======================================================
	//
	// =======================================================
	loading = false;
	rolesAll;
	membresConseil = [];
	statutMondat = ["مفعلة", " أرشيف"];
	// =======================================================
	//
	// =======================================================
	formData = {
		membre: {
			tele: 0,
			mail: "",
			adresse: "",
			cin: "",
			nom: "",
			prenom: "",
		},
		mondat: { id: 0 },
		role: {},
	};
	formDataMondat = {
		statut: "",
		dateFinMondat: null,
		dateDebutMondat: null,
		id: 0,
	};
	// =======================================================
	//
	// =======================================================
	displayedColumns = [
		"nom",
		"prenom",
		"cin",
		"adresse",
		"tele",
		"mail",
		"role",
		"actions",
	];
	// =======================================================
	//
	// =======================================================
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// =======================================================
	//
	// =======================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router
	) {}
	// =======================================================
	//
	// =======================================================
	ngOnInit() {
		this.service.getAllRoleMembreConseil().subscribe((data) => {
			this.rolesAll = data;
		});
	}
	// =======================================================
	//
	// =======================================================
	nouvelleLigne() {
		document.getElementById("frmLigne").style.display = "inline";
	}
	// =======================================================
	//
	// =======================================================
	addMembreConseil() {
		document.getElementById("frmLigne").style.display = "none";
		this.membresConseil.push(this.formData);
		console.log(this.membresConseil);
		this.dataSource = new MatTableDataSource(this.membresConseil);
		this.formData = {
			membre: {
				tele: 0,
				mail: "",
				adresse: "",
				cin: "",
				nom: "",
				prenom: "",
			},
			mondat: { id: 0 },
			role: {},
		};
		this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
		this.paginator._intl.nextPageLabel = "الصفحة التالية";
		this.paginator._intl.previousPageLabel = "الصفحة السابقة";
		this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
		this.paginator._intl.firstPageLabel = "الصفحة الأولى";
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	// =======================================================
	//
	// =======================================================
	test(idMondat) {
		for (var i = 0; i < this.membresConseil.length; i++) {
			this.membresConseil[i].mondat.id = idMondat;
		}
		return this.service.sendMembreConseil(this.membresConseil);
	}
	// =======================================================
	//
	// =======================================================
	send() {
		this.service
			.sendmondat(this.formDataMondat)
			.pipe(flatMap((res) => this.test(res.id)))
			.subscribe((res1) => {
				this.router.navigate(["/affaires-conseil/mondat-list"]);
			});
	}
	// =======================================================
	//
	// =======================================================
	onSubmit(form: NgForm) {
		this.loading = true;
		this.service.sendmondat(this.formDataMondat).subscribe((res) => {
			this.router.navigate(["/affaires-conseil/mondat-list"]);
		});
	}
	// =======================================================
	//
	// =======================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// =======================================================
	//
	// =======================================================
	onReset(){
		this.formDataMondat.dateDebutMondat = "";
		this.formDataMondat.dateFinMondat = "";
		this.formDataMondat.statut = "";
	}
	// =======================================================
	//
	// =======================================================
	backList(){
		this.router.navigate(["/affaires-conseil/mondat-list"]);
	}
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { flatMap } from "rxjs/operators";

@Component({
	selector: "kt-session-form",
	templateUrl: "./session-form.component.html",
	styleUrls: ["./session-form.component.scss"],
})
export class SessionFormComponent implements OnInit {

	// =======================================================
	//
	// =======================================================
	formDataMembresSession = { membre: { membre: {} } };
	typeSession = ["عادية", "إستثنائية"];
	statutSession = ["مفتوحة", "منتهية", "ملغاة"];
	membresSession;
	mondat;
	loading = false;
	displayedColumns = ["nom", "actions"];
	// =======================================================
	//
	// =======================================================
	formData = {
		mondat: { id: 0 },
		id: 0,
		dateFinSession: null,
		dateDebutSession: null,
		type: "",
		nomSession: "",
		statut: "",
		//numSession: "",
	};
	// =======================================================
	//
	// =======================================================
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	membreConseilSession = [];
	president;
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
		this.service.getMondatActuel().subscribe((data) => {
			this.mondat = data;
			console.log('Mondat data: '+JSON.stringify(data,null,2))
		});
		this.service.getSessionOperationnelle().subscribe((data) => {
			for (var i = 0; i < data.length; i++) {
				var index = this.typeSession.indexOf(data[i].type);
				if (index !== -1) this.typeSession.splice(index, 1);
			}
		});
	}
	// =======================================================
	//
	// =======================================================
	nouvelleLigne() {
		document.getElementById("frmLigne").style.display = "inline";
		this.membreConseilSession.splice(2, 1);
	}
	// =======================================================
	//
	// =======================================================
	deleteMembre(row, i) {
		this.membreConseilSession.splice(i, 1);
		this.dataSource = new MatTableDataSource(this.membreConseilSession);
	}
	// =======================================================
	//
	// =======================================================
	addMembreConseil(f) {
		var m = { membre: {}, president: false, session: {} };
		m.membre = this.formDataMembresSession;
		this.membreConseilSession.push(m);
		console.log(this.membreConseilSession);
		this.formDataMembresSession = { membre: { membre: {} } };
		this.dataSource = new MatTableDataSource(this.membreConseilSession);
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
	/* test(idSession){
    for(var i=0;i<this.membreConseilSession.length;i++){
      this.membreConseilSession[i].session.id=idSession;
    }
    return this.service.sendMembreConseilSession(this.membreConseilSession);
  }*/
	// =======================================================
	//
	// =======================================================
	send() {
		this.loading = true;
		console.log("Data - "+ JSON.stringify(this.formData,null,2))
		this.formData.mondat.id = this.mondat[0].id;
		console.log("Numero de session: "+ this.formData)

		this.service.sendSession(this.formData).subscribe((res1) => {
			this.router.navigate(["/affaires-conseil/session-list"]);
		});

	}
}

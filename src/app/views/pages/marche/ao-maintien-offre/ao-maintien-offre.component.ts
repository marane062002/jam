import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AoService } from '../../shared/ao.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'kt-ao-maintien-offre',
  templateUrl: './ao-maintien-offre.component.html',
  styleUrls: ['./ao-maintien-offre.component.scss']
})
export class AoMaintienOffreComponent implements OnInit {
	// ====================================================
	//
	//=====================================================
	constructor(
		private service: AoService,
		private router: Router,
		private translate: TranslateService,
		private notification: NotificationService
	) {
		this.populate();
	}
	// ====================================================
	//
	//=====================================================
	displayedColumns = [
		"numAo",
    "objet",
    "dateOverturePlis",
    "nbJourMaintienOffre",
		// "budgetEstimatif",
		"typeMarche",
		"statutAo",
		//"natureAo",
		"actions",
	];
	// ====================================================
	//
	//=====================================================
	dataSource: MatTableDataSource<AO>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================================
	//
	//=====================================================
	aoDatasource: AO[] = [];
	pps;
	isLoading = true;
	sizeData = 0;
	// ====================================================
	//
	//=====================================================
	ngOnInit() {}
	// ====================================================
	//
	//=====================================================
	public populate() {
		const _this = this;
		this.service.getMaintienOffre().then(
			(data) => {
				console.log("OUT DATA: " + JSON.stringify(data, null, 2));
				this.isLoading = false;
				_this.sizeData = data.length;
				this.dataSource = new MatTableDataSource(data);
				this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
				this.paginator._intl.nextPageLabel = "الصفحة التالية";
				this.paginator._intl.previousPageLabel = "الصفحة السابقة";
				this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
				this.paginator._intl.firstPageLabel = "الصفحة الأولى";
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				//this.dataSource.filter = "1";
			},
			(err) => {
				console.log(err);
				this.isLoading = false;
			}
		);
	}
	// ====================================================
	//
	//=====================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// ====================================================
	//
	//=====================================================
	createNewPPsource(i: number): AO {
		return {
			id: this.pps[i].id,
			numAo: this.pps[i].numAo,
      objet: this.pps[i].objet,
      dateOuverturePlis: this.pps[i].dateOuverturePlis,
      nbJourMaintienOffre: this.pps[i].nbJourMaintienOffre,
			// budgetEstimatif: this.pps[i].budgetEstimatif,
			// dateReception: this.pps[i].statutAo.libelle,
			statutAo: this.pps[i].statutAo,
			typeMarche: this.pps[i].typeMarche,
			// natureAo: this.pps[i].natureAo.libelle,
		};
	}
	// ====================================================
	//
	//=====================================================
	nouvelleao(idAo) {
		this.router.navigate(["/marches/ao-form"], {
			queryParams: { id: idAo },
		});
	}
	// ====================================================
	//
	//=====================================================
	AddBp(idAo) {
		this.router.navigate(["/marches/ligneBP-form"], {
			queryParams: { id: idAo },
		});
	}
	// ====================================================
	//
	//=====================================================
	showao(idAo) {
		this.router.navigate(["/marches/ao-detail"], {
			queryParams: { id: idAo },
		});
	}
	// ====================================================
	//
	//=====================================================
	editao(idAo) {
		this.router.navigate(["/marches/ao-edit"], {
			queryParams: { id: idAo },
		});
	}
	// ====================================================
	//
	//=====================================================
	editSm(idAo) {
		this.router.navigate(["/marches/ao-edit-sm"], {
			queryParams: { id: idAo },
		});
	}
	// ====================================================
	//
	//=====================================================
	deleteAo(idAo) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
			.deleteAoById(idAo)
			.subscribe(data => {
				console.log("AO deleted : " + idAo);
				this.populate();
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}
}
export interface AO {
	id: string;
	numAo: string;
	objet: string;
	statutAo: string;
	// budgetEstimatif: string;
	// dateReception: string;
	typeMarche: string;
  // natureAo: string;
  dateOuverturePlis: string;
  nbJourMaintienOffre : string;
}

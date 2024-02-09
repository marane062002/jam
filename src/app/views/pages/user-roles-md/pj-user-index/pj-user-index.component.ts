import {
	Component,
	OnInit,
	ViewChild,
	ViewChildren,
	QueryList,
} from "@angular/core";
import { PjUsersService } from "../../shared/pj-users.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { PersonnelService } from "../../rh/services/personnel.service";
import { TranslateService } from "@ngx-translate/core";
import { OrganisationService } from "../../organisation/organisation.service";
import { environment } from "../../../../../environments/environment";

@Component({
	selector: "kt-pj-user-index",
	templateUrl: "./pj-user-index.component.html",
	styleUrls: ["./pj-user-index.component.scss"],
})
export class PjUserIndexComponent implements OnInit {
	// ========================================================================
	//
	// ========================================================================
	array = [];
	idUser;
	pjsUser;
	isLoadingForDownload = false;
	pjsPartagesUser;
	pjsDatasource: any[] = [];
	dataSource: MatTableDataSource<any>;
	dataSource1: MatTableDataSource<any>;
	idAlfresco;
	nameDoc;
	idPersonneltarget;
	divisions;
	services;
	personnels;
	isSend = false;
	isLoadingForShare = false;
	ShowSuccessShare = false;
	id2;
	// ========================================================================
	//
	// ========================================================================
	displayedColumns = ["nom", "actions"];
	displayedColumns1 = ["nom", "nomUserSource", "actions"];
	// ========================================================================
	//
	// ========================================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild(MatPaginator, { static: true }) paginator1: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort1: MatSort;
	@ViewChildren(MatPaginator) paginator2 = new QueryList<MatPaginator>();
	@ViewChildren(MatSort) sort2 = new QueryList<MatSort>();
	// ========================================================================
	//
	// ========================================================================
	constructor(
		private service: PjUsersService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private translate: TranslateService,
		private service2: OrganisationService,
		private service1: PersonnelService
	) {
		this.getId();
		this.getDocs();
		this.getDivisions();
		this.getDocPartages();
	}
	// ========================================================================
	//
	// ========================================================================
	ngOnInit() {}
	// ========================================================================
	//
	// ========================================================================
	getId() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idUser = params["id"];
			//this.idUser='1111';
		});
	}
	// ========================================================================
	//
	// ========================================================================
	getDocs() {
		this.service.getByIdUser(this.idUser).then((data) => {
			this.isLoadingForDownload = false;
			console.log(data);
			this.dataSource = new MatTableDataSource(data);
			this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
			this.paginator._intl.nextPageLabel = "الصفحة التالية";
			this.paginator._intl.previousPageLabel = "الصفحة السابقة";
			this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
			this.paginator._intl.firstPageLabel = "الصفحة الأولى";
			this.dataSource.paginator = this.paginator2.toArray()[0];
			this.dataSource.sort = this.sort2.toArray()[0];
		});
	}
	// ========================================================================
	//
	// ========================================================================
	getDocPartages() {
		console.log(this.idUser);
		this.pjsDatasource = [];
		this.service.getPartagesByIdUser(this.idUser).then((data) => {
			console.log(data);
			this.pjsPartagesUser = data;
			for (let i = 0; i < this.pjsPartagesUser.length; i++) {
				this.pjsDatasource.push(this.createNewPj(i));
			}
			this.dataSource1 = new MatTableDataSource(this.pjsDatasource);
			this.paginator1._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
			this.paginator1._intl.nextPageLabel = "الصفحة التالية";
			this.paginator1._intl.previousPageLabel = "الصفحة السابقة";
			this.paginator1._intl.lastPageLabel = "الصفحة الأخيرة";
			this.paginator1._intl.firstPageLabel = "الصفحة الأولى";
			this.dataSource1.paginator = this.paginator2.toArray()[1];
			this.dataSource1.sort = this.sort2.toArray()[1];
		});
	}
	// ========================================================================
	//
	// ========================================================================
	save(event, id) {
		this.isLoadingForDownload = true;
		this.service.nouvellepj(event.target.files, id).subscribe((m) => {
			this.getDocs();
		});
	}
	// ========================================================================
	//
	// ========================================================================
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// ========================================================================
	//
	// ========================================================================
	onChangeDivision(f) {
		const idDivision = f.value;
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
	// ========================================================================
	//
	// ========================================================================
	onChangeService(f) {
		const idService = f.value;

		if (idService != 0) {
			this.service1
				.getRessourceById(idService, "/personnels/service/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
		}
	}
	// ========================================================================
	//
	// ========================================================================
	onChangePersonnel(f) {
		this.idPersonneltarget = f.value;
	}
	// ========================================================================
	//
	// ========================================================================
	partagerDocument(idAlf, docName) {
		this.isSend = true;
		this.idAlfresco = idAlf;
		this.nameDoc = docName;
		/* this.service.partagerpj(idAlf,docName,'1111','1111').subscribe(m => {

    })*/
	}
	// ========================================================================
	//
	// ========================================================================
	share() {
		this.isLoadingForShare = true;
		this.isSend = false;
		/*this.service.partagerpj(this.idAlfresco,this.nameDoc,
      14,14).subscribe(m => {
        this.isLoadingForShare=false;
        this.ShowSuccessShare=true;
        setTimeout(() => {
         this.hideS();
      }, 1500);
    })*/
		this.service
			.partagerpj(
				this.idAlfresco,
				this.nameDoc,
				this.idPersonneltarget,
				this.idUser
			)
			.subscribe((m) => {
				this.isLoadingForShare = false;
				this.ShowSuccessShare = true;
				setTimeout(() => {
					this.hideS();
				}, 1500);
			});
	}
	// ========================================================================
	//
	// ========================================================================
	hideS() {
		this.ShowSuccessShare = false;
	}
	// ========================================================================
	//
	// ========================================================================
	async getPersonnel(iduser, i) {
		await this.service1.getProfileById(iduser).subscribe((data) => {
			this.pjsDatasource[i].nomUserSource =
				data[0].nom + " " + data[0].prenom;
		});
	}
	// ========================================================================
	//
	// ========================================================================
	createNewPj(i: number): any {
		this.getPersonnel(this.pjsPartagesUser[i].idUserSourcePartage, i);
		return {
			id: this.pjsPartagesUser[i].id,
			name: this.pjsPartagesUser[i].name,
			idAlfresco: this.pjsPartagesUser[i].idAlfresco,
		};
	}
	// ========================================================================
	//
	// ========================================================================
	downloadpjPartage(f) {
		console.log(f);
		var r = f.substring(0, f.length - 4);

		window.open(environment.API_ALFRESCO_URL + "/PjUsers/" + "partage/" + r, "_blank");
	}
	// ========================================================================
	//
	// ========================================================================
	downloadpj(f) {
		console.log(f);
		var r = f.substring(0, f.length - 4);
		window.open(environment.API_ALFRESCO_URL + "/PjUsers/" + r, "_blank");
	}
	// ========================================================================
	//
	// ========================================================================
	deletepj(f) {
		this.service.deleteByIdpjs(f).subscribe((m) => {
			this.getDocs();
		});
	}
	// ========================================================================
	//
	// ========================================================================
	deletepjpartage(f) {
		console.log("in delete");
		this.service.deleteByIdpjsPartage(f).subscribe((m) => {
			this.getDocPartages();
		});
	}
}

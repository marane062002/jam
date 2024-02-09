import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AoService } from '../../shared/ao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-vali-dg-service-consultation',
  templateUrl: './vali-dg-service-consultation.component.html',
  styleUrls: ['./vali-dg-service-consultation.component.scss']
})
export class ValiDgServiceConsultationComponent implements OnInit {

  visa:FormGroup
	idao:number;
	  constructor(	private activatedRoute: ActivatedRoute,
		private aoService:AoService) {
		this.visa = new FormGroup({
		  note: new FormControl('',Validators.required),
		});
	   }
	
	   ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
				this.idao = params["id"];
			});
			this.getDetailsAo();
	  }
	
	  onSubmit(value:any){
		console.log(value);
		this.aoService.updateVisaDGS(this.idao, value).subscribe(res=>{
		  console.log(res);
		  Swal.fire(
			'Visa de DGS à été bien traité',
			' ',
			'success'
		  )
		  this.ngOnInit();
		},err=>{
		  console.log(err)
		})
	  
	  }
	  getDetailsAo() {
		// start spinner
			this.aoService	.getAoById(this.idao).subscribe(
					(data) => {
						console.log("AO " + JSON.stringify(data, null, 2))
					this.visa.get("note").setValue(data.visaDSF);
					},
					(err) => {
						console.log(err);
					}
				);
		}
	  /*
	isValide: boolean = false;
	dsf: number = 0;
	// ================================================================================
	//
	// ================================================================================
	constructor(
		private fb: FormBuilder,
		private service: AoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private fileService: FilesUtilsService,
		private notification: NotificationService,
		private translate: TranslateService
	) {}
	// ================================================================================
	//
	// ================================================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ================================================================================
	// Filter de recherche
	// ================================================================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	// ================================================================================
	//
	// ================================================================================
	dataSourceF = new MatTableDataSource<any>();
	dataSource1: MatTableDataSource<any>;
	dataSource: MatTableDataSource<Validation>;
	displayedColumns1 = ["type", "nomDoc"];
	displayedColumns = ["dateReponse", "reserve", "valide"];
	displayedColumnsF: string[] = [
		"icon",
		"name",
		"type",
		"dateFile",
		"fSize",
		"actions",
	];
	sizeDS1 = 0;
	// ================================================================================
	//
	// ================================================================================
	validationDatasource: Validation[] = [];
	formPj = { type: 0, selecetedFile: {} };
	allpjs = [];
	showAddDoc = false;
	unites;
	idao;
	validations;
	bool;
	ao;
	myForm: FormGroup;
	arr: FormArray;
	eventEditForm: FormGroup;
	selectedStatus = 1;
	selectedFiles = [];
	formDataDg = {
		valide: false,
		ao: { id: 1 },
		dateReponse: null,
		reserve: null,
	};
	data = [
		{ label: " الموافقة", checked: false },
		{ label: " الموافقة non", checked: false },
	];

	// ================================================================================
	//
	// ================================================================================
	ngOnInit() {
		this.eventEditForm = new FormGroup({
			completed: new FormControl(),
		});
		this.selectedStatus = 1;

		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
		});

		this.service.getAlltypePjAo().subscribe((res) => {
			console.log(res);
			this.unites = res;
		});
		this.service.getAoById(this.idao).subscribe((res) => {
			this.ao = res;
			console.log("getAoById: " + JSON.stringify(res, null, 2));
		});

		this.fileService.fileSizeDetector();

		this.service
			.getFilesByIdAndSMOdule(this.idao, "Validation DG services")
			.subscribe(
				(data) => {
					console.log("File PJ :: " + JSON.stringify(data, null, 2));
					if (data.length > 0) this.dsf = 1;
					this.dataSourceF = new MatTableDataSource(data);
					this.dataSourceF.paginator = this.paginator;
					this.dataSourceF.sort = this.sort;
				},
				(err) => {
					console.log(err);
				}
			);

		this.populate();
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjAoG/" + r);
	}
	onDeleteFile(id: any) {}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file) {
		return this.fileService.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file) {
		return this.fileService.getExtensionFile(file);
	}
	// ================================================================================
	//
	// ================================================================================
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
		this.selectedFiles = event.target.files;
	}
	// ================================================================================
	//
	// ================================================================================
	validerPj() {
		this.allpjs.push(this.formPj);
		console.log(this.allpjs);
		this.dataSource1 = new MatTableDataSource(this.allpjs);
		this.showAddDoc = false;
		this.formPj = { type: 0, selecetedFile: {} };
	}
	// ================================================================================
	//
	// ================================================================================
	addItem() {
		this.showAddDoc = true;
	}
	// ================================================================================
	//
	// ================================================================================
	populate() {
		const _this = this;
		this.service.getAllReserveDgService(this.idao).subscribe(
			(data) => {
				_this.sizeDS1 = data.length;
				this.validationDatasource = [];
				this.validations = data;
				console.log(this.validations);
				for (let i = 0; i < this.validations.length; i++) {
					this.validationDatasource.push(this.createNewLigne(i));
				}
				this.dataSource = new MatTableDataSource(
					this.validationDatasource
				);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			(err) => {
				_this.sizeDS1 = 0;
				console.log(err);
			}
		);
	}
	// ================================================================================
	//
	// ================================================================================
	createNewLigne(i: number): Validation {
		if (this.validations[i].valide) {
			this.validations[i].isValide = "Oui";
		} else {
			this.validations[i].isValide = "Non";
		}
		return {
			id: this.validations[i].id,
			dateReponse: this.validations[i].dateReponse,
			reserve: this.validations[i].reserve,
			ao: this.validations[i].ao.numAo,
			valide: this.validations[i].isValide,
		};
	}
	// ================================================================================
	//
	// ================================================================================
	addReserve() {}
	// ================================================================================
	//
	// ================================================================================
	onChange(event, index, item) {
		item.checked = !item.checked;

		console.log(
			"index: " +
				index +
				", label: " +
				item.label +
				", checked: " +
				item.checked
		);
		this.bool = item.checked;
	}
	// =========================================================================
	//
	// =========================================================================
	back() {
		this.router.navigate(["/marches/ao-list"]);
	}
	// ================================================================================
	//
	// ================================================================================
	onSubmit(form: NgForm) {
		if (this.selectedStatus) {
			this.formDataDg.valide = false;
			this.ao.isValideDg = false;
			this.ao.isValideTresorerie = false;
			this.ao.isValideSG = false;
			this.ao.statutAo.id = 2;
		} else {
			this.formDataDg.valide = true;
			this.ao.isValideSG = true;
		}
		this.formDataDg.ao.id = this.idao;

		if (
			this.ao.isValideDg &&
			this.ao.isValideTresorerie &&
			this.ao.isValideSG
		) {
			this.ao.statutAo.id = 4;
		}
		var myDate = new Date();
		this.formDataDg.dateReponse = myDate;

		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_VALIDATE"))) {
			this.service.updateAoDg(this.ao).subscribe((data) => {
				this.ao = data;
			});
			for (var i = 0; i < this.allpjs.length; i++) {
				this.service
					.nouvellepj(
						this.allpjs[i].selecetedFile,
						this.idao,
						this.allpjs[i].type.id,
						"Validation DG services"
					)
					.subscribe((data) => {
						console.log(data);
					});
			}
			this.service
				.sendReserveDgService(this.formDataDg)
				.subscribe((res) => {
					this.allpjs = [];
					this.dataSource1 = new MatTableDataSource([]);
					this.showAddDoc = false;
					this.populate();
				});
			// Notification
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}

	valideParDGS() {
		Swal.fire({
			title: this.translate.instant("PAGES.GENERAL.MSG_VALIDATION"),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			if (result.isConfirmed) {
				this.isValide = true;
			}
		});
	}*/
}
export interface Validation {
	id: string;
	dateReponse: string;
	reserve: string;
	ao: string;
	valide: string;
}

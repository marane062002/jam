import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AoService } from '../../shared/ao.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-valide-tresorerie-consultation',
  templateUrl: './valide-tresorerie-consultation.component.html',
  styleUrls: ['./valide-tresorerie-consultation.component.scss']
})
export class ValideTresorerieConsultationComponent implements OnInit {
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
		this.aoService.updateVisaTresorie	(this.idao, value).subscribe(res=>{
		  console.log(res)
		  Swal.fire(
			'Visa de Tresorie à été bien traité',
			' ',
			'success'
		  );
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
					this.visa.get("note").setValue(data.visaTresorerie);
					},
					(err) => {
						console.log(err);
					}
				);
		}

	/*
	// ================================================================================
	//
	// ================================================================================
	isValide: boolean = false;
	constructor(
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
	dsf: number = 0;
	dataSource: MatTableDataSource<any>;
	dataSourceF = new MatTableDataSource<any>();
	dataSource1: MatTableDataSource<any>;
	formPj = { type: 0, selecetedFile: {} };
	allpjs = [];
	showAddDoc = false;
	unites;
	selectedStatus = 1;
	idao;
	displayedColumns = ["dateReponse", "reserve", "valide"];
	displayedColumns1 = ["type", "nomDoc"];
	displayedColumnsF: string[] = [
		"icon",
		"name",
		"type",
		"dateFile",
		"fSize",
		"actions",
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChildren(MatPaginator) paginator2 = new QueryList<MatPaginator>();
	@ViewChildren(MatSort) sort2 = new QueryList<MatSort>();
	formDataDg = {
		valide: false,
		ao: { id: 1 },
		date: null,
		reserve: null,
		dateOuvertureDesPlis: null,
	};
	data = [{ label: " الموافقة", checked: false }];
	bool;
	ao;
	eventEditForm: FormGroup;
	sizeDS1 = 0;
	// ================================================================================
	//
	// ================================================================================
	ngOnInit() {
		this.eventEditForm = new FormGroup({
			completed: new FormControl(),
		});
		this.selectedStatus = 1;

		this.service.getAlltypePjAo().subscribe((res) => {
			this.unites = res;
		});
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
			this.populate();
		});
		this.service.getAoById(this.idao).subscribe((res) => {
			this.ao = res;
		});

		this.fileService.fileSizeDetector();

		this.service
			.getFilesByIdAndSMOdule(this.idao, "Validation Tresorie")
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
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
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
	// =========================================================================
	//
	// =========================================================================
	back() {
		this.router.navigate(["/marches/ao-list"]);
	}
	// ================================================================================
	//
	// ================================================================================
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
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
		this.service.getAllReserveTresorerie(this.idao).subscribe(
			(data) => {
				_this.sizeDS1 = data.length;
				this.dataSource = new MatTableDataSource(data);
				this.dataSource.paginator = this.paginator2.toArray()[0];
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
	onSubmit(form: NgForm) {
		if (this.selectedStatus) {
			this.formDataDg.valide = false;
			this.ao.isValideTresorerie = false;
			this.ao.isValideDg = false;
			this.ao.isValideSG = false;
			this.ao.statutAo.id = 2;
		} else {
			this.formDataDg.valide = true;
			this.ao.isValideTresorerie = true;
		}
		this.formDataDg.ao.id = this.idao;

		if (
			this.ao.isValideDg == true &&
			this.ao.isValideTresorerie == true &&
			this.ao.isValideSG == true
		) {
			this.ao.statutAo.id = 4;
		}
		var myDate = new Date();
		this.formDataDg.date = myDate;

		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_VALIDATE"))) {
			this.service.sendao(this.ao).subscribe((data) => {
				this.ao = data;
			});
			for (var i = 0; i < this.allpjs.length; i++) {
				this.service
					.nouvellepj(
						this.allpjs[i].selecetedFile,
						this.idao,
						this.allpjs[i].type.id,
						"Validation Tresorie"
					)
					.subscribe((data) => {
						console.log(data);
					});
			}
			this.service
				.sendRerserveTresorerie(this.formDataDg)
				.subscribe((res) => {
					this.allpjs = [];
					this.dataSource1 = new MatTableDataSource([]);
					this.showAddDoc = false;
					this.populate();
					this.router.navigate(["/marches/ao-list"]);
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

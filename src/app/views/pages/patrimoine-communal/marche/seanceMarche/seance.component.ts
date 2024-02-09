
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { seanceService } from '../../../shared/seance.service';
import * as $ from "jquery";

@Component({
	selector: 'kt-seance',
	templateUrl: './seance.component.html',
	styleUrls: ['./seance.component.scss']
})
export class SeanceComponent implements OnInit {

	// ===========================================================================
	//
	// ===========================================================================
	dataShow: any[];
	formData = {
	};
	// ===========================================================================
	//
	// ===========================================================================

	selectedOption = 1;
	Visible = 0;
	unites = [
		{ id: 1, libelle: "Forfaitaire" },
		{ id: 2, libelle: "Numérique" },
	];
	myForm: FormGroup;
	arr: FormArray;
	listPP;

	typeBien;
	lignes;
	id;
	tvaLocal;
	selectedAE;
	selectedAvis;
	Ajouter: boolean = false;
	ao = {
		typeMarche: { libelle: "" },
		natureAo: { libelle: "" },
		bordereauPrix: { id: 0 },
	};
	EnableQte: boolean = true;
	dataSize = 0;

	isUpdate = false;

	formSeance: FormGroup;

	allpjs = [];

	showAddDoc = false;

	displayedColumns1 = ["nomDoc","actions"];
	displayedColumns2 = ["nomDoc","dow","actions"];
	formPj = { selecetedFile: {} };
	dataSource1: MatTableDataSource<any>;
	dataSource2: MatTableDataSource<any>;


	// ===========================================================================
	//
	// ===========================================================================
	displayedColumns = [
		"Nom",
		"Prenom",
		"organisme",
		"autorisation",
		"actions"
	];
	// ============================================================================
	// Filter datasource
	// ============================================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		//this.dataSourceLBP.filter = filterValue;
	}
	isLoading = true;
	// ===========================================================================
	//
	// ===========================================================================
	dataSource: MatTableDataSource<any>;
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private translate: TranslateService,
		public dialog: MatDialog,
		public seanceService: seanceService,
		// @Inject(MAT_DIALOG_DATA) public formData: any,

	) {
		this.formSeance = new FormGroup({
			id: new FormControl(''),
			localisation: new FormControl(''),
			numSeance: new FormControl(''),
			superficieSeance: new FormControl(''),
			nomLocSeance: new FormControl(''),
			cinLocSeance: new FormControl(''),
			dateContratLocSeance: new FormControl(''),
			dateEnregContratLocSeance: new FormControl(''),
			montantLocSeance: new FormControl(''),
			dateMajMontantLocSeance: new FormControl(''),
			dateFinContratLocSeance: new FormControl(''),
			marche: new FormGroup({
				id: new FormControl('')
			}),
		});
	}


	onClickPj(a,e, id) {
		console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		//window.open(environment.API_ALFRESCO_URL + "/MarcheConvention/"+r);
		this.seanceService.downoldFile(r,a);
	}

	async getAllPjImm(id){ 
		await this.seanceService.getAllPjImm(id).subscribe(data => {  
		  this.dataSource2 = new MatTableDataSource(data);
	   }, error => console.log(error));
	   
	   }
	// ===========================================================================
	//
	// ===========================================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	//ligneBPDatasource: LigneBP[] = [];
	// ===========================================================================
	//
	// ===========================================================================
	idMarche;
	ngOnInit() {
		localStorage.removeItem("idSeance");

		this.idMarche = localStorage.getItem('idMarche');
		this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
		});

		this.seanceService.findById(this.id).subscribe(res => {
			this.dataShow = res;
			this.isLoading = false;
			this.dataSize = this.dataShow.length;
			this.dataSource = new MatTableDataSource(this.dataShow);
			this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;

		}, err => {
			console.log(err)
		})



	}


	onDeletePj(id: number):void {
		this.allpjs.splice(id, 1);
		if (this.allpjs.length > 0) {
		  this.dataSource1 = new MatTableDataSource(this.allpjs);
		} else {
		  this.dataSource1 = null
		}
	  }
	// ===========================================================================
	//
	// ===========================================================================

	// ===========================================================================
	//
	//
	// ===========================================================================
	nouvelleLigne() {
		document.getElementById("frmLigne").style.display = "inline-table";
	}
	// ===========================================================================
	//
	// ===========================================================================


	openDialog(id): void {
		localStorage.setItem("idSeance",JSON.stringify(id));
		if (id != 0) {
			/* const dialogRef = this.dialog.open(NewSeanceComponent, {
				width: '800px',
				data: {
					id: this.id,
					engagemnt_id: id
				}
			});
			dialogRef.afterClosed().subscribe(res => {
				//console.log("Res: "+ JSON.stringify(res,null,2))
				if (res) {
					this.formData = res;
					console.log("Ligne BP: " + JSON.stringify(this.formData, null, 2))
					//this.afterSave();
				}
			}); */
			// this.isUpdate=true;
			this.Ajouter = true;
			this.seanceService.findOneById(this.idMarche, id).subscribe(res => {
				this.formSeance.patchValue(res);
				
			})
			this.getAllPjImm(id);
		}
		else {
			this.Ajouter = true;
			this.dataSource2=null;
		}
	}
	delete(id: number): void {
		Swal.fire({
			title: this.translate.instant("PAGES.PROGRAMME.MESSAGE_SUPPRESSION"),
			icon: 'question',
			iconHtml: '?',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant("PAGES.PROGRAMME.OUI"),
			cancelButtonText: this.translate.instant("PAGES.PROGRAMME.NON")
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.seanceService.delete(id).subscribe(res => {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
						showConfirmButton: false,
						timer: 1500
					})
					this.ngOnInit();
				}, (err: HttpErrorResponse) => {
					if (err.status == 500) {
						Swal.fire({
							position: 'center',
							icon: 'error',
							title: "impossible de supprimer cette enregistrement",
							showConfirmButton: false,
							timer: 1500
						})
					}
				})



			}
		})
	}

	annuler() {
		this.Ajouter = false;
		this.formSeance.reset();
		this.dataSource1=null;
	}

	onSubmit() {
		this.formSeance.value.marche.id = parseInt(this.idMarche);
		console.log(this.formSeance.value)
		this.seanceService.save(this.formSeance.value).subscribe((res: any) => {
			const jsonObject = JSON.parse(res.replace(/""/g, '""'));

			if (this.allpjs.length > 0) {
				for (var i = 0; i < this.allpjs.length; i++) {
					this.seanceService.nouvellepj(this.allpjs[i].selecetedFile, jsonObject.id, "Seance")
						.subscribe((data) => {
							console.log("C: " + JSON.stringify(data, null, 2));
							this.dataSource1=null;
							this.allpjs=[];
						});
				}
			}
			this.ngOnInit();
			this.Ajouter = false;
			this.formSeance.reset();
			Swal.fire({
				icon: 'success',
				title: ' été bien enregistré',
				showConfirmButton: false,
				timer: 1500
			})

		}, err => { console.log(err) })
	}

	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
	}

	validerPj() {
		this.allpjs.push(this.formPj);
		console.log(this.allpjs);
		this.dataSource1 = new MatTableDataSource(this.allpjs);
		this.showAddDoc = false;
		this.formPj = { selecetedFile: {} };
		$("#test").val(null);
	}

	onDeleteFile(id: number): void {
		Swal.fire({
		  title: this.translate.instant("PAGES.PROGRAMME.MESSAGE_SUPPRESSION"),
		  icon: 'question',
		  iconHtml: '?',
		  showCancelButton: true,
		  showCloseButton: true,
		  confirmButtonText: this.translate.instant("PAGES.PROGRAMME.OUI"),
		  cancelButtonText: this.translate.instant("PAGES.PROGRAMME.NON")
		}).then((result) => {
		  /* Read more about isConfirmed, isDenied below */
		  if (result.isConfirmed) {
			this.seanceService
			  .deleteByIdFiles(id)
			  .subscribe(res => {
				this.getAllPjImm(parseInt(localStorage.getItem("idSeance")));
				Swal.fire({
				  position: 'center',
				  icon: 'success',
				  title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
				  showConfirmButton: false,
				  timer: 1500
				})
				this.ngOnInit();
			  }, (err: HttpErrorResponse) => {
				console.log(err.status);
				console.log(err.headers);
	
				if (err.status == 500) {
	
				  Swal.fire({
					position: 'center',
					icon: 'error',
					title: "impossible de supprimer cette enregistrement",
					showConfirmButton: false,
					timer: 1500
				  })
				}
			  })
		  }
		})
	  }
}


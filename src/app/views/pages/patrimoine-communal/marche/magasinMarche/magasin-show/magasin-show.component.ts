
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { mgService } from '../../../../shared/magasin.service';
import Swal from 'sweetalert2';
@Component({
	selector: 'kt-magasin-show',
	templateUrl: './magasin-show.component.html',
	styleUrls: ['./magasin-show.component.scss']
})
export class ShowMagasinComponent implements OnInit {

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

	formMagasin: FormGroup;
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
		public magasinService: mgService,
		// @Inject(MAT_DIALOG_DATA) public formData: any,

	) {
		this.formMagasin = new FormGroup({
			id: new FormControl(),
			localisation:new FormControl(),
			numMagasin:new FormControl(),
			superficieMag: new FormControl(),
			nomLocataireMAG:new FormControl(),
			cinLocMag: new FormControl(),
			dateContratLoc:new FormControl(),
			dateEnregContratLoc: new FormControl(),
			montantLoc: new FormControl(),
			dateMajMontantLoc:new FormControl(),
			dateFinContratLoc: new FormControl(),
			marche: new FormGroup({
				id: new FormControl('')
			}),
		});
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

		this.idMarche = parseInt(localStorage.getItem('idMarche'));
		this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
		});

		this.magasinService.findById(this.idMarche).subscribe(res => {
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
		if (id != 0) {
			/* const dialogRef = this.dialog.open(NewMagasinComponent, {
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
			this.magasinService.findOneById(this.idMarche,id).subscribe(res => {
				this.formMagasin.patchValue(res);
			})
		}
		else {
			this.Ajouter = true;
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
				this.magasinService.delete(id).subscribe(res => {
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
		this.formMagasin.reset();
	}

	onSubmit() {
		this.formMagasin.value.marche.id = parseInt(this.idMarche);
		console.log(this.formMagasin.value)
		this.magasinService.save(this.formMagasin.value).subscribe(res => {
			this.ngOnInit();
			this.Ajouter = false;
			this.formMagasin.reset();
			Swal.fire({
				icon: 'success',
				title: ' été bien enregistré',
				showConfirmButton: false,
				timer: 1500
			})

		}, err => { console.log(err) })
	}
}


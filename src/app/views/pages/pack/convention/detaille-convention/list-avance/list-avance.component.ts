import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { AvanceService } from '../../../../shared/AvanceService';
import { AvanceNewComponent } from './avance-new/avance-new.component';
import { DecimalPipe } from '@angular/common';

import { PartiePreneurService } from '../../../../shared/PartiePreneurService';


@Component({
	selector: 'kt-list-avance',
	templateUrl: './list-avance.component.html',
	styleUrls: ['./list-avance.component.scss']
})
export class ListAvanceComponent implements OnInit {

	// ===========================================================================
	//
	// ===========================================================================
	dataShow: any;
	formData = {
	};
	// ===========================================================================
	//
	// ===========================================================================

	selectedOption = 1;
	unites = [
		{ id: 1, libelle: "Forfaitaire" },
		{ id: 2, libelle: "Numérique" },
	];
	myForm: FormGroup;
	arr: FormArray;
	formButs: FormGroup;
	typeBien;
	lignes;
	id;
	tvaLocal;
	selectedAE;
	selectedAvis;
	ao = {
		typeMarche: { libelle: "" },
		natureAo: { libelle: "" },
		bordereauPrix: { id: 0 },
	};
	EnableQte: boolean = true;
	dataSize = 0;
	Ajouter: boolean = false;
	// ===========================================================================
	//
	// ===========================================================================
	displayedColumns = [
		"Id",
		"object",
		"Date",
		"Mantant",
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
	idConvention;

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
		public avanceService: AvanceService,
		private partiePreneurService: PartiePreneurService,


	) {

		this.formButs = new FormGroup({
			id: new FormControl(''),
			object: new FormControl(''),
			montant: new FormControl(''),
			duree: new FormControl(''),
			suiviFn: new FormControl(''),
			suiviph: new FormControl(''),
			date: new FormControl(''),
			convention: new FormGroup({
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
	listPP;
	ngOnInit() {
		this.idConvention = localStorage.getItem('idConvention');

		this.partiePreneurService.all().subscribe(res => {
			this.listPP = res;
		})

		this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
		});

		this.avanceService.all(this.id).subscribe(res => {
			for (let i = 0; i < res.length; i++) {
				if (res[i].montant != null) {
					res[i].montant = res[i].montant.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
				}
			}
			this.dataShow = res;
			this.isLoading = false;
			this.dataSource = new MatTableDataSource(this.dataShow);
			this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

			this.dataSize = this.dataShow.length;
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


	openDialog(id: number): void {
		/* const dialogRef = this.dialog.open(AvanceNewComponent, {
			width: '800px',
			data: {
				id: this.id,
				avance_id: id
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
		if (id != 0) {
			this.Ajouter = true;
			this.avanceService.findById(id).subscribe((res: any) => {
				if (res.montant != null) {
					res.montant = res.montant.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
				}
				this.formButs.patchValue(res);
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
				this.avanceService.delete(id).subscribe(res => {
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
		this.formButs.reset();
	}

	onSubmit() {
		this.formButs.value.convention.id = parseInt(this.idConvention);

		if (this.formButs.value.id != null) {
			if (this.formButs.value.montant != null) {
				this.formButs.value.montant = parseFloat((this.formButs.value.montant).replace(/\s/, ''));
			}
		}
		console.log(this.formButs.value)
		this.avanceService.save(this.formButs.value).subscribe(res => {
			console.log(res);
			this.ngOnInit();
			this.Ajouter = false;
			this.formButs.reset();
			Swal.fire({

				icon: 'success',
				title: ' été bien enregistré',
				showConfirmButton: false,
				timer: 1500
			})
		}, err => { console.log(err) })
	}



}


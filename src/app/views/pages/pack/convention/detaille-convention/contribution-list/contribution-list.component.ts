import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ContributionService } from '../../../../shared/ContributionService';
import { ContributionNewComponent } from './contribution-new/contribution-new.component';
import { PartiePreneurService } from '../../../../shared/PartiePreneurService';

@Component({
	selector: 'kt-contribution-list',
	templateUrl: './contribution-list.component.html',
	styleUrls: ['./contribution-list.component.scss']
})
export class ContributionListComponent implements OnInit {

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
	formGroup: FormGroup;
	listPP;
	// ===========================================================================
	//
	// ===========================================================================
	displayedColumns = [
		"date",
		"Nom",
		"Prenom",
		"type",
		"description",
		"description2",

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
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private translate: TranslateService,
		public dialog: MatDialog,
		public contributionService: ContributionService,
		private partiePreneurService: PartiePreneurService,



	) {
		this.formGroup = new FormGroup({
			id: new FormControl(''),
			partiePreneur: new FormGroup({
				id: new FormControl('')
			}),
			convention: new FormGroup({
				id: new FormControl('')
			}),
			contributionFinanciere: new FormControl(''),
			description: new FormControl(''),
			type: new FormControl(''),
			date: new FormControl('')
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
	idConvention;

	ngOnInit() {
		this.idConvention = localStorage.getItem('idConvention');
		this.partiePreneurService.all().subscribe(res => {
			this.listPP = res;
		})
		this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
		});

		this.contributionService.all(this.id).subscribe(res => {
			for (let i = 0; i < res.length; i++) {
				if (res[i].contributionFinanciere != null) {
					res[i].contributionFinanciere = res[i].contributionFinanciere.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
				}
			}
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

	showInputDesc: boolean = false;
	showInputCF: boolean = false;
	getValueType(event: any) {
		if (event == 'Autre') {
			this.showInputCF = false;
			this.showInputDesc = true;
		}
		if (event == 'Finance') {
			this.showInputCF = true;
			this.showInputDesc = false;
		}
	}

	openDialog(con_id): void {
		/* const dialogRef = this.dialog.open(ContributionNewComponent, {
			width: '800px',
			data: {
				id: this.id,
				con_id: con_id
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
		if (con_id != 0) {
			this.Ajouter = true;
			this.contributionService.findById(con_id).subscribe((res: any) => {
				if (res.contributionFinanciere != null) {
					res.contributionFinanciere = res.contributionFinanciere.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
				}
				if (res.type == 'Finance') {
					this.showInputCF = true;
					this.showInputDesc = false;
				}
				if (res.type == 'Autre') {
					this.showInputCF = false;
					this.showInputDesc = true;
				}
				this.formGroup.patchValue(res);
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
				this.contributionService.delete(id).subscribe(res => {
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
		this.formGroup.reset();
	}


	onSubmit() {
		this.formGroup.value.convention.id = parseInt(this.idConvention);

		if (this.formGroup.value.id != null) {
			if (this.formGroup.value.contributionFinanciere != null) {
				this.formGroup.value.contributionFinanciere = parseFloat((this.formGroup.value.contributionFinanciere).replace(/\s/, ''));
			}
		}
		console.log(this.formGroup.value)
		this.contributionService.save(this.formGroup.value).subscribe(res => {
			console.log(res);
			this.ngOnInit();
			this.Ajouter = false;
			this.formGroup.reset();
			Swal.fire({

				icon: 'success',
				title: ' été bien enregistré',
				showConfirmButton: false,
				timer: 1500
			})
		}, err => { console.log(err) })
	}

}



import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SuiviContributionService } from '../../../../shared/suivi-contribution.service';
import Swal from 'sweetalert2';
import { NewSuiviContributionComponent } from './new-suivi-contribution/new-suivi-contribution.component';
import { PartiePreneurService } from '../../../../shared/PartiePreneurService';

@Component({
	selector: 'kt-suivi-contribution',
	templateUrl: './suivi-contribution.component.html',
	styleUrls: ['./suivi-contribution.component.scss']
})
export class SuiviContributionComponent implements OnInit {

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
	listPP;
	idConvention;
	Ajouter: boolean = false;
	selectedAvis;
	ao = {
		typeMarche: { libelle: "" },
		natureAo: { libelle: "" },
		bordereauPrix: { id: 0 },
	};
	EnableQte: boolean = true;
	dataSize = 0;
	formconflit: FormGroup;
	// ===========================================================================
	//
	// ===========================================================================
	displayedColumns = [
		"date",
		"objet",
		"etat",
		"commentaire",
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
		public engagementService: SuiviContributionService,
		private partiePreneurService: PartiePreneurService,


	) {
		this.formconflit = new FormGroup({
			id: new FormControl(''),
			objet: new FormControl(''),
			etat: new FormControl(''),
			commentaire: new FormControl(''),
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
	ngOnInit() {
		this.idConvention = localStorage.getItem('idConvention');
		this.partiePreneurService.all().subscribe(res => {
			this.listPP = res;
		})
		this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
		});

		this.engagementService.all(this.id).subscribe(res => {
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


	openDialog(con_id): void {
		/* const dialogRef = this.dialog.open( NewSuiviContributionComponent,{
		 width: '800px',
		 data: {
			   id: this.id,
			   con_id: con_id
	   }
	   }); 
		 dialogRef.afterClosed().subscribe(res => {
		   //console.log("Res: "+ JSON.stringify(res,null,2))
		   if (res){
			   this.formData = res;
		   console.log("Ligne BP: "+ JSON.stringify(this.formData,null,2))
			   //this.afterSave();
		   }
	   }); */
		if (con_id != 0) {
			this.Ajouter = true;
			this.engagementService.findById(con_id).subscribe(res => {
				this.formconflit.patchValue(res);
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
				this.engagementService.delete(id).subscribe(res => {
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
		this.formconflit.reset();
	}

	onSubmit() {
		this.formconflit.value.convention.id = parseInt(this.idConvention);

		console.log(this.formconflit.value)
		this.engagementService.save(this.formconflit.value).subscribe(res => {
			console.log(res);
			this.ngOnInit();
			this.Ajouter=false;
			this.formconflit.reset();
			Swal.fire({
				icon: 'success',
				title: ' été bien enregistré',
				showConfirmButton: false,
				timer: 1500
			})
		}, err => { console.log(err) })
	}



}

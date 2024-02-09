import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SuiviContributionService } from '../../../../shared/suivi-contribution.service';
import Swal from 'sweetalert2';
import { NewExecutionProjetComponent } from './new-execution-projet/new-execution-projet.component';
import { ExecutionProjetService } from '../../../../../../views/pages/shared/execution-projet.service';
@Component({
	selector: 'kt-execution-projet',
	templateUrl: './execution-projet.component.html',
	styleUrls: ['./execution-projet.component.scss']
})
export class ExecutionProjetComponent implements OnInit {

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
	formExecutionProjet: FormGroup;
	arr: FormArray;
	typeBien;
	Ajouter: boolean = false;
	idConvention;
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
	// ===========================================================================
	//
	// ===========================================================================
	displayedColumns = [
		"proprietaire",
		"proprietaireAssigne",
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
		public executionProjet: ExecutionProjetService,

	) {
		this.formExecutionProjet = new FormGroup({
			id: new FormControl(''),
			proprietaireAssigne: new FormControl(''),
			proprietaire: new FormControl(''),
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

		this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
		});

		this.executionProjet.all(this.id).subscribe(res => {
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
		/* const dialogRef = this.dialog.open( NewExecutionProjetComponent,{
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
		if (con_id) {
			this.Ajouter = true;
			this.executionProjet.findById(con_id).subscribe(res=>{
				this.formExecutionProjet.patchValue(res);
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
				this.executionProjet.delete(id).subscribe(res => {
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
		this.formExecutionProjet.reset();
	}

	onSubmit() {
		this.formExecutionProjet.value.convention.id = parseInt(this.idConvention);

		console.log(this.formExecutionProjet.value)
		this.executionProjet.save(this.formExecutionProjet.value).subscribe(res => {
			console.log(res);
			this.ngOnInit();
			this.Ajouter = false;
			this.formExecutionProjet.reset();
			Swal.fire({
				icon: 'success',
				title: ' été bien enregistré',
				showConfirmButton: false,
				timer: 1500
			})
		}, err => { console.log(err) })
	}


}

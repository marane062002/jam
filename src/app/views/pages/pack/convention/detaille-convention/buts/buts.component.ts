import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ButsServices } from '../../../../../pages/shared/ButsServices';
import { AddButComponent } from './add-but/add-but.component';

@Component({
  selector: 'kt-buts',
  templateUrl: './buts.component.html',
  styleUrls: ['./buts.component.scss']
})
export class ButsComponent implements OnInit {

// ===========================================================================
	//
	// ===========================================================================
	dataShow:any;
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
	formButs: FormGroup;
	idConvention;
	ao = {
		typeMarche: { libelle: "" },
		natureAo: { libelle: "" },
		bordereauPrix: { id: 0 },
	};
	EnableQte:boolean = true;
	dataSize = 0;
	Ajouter: boolean = false;
	// ===========================================================================
	//
	// ===========================================================================
	displayedColumns = [
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
		public butsServices:ButsServices,
		
	) {
		this.formButs = new FormGroup({
			id: new FormControl(''),
			convention: new FormGroup({
			  id: new FormControl('')
			}),
			object: new FormControl('')
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

		this.butsServices.all(this.id).subscribe(res=>{
			this.dataShow=res;
			this.isLoading=false;
			this.dataSource = new MatTableDataSource(this.dataShow);
			this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

			this.dataSize=this.dataShow.length;
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		},err=>{
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


	openDialog(id:number): void {
		 /* const dialogRef = this.dialog.open( AddButComponent,{
		  width: '800px',
		  data: {
				but_id: id,
				id: this.id
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
		if(id!=0){
			this.Ajouter=true;
			this.butsServices.findById(id).subscribe(res => {
				this.formButs.patchValue(res);
			  })

		}else{
			this.Ajouter=true;
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
		   this.butsServices.delete(id).subscribe(res=>{
			  Swal.fire({
				  position: 'center',
				  icon: 'success',
				  title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
				  showConfirmButton: false,
				  timer: 1500
				})
				this.ngOnInit();
		   },(err : HttpErrorResponse)=>{			  
			  if(err.status==500){
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
		console.log(this.formButs.value)
		this.butsServices.save(this.formButs.value).subscribe(res => {
		  console.log(res);
		  this.ngOnInit();
		  this.Ajouter=false;
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




import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { AutorisationMarcheService } from '../../../../shared/AutorisationMarcheService';
import { AddAutorisationComponent } from './add-autorisation/add-autorisation.component';

@Component({
  selector: 'kt-autorisation',
  templateUrl: './autorisation.component.html',
  styleUrls: ['./autorisation.component.scss']
})
export class AutorisationComponent implements OnInit {
// ===========================================================================
	//
	// ===========================================================================
	dataShow:any[];
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
	ao = {
		typeMarche: { libelle: "" },
		natureAo: { libelle: "" },
		bordereauPrix: { id: 0 },
	};
	EnableQte:boolean = true;
	dataSize = 0;
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
		public AutorisationMarcheService:AutorisationMarcheService,
		
	) {
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
		this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
		});

		this.AutorisationMarcheService.all(this.id).subscribe(res=>{
			this.dataShow=res;
			this.isLoading=false;
			this.dataSize=this.dataShow.length
		this.dataSource = new MatTableDataSource(this.dataShow);
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


	openDialog(): void {
		 const dialogRef = this.dialog.open( AddAutorisationComponent,{
		  width: '800px',
		  data: {
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
		});
	  }
	  delete(id: number): void {
		Swal.fire({
		  title: 'Voulez vous supprimer cet enregistrement ?',
		  icon: 'question',
		  iconHtml: '?',
		  showCancelButton: true,
		  showCloseButton: true,
		  confirmButtonText: 'Oui',
		  cancelButtonText: 'Non',
		}).then((result) => {
		  /* Read more about isConfirmed, isDenied below */
		  if (result.isConfirmed) {
		   this.AutorisationMarcheService.delete(id).subscribe(res=>{
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

	  

	
}



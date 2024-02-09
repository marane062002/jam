import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { ContratService } from '../../shared/contrat.service';
import { FilesUtilsService } from '../../utils/files-utils.service';
import Swal from 'sweetalert2';
import { ValiderContratModalComponent } from '../valider-contrat-modal/valider-contrat-modal.component';
import { updateStatutOfferBean } from '../ao-detail/prestataires/prestataires.component';

@Component({
  selector: 'kt-contrat-detail-consultation',
  templateUrl: './contrat-detail-consultation.component.html',
  styleUrls: ['./contrat-detail-consultation.component.scss']
})
export class ContratDetailConsultationComponent implements OnInit {
	displayedColumns1 = [
		"nom",
		"tel",
		"mail",
		"rc",
		"ice",
		"idFisc",
		"montant",
	
		// "adresse",
		"actions",
	];
	lotMarcheDataSource: any;

  idContrat;
  contrat
  statut:FormGroup
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
  displayedColumns: string[] = [
		"icon",
		"name",
		"type",
		"label",
		"dateFile",
		"fSize",
		"actions",
	];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(	private router: Router,		public dialog: MatDialog,

		private activatedRoute: ActivatedRoute,private serviceContrat: ContratService,		private fileService: FilesUtilsService,
    ) { }
	list
	dataSource1

	dataSize
  ngOnInit() {
    this.statut = new FormGroup({
			statut: new FormControl(0,Validators.required),
		  });
    this.activatedRoute.queryParams.subscribe((params) => {
			this.idContrat = params["id"];
			
		});

		this.serviceContrat.getOffresByIdContrat(this.idContrat).subscribe((res)=>{
			
			this.list=res
			this.dataSize=res.length
			this.dataSource1 = new MatTableDataSource(this.list);
		})
		this.serviceContrat.getByIdContrat(this.idContrat).subscribe((data)=>{
			this.contrat = data;
			this.statut.get("statut").setValue(data.statutContrat);

		})
    this.getAllBCFiles()
  }
	public getAllBCFiles() {
		this.serviceContrat.getByIdContratFiles(this.idContrat)
			.pipe(delay(1000))
			.subscribe(
				(data) => {
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);

	}
  FileName(file) {
		return this.fileService.getFileName(file);
	}
  FileExtension(file) {
		return this.fileService.getExtensionFile(file);
	}
  onClickPjName(e, id) {
    
		var r = e.substring(0, e.length - 4);
		window.open(environment.API_ALFRESCO_URL + "/PjContrat/" + r, "_blank");
	}
  updateStatut(event): void {
		console.log(event)
			Swal.fire({
				title: "Voulez-vous changer   le statut du contrat ?",
				icon: "question",
				iconHtml: "?",
				showCancelButton: true,
				showCloseButton: true,
				confirmButtonText: "Oui",
				cancelButtonText: "Non",
			}).then((result) => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					this.contrat.statutContrat=event.value


					// if(event.value =='ADJUGE' ){
					// 	this.annulerAoDialog(event.value,this.contrat.id);

					// }else{
						this.serviceContrat
						.updateStatutContrat(this.contrat)
						.subscribe((res) => {
							
							this.router.navigate(["/marches/contrat-consultation-detail"], {
								queryParams: { id: this.contrat.id },
							});		});
					// }
						
						// this.service1
						// .updatestatutContrat(this.contrat)
						// .subscribe((res) => {
							
						// 	this.router.navigate(["/marches/contrat-consultation-detail"], {
						// 		queryParams: { id: this.contrat.id },
						// 	});						});
					// }
				
				}
			});
		}
    annulerAoDialog(Statut,id) {
			
			const dialogRef = this.dialog.open(ValiderContratModalComponent, {
				width: "630px",
				data: {
					id:id,
					statutContrat: Statut,
					// dateOuverturePlis: "",
					refDeContrat: "",
				},
			});
			dialogRef.afterClosed().subscribe((res) => {
				
				if (res) {
					this.contrat.statutContrat=res.statutAoValide
					// this.contrat.dateOuverturePlis=res.dateOuverturePlis
					this.contrat.refDeContrat=res.refDeContrat
					this.contrat.id=res.id

					// this.aoDialog = res;
					if (res) {
						
						this.serviceContrat
						.updateStatutContrat(this.contrat)
						.subscribe((res) => {
							
							this.router.navigate(["/marches/contrat-consultation-detail"], {
								queryParams: { id: this.contrat.id },
							});		});
	
						// this.notification.warn(
						// 	this.translate.instant(
						// 		"PAGES.GENERAL.MSG_CONCEL_AO_CONFIRMED"
						// 	)
						// );
					}
				}
			});
		}
	
}

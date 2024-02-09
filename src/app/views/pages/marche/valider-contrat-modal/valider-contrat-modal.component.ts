import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratService } from '../../shared/contrat.service';
import { SpinnerService } from '../../utils/spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-valider-contrat-modal',
  templateUrl: './valider-contrat-modal.component.html',
  styleUrls: ['./valider-contrat-modal.component.scss']
})
export class ValiderContratModalComponent implements OnInit {

  contrat = {
		id:'',
		statutBC:null,
		 consultation: { id: "" },
	sousTypePrestation:{ id: '' },
	typePrestation:{ id: '' },
	dateLivraison: null ,
	dateDevis: null , 
	creationDate: null , 
	refDeContrat:0,
	estimation:0,
	bordereauPrix:0,
	montantDeBC:0,
	createurUser:'',
	raisonSociale:'',
	 objet:'',
	 lieuxDevis:'',
	 delaiLivraison:''
	};
  constructor(
	public dialogRef: MatDialogRef<ValiderContratModalComponent>,private router: Router,private service: ContratService,private activatedRoute: ActivatedRoute, private spinnerService: SpinnerService, @Inject(MAT_DIALOG_DATA) public data: any,private translate: TranslateService,) { }

  ngOnInit() {
	this.data.id
    
    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));

    
    this.service
			.getByIdContrat( this.data.id)
			.pipe(
				finalize(() => {
					this.spinnerService.stop(spinnerRef); // stop spinner
				})
			).subscribe(
				(data) => {	
          			this.contrat.createurUser = data.createurUser;
					  this.contrat.creationDate = data.creationDate;
					  this.contrat.dateLivraison = data.dateLivraison;
					  this.contrat.statutBC = data.statutBC;

					  this.contrat.dateDevis = data.dateDevis;
					  this.contrat.refDeContrat = data.refDeContrat;
					  this.contrat.bordereauPrix = data.bordereauPrix;
					  this.contrat.montantDeBC = data.montantDeBC;
					  this.contrat.raisonSociale = data.raisonSociale;

					
					this.contrat.objet = data.objet;
					this.contrat.id = data.id;
					this.contrat.estimation = data.estimation;
					this.contrat.lieuxDevis = data.lieuxDevis;

					this.contrat.delaiLivraison = data.delaiLivraison;

       
					if (data.typePrestation != null) {
						if (data.typePrestation.id != null) {
							this.contrat.typePrestation.id = data.typePrestation.id;
						} 
					} else {
						this.contrat.typePrestation = { id: "" };
					}
		
          })
  }
  onInputFocus4() {
		if (this.contrat.refDeContrat === 0) {
			this.contrat.refDeContrat = null; // Remove default value when clicking on the input field
		}
	}
	onInputBlur4() {
		if (this.contrat.refDeContrat === null || this.contrat.refDeContrat === undefined) {
			this.contrat.refDeContrat = 0; // Set the value back to 0 if left empty
		}
	}
	onSubmit(form) {	
		
		
		if(this.contrat.refDeContrat==0){
			Swal.fire({
				title:"	Vous devez saisir le réference et la date d'ouverture des plis pour valider la consultation du bon de commande ",

				icon:'error'
			}
				
			)
		}else{
			
			this.service.patchContrat(this.contrat).subscribe((res) => {
	
				this.dialogRef.close();
							location.reload()
	
			});
		}
	
	}
	backList() {
		this.router.navigate(["/marches/bon-commande-list"]);
	}
}

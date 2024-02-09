import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AoService } from '../../shared/ao.service';
import { SpinnerService } from '../../utils/spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { ConsultationService } from '../../shared/consultation.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'kt-valider-bc-modal',
  templateUrl: './valider-bc-modal.component.html',
  styleUrls: ['./valider-bc-modal.component.scss']
})
export class ValiderBcModalComponent implements OnInit {
	bonCommande = {
		id:'',
		statutBC:null,
		 consultation: { id: "" },
	sousTypePrestation:{ id: '' },
	typePrestation:{ id: '' },
	dateLivraison: null ,
	dateDevis: null , 
	dateOuverturePlis: null , 
	creationDate: null , 
	refDeBC:0,
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
	public dialogRef: MatDialogRef<ValiderBcModalComponent>,private router: Router,private service: ConsultationService,private activatedRoute: ActivatedRoute, private spinnerService: SpinnerService, @Inject(MAT_DIALOG_DATA) public data: any,private translate: TranslateService,) { }

  ngOnInit() {
	this.data.id
    
    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));

    
    this.service
			.getByIdBonCommande( this.data.id)
			.pipe(
				finalize(() => {
					this.spinnerService.stop(spinnerRef); // stop spinner
				})
			).subscribe(
				(data) => {	
          			this.bonCommande.createurUser = data.createurUser;
					  this.bonCommande.creationDate = data.creationDate;
					  this.bonCommande.dateLivraison = data.dateLivraison;
					  this.bonCommande.statutBC = data.statutBC;

					  this.bonCommande.dateDevis = data.dateDevis;
					  this.bonCommande.dateOuverturePlis = data.dateOuverturePlis;
					  this.bonCommande.refDeBC = data.refDeBC;
					  this.bonCommande.bordereauPrix = data.bordereauPrix;
					  this.bonCommande.montantDeBC = data.montantDeBC;
					  this.bonCommande.raisonSociale = data.raisonSociale;

					
					this.bonCommande.objet = data.objet;
					this.bonCommande.id = data.id;
					this.bonCommande.estimation = data.estimation;
					this.bonCommande.lieuxDevis = data.lieuxDevis;

					this.bonCommande.delaiLivraison = data.delaiLivraison;

       
					if (data.typePrestation != null) {
						if (data.typePrestation.id != null) {
							this.bonCommande.typePrestation.id = data.typePrestation.id;
						} 
					} else {
						this.bonCommande.typePrestation = { id: "" };
					}
		
          })
  }
  onInputFocus4() {
		if (this.bonCommande.refDeBC === 0) {
			this.bonCommande.refDeBC = null; // Remove default value when clicking on the input field
		}
	}
	onInputBlur4() {
		if (this.bonCommande.refDeBC === null || this.bonCommande.refDeBC === undefined) {
			this.bonCommande.refDeBC = 0; // Set the value back to 0 if left empty
		}
	}
	onSubmit(form) {	
		
		
		if(this.bonCommande.refDeBC==0|| this.bonCommande.dateOuverturePlis==''){
			Swal.fire({
				title:"	Vous devez saisir le réference et la date d'ouverture des plis pour valider la consultation du bon de commande ",

				icon:'error'
			}
				
			)
		}else{
			
			this.service.patchBc(this.bonCommande).subscribe((res) => {
	
				this.dialogRef.close();
							location.reload()
	
			});
		}
	
	}
	backList() {
		this.router.navigate(["/marches/bon-commande-list"]);
	}
}

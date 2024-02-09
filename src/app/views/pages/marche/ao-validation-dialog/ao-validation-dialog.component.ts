import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AoService } from '../../shared/ao.service';
import { SpinnerService } from '../../utils/spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-ao-validation-dialog',
  templateUrl: './ao-validation-dialog.component.html',
  styleUrls: ['./ao-validation-dialog.component.scss']
})
export class AoValidationDialogComponent implements OnInit {
 
  constructor(public dialogRef: MatDialogRef<AoValidationDialogComponent>,private router: Router,private service: AoService,private activatedRoute: ActivatedRoute, private spinnerService: SpinnerService, @Inject(MAT_DIALOG_DATA) public data: any,private translate: TranslateService,) { 
    { }

  }
	idao;
	backPage = 0;
	formData = {
		creationDate:null,
		updateDate:null,
		createurUser:'',
		etatCommentaire:'',
		refDeAppelOffre: null,
		agrements: [],
		adresseEchantillon: "",

		id: 0,
		typeMarche: { id: "" },
		typePrestation: { id: "" },
		natureAo: { id: "" },
		statutAo: { id: 1, libelle: "" },
		pfinancier: 0,
		ptechnique: 0,
		modePassation: "",
		qualification:{ id: "" },
		classification: { id: "" },	
			seuilMinimal: 0,
		caution: 0,
		dateOuverturePlis: null,
		dateEchantillon: null,
		dateVisite: null,

		dateReception: null,
		serviceGestionnaire: 0,
		division: 0,
		descriptif: "",
		autres: "",
		budgetEstimatif: 0,
		objet: "",
		objetAR: "",
		estimation: 0,
		typeAO: "",
		naturePrix: "",
		loi: "",
		PrixRevisable: "",

		service: 0,
		modificateurUser: "",
		existanceVisite: false,
		Traitement: "",
		existQualification: false,
		existClassification: false,
		existEchantillon: false,
		existanceAgrement: false,
		existTypeAo: false,
		existanceAllotisse: "",
		programme: { id: "" },
		convention: { id: "" },
		codeProjet: "",
		codeOrientationStrategique: "",
		adresseVisite: "",
		traitementVisite: "",

		sendToServiceMarche: false,
	};
 selectedAgrementvalue
  ngOnInit() { 
    this.data.id
    
    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));

    
    this.service
			.getAoById( this.data.id)
			.pipe(
				finalize(() => {
					this.spinnerService.stop(spinnerRef); // stop spinner
				})
			).subscribe(
				(data) => {	
          			this.formData.id=data.id
          			this.formData.createurUser = data.createurUser;
					this.formData.creationDate = data.creationDate;
this.formData.refDeAppelOffre=data.refDeAppelOffre
					this.formData.etatCommentaire=data.etatCommentaire
					if(data.dateOuverturePlis!=null){
						// this.formData.dateOuverturePlis=data.dateOuverturePlis
						this.formData.dateOuverturePlis = new Date(data.dateOuverturePlis).toISOString();

					}
					this.formData.objet = data.objet;
					this.formData.id = data.id;
					this.formData.objetAR = data.objetAR;
					this.formData.estimation = data.estimation;
					this.formData.budgetEstimatif = data.budgetEstimatif;
					this.formData.caution = data.caution;
	if (data.convention != null) {
						if (data.convention.id != null) {
				
							this.formData.convention = data.convention;
						} 
					} else {
				
						this.formData.convention = { id: "" };
					}
					if (data.programme != null) {
						if (data.programme.id != null) {
						
							this.formData.codeOrientationStrategique = data.programme.codeOrientation;

							this.formData.codeProjet = data.programme.codeProjet;
					
						}
					} else {
					
						this.formData.programme = { id: "" };
					}
          if (data.typeAO != undefined) {
						this.formData.typeAO = data.typeAO;
					
					}
					if (data.typePrestation != null) {
						if (data.typePrestation.id != null) {
							this.formData.typePrestation.id = data.typePrestation.id;
						} 
					} else {
						this.formData.typePrestation = { id: "" };
					}
					if (data.typeMarche != null) {
						if (data.typeMarche.id != null) {
							this.formData.typeMarche = data.typeMarche;
						}
					} else {
						this.formData.typeMarche = { id: "" };
					}
					this.formData.modePassation = data.modePassation;
					if (data.modePassation == "Autres") {
						this.formData.autres = data.modePassation;
					}
						
						this.formData.naturePrix = data.naturePrix;
						
			
		if(data.existQualification==true){
					
						if(data.existClassification==true){
						
							this.formData.qualification=data.qualification
							this.formData.classification=data.classification

							
						}else{
							this.formData.classification=null
						}
					}else{
						this.formData.qualification=null
					}

					

						if (data.existEchantillon == true) {
							this.formData.dateEchantillon=new Date(data.dateEchantillon).toISOString();
							this.formData.adresseEchantillon=data.adresseEchantillon
			
						
						
					}
						if (data.existanceVisite == true) {
							this.formData.dateVisite=new Date(data.dateVisite).toISOString();
							this.formData.adresseVisite=data.adresseVisite
							this.formData.traitementVisite=data.traitementVisite
					
						
					}
          
          if(data.existanceAgrement==false){
						this.formData.agrements=null
					}else{
						
						
            this.formData.agrements=data.agrements
            
					}
          })
  }
  backList() {
		this.router.navigate(["/marches/ao-consultation-list"]);
	}
	onSubmit(form) {	
		
		
		if(this.formData.refDeAppelOffre==0){
			Swal.fire({
				title:"	Vous devez saisir le réference et la date d'ouverture des plis pour valider la consultation ",

				icon:'error'
			}
				
			)
		}else{
			 if(this.formData.dateOuverturePlis!=null){
				let HistoriqueStatutToValide={
					ao: { id: this.formData.id,},
					modificateurUser:window.localStorage.getItem("fullnameUser"),
		
				}
				this.service.createHistoriqueUpdateStatutToValide(HistoriqueStatutToValide).subscribe((res)=>{
					
				})
			 }
			
			this.service.patchAo(this.formData).subscribe((res) => {
	
				this.dialogRef.close();
							location.reload()
	
			});
		}
	
	}
  onInputFocus4() {
		if (this.formData.refDeAppelOffre === 0) {
			this.formData.refDeAppelOffre = null; // Remove default value when clicking on the input field
		}
	}
	onInputBlur4() {
		if (this.formData.refDeAppelOffre === null || this.formData.refDeAppelOffre === undefined) {
			this.formData.refDeAppelOffre = 0; // Set the value back to 0 if left empty
		}
	}
}

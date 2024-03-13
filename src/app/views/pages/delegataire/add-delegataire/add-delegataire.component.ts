import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

import {IDelegataire} from '../models/delegataire/delegataire.model';
import {DelegataireService} from '../service/delegataire/delegataire.service';
import {StructureDelegataireService} from '../../parametrages-sdl-delegataire/service/structureDelegataire/structure-delegataire.service';
import {IStructureDelegataire} from '../../parametrages-sdl-delegataire/models/structureDelegataire/structureDelegataire.model';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
@Component({
    selector: 'kt-add-delegataire',
    templateUrl: './add-delegataire.component.html',
    styleUrls: ['./add-delegataire.component.scss']
})
export class AddDelegataireComponent implements OnInit {
    formDemandeSubmitted = false;
    delegatairess: IDelegataire;
	tabStructureDelegataires?: IStructureDelegataire[] | null;
	structure: any[] = [];
    private baseUrl = environment.API_SDL_URL;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
    delegataireForm = this.fb.group({
        raisonSociale: [''],
        raisonCommerciale: [''],
        identifiantFiscal: ['', Validators.required],
        identifiantCommun: ['', Validators.required],
        numCnss: ['', Validators.required],
        adresse: [''],
        numTel: [''],
        nemFax: [''],
        email: [''],
        gerant: [''],
        structureDelegataire: [''],
        capital: [''],
    });


    constructor(
		private httpClient: HttpClient,
        private router: Router,
        private fb: FormBuilder,
        private delegataireService: DelegataireService,
        private structureDelegataireService: StructureDelegataireService,
        private translate: TranslateService
    ) {}

    ngOnInit() {
		this.httpClient.get<any[]>(`${this.baseUrl}structure-delegatire`,{ headers: this.headers } ).subscribe((response: any) => {
		this.structure = response
		});
	}

	pcjStructure : File;
	pcjModel : File;
	pcjStatut : File;
    
	structurePj(event: any) {
		this.pcjStructure = event.target.files[0];
	}
	modelPj(event: any) {
		this.pcjModel = event.target.files[0];
	}
	statutPj(event: any) {
		this.pcjStatut = event.target.files[0];
	}


    Back(): void {
        this.router.navigate(['delegataire/delegataires'])
    }

    addDelegataire() {
       
		if (this.delegataireForm.valid) {
			
			this.httpClient.post<any[]>(`${this.baseUrl}delegataire`, this.delegataireForm.value,{ headers: this.headers }).subscribe(
				(res:any) => {
				  console.log("nouveau res :", res);

				  const pcjStt = new FormData();
				  const pcjStr = new FormData();
				  const pcjMd = new FormData();


				  pcjStt.append("file", this.pcjStatut)
				  pcjStt.append("sousModule", "STATUT")
				  pcjStt.append("id",res.id)
				  pcjStt.append("label", "DELEGATAIRE");
			
				  this.httpClient.post(`${this.AlfresscoURL}/delegataire-pj/multiplefile`, pcjStt)
				  .subscribe((res)=>{
				  })

				  
				  pcjStr.append("file", this.pcjStructure)
				  pcjStr.append("sousModule", "Structure d'activité")
				  pcjStr.append("id",res.id)
				  pcjStr.append("label", "DELEGATAIRE");
			
				  this.httpClient.post(`${this.AlfresscoURL}/delegataire-pj/multiplefile`, pcjStr)
				  .subscribe((res)=>{
				  })


				  pcjMd.append("file", this.pcjModel)
				  pcjMd.append("sousModule", "Modèle.J")
				  pcjMd.append("id",res.id)
				  pcjMd.append("label", "DELEGATAIRE");
		  
				this.httpClient.post(`${this.AlfresscoURL}/delegataire-pj/multiplefile`, pcjMd)
				.subscribe((res)=>{
				})
                Swal.fire({
					title: 'Enregistrement réussi!',
					text: 'Enregistré avec succès.',
					icon: 'success',
					confirmButtonText: 'OK'
				  }).then(() => {
					this.Back();
					this.ngOnInit(); 
				  });
				
				(err) => {
				  console.error(err);
				  Swal.fire({
					title: 'Erreur!',
					text: 'Un problème est survenu lors de l\'enregistrement du Constateur.',
					icon: 'error',
					confirmButtonText: 'OK'
				  });
				}
				});
  
				
			  
		}
		


	}

}

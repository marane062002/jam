import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import {ISdl} from '../models/sdl/sdl.model';
import {SdlService} from '../service/sdl/sdl.service';
import {IStructureSdl} from '../../parametrages-sdl-delegataire/models/structureSdl/structureSdl.model';
import {StructureDelegataireService} from '../../parametrages-sdl-delegataire/service/structureDelegataire/structure-delegataire.service';
import {StructureSdlService} from '../../parametrages-sdl-delegataire/service/structureSdl/structure-sdl.service';
import {HttpResponse} from '@angular/common/http';
import {IStructureDelegataire} from '../../parametrages-sdl-delegataire/models/structureDelegataire/structureDelegataire.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from "../../../../../environments/environment";
import { MatTableDataSource } from '@angular/material';
@Component({
    selector: 'kt-add-sdl',
    templateUrl: './add-sdl.component.html',
    styleUrls: ['./add-sdl.component.scss']
})
export class AddSdlComponent implements OnInit {
    formDemandeSubmitted = false;
    sdls: ISdl;
    dataSource2 = new MatTableDataSource<any>();
	tabStructureSdls?: IStructureSdl[] | null;
    structure: any[] = [];
    private AlfresscoURL = environment.API_ALFRESCO_URL;
    private baseUrl = environment.API_SDL_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
    sdlForm = this.fb.group({
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
        structureSdl: [''],
        capital: [''],
    });

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private fb: FormBuilder,
        private sdlService: SdlService,
        private structureSdlService: StructureSdlService,
        private translate: TranslateService
    ) {}

	ngOnInit() {
		this.httpClient.get<any[]>(`${this.baseUrl}structure-sdl`,{ headers: this.headers } ).subscribe((response: any) => {
            this.structure = response
            });
      
    }

	Back(): void {
		this.router.navigate(['delegataire/sdl'])
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
	addSdl() {
		
      if (this.sdlForm.valid) {
        this.httpClient.post<any[]>(`${this.baseUrl}sdl`, this.sdlForm.value,{ headers: this.headers }).subscribe(
            (res:any) => {
              
				  const pcjStt = new FormData();
				  const pcjStr = new FormData();
				  const pcjMd = new FormData();


				  pcjStt.append("file", this.pcjStatut)
				  pcjStt.append("sousModule", "STATUT")
				  pcjStt.append("id",res.id)
				  pcjStt.append("label", "SDL");
			
				  this.httpClient.post(`${this.AlfresscoURL}/sdl-pj/multiplefile`, pcjStt)
				  .subscribe((res)=>{
				  })

				  
				  pcjStr.append("file", this.pcjStructure)
				  pcjStr.append("sousModule", "Structure d'activité")
				  pcjStr.append("id",res.id)
				  pcjStr.append("label", "SDL");
			
				  this.httpClient.post(`${this.AlfresscoURL}/sdl-pj/multiplefile`, pcjStr)
				  .subscribe((res)=>{
				  })


				  pcjMd.append("file", this.pcjModel)
				  pcjMd.append("sousModule", "Modèle.J")
				  pcjMd.append("id",res.id)
				  pcjMd.append("label", "SDL");
		  
				this.httpClient.post(`${this.AlfresscoURL}/sdl-pj/multiplefile`, pcjMd)
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
            },
            (err) => {
              console.error(err);
              Swal.fire({
                title: 'Erreur!',
                text: 'Un problème est survenu lors de l\'enregistrement du Constateur.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          );
		}
		// localStorage.setItem("curentStep", JSON.stringify(0));
	}

}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ISuiviDelegataire } from "../models/delegataire/tab-delegataire.model";
import { TabDelegataireService } from "../service/tab-delegataire/tab-delegataire.service";
import { Location } from '@angular/common';
import {ITypeIndicDelegataire} from '../../parametrages-sdl-delegataire/models/typeIndicDelegataire/typeIndicDelegataire.model';
import {TypeIndicDelegataireService} from '../../parametrages-sdl-delegataire/service/typeIndicDelegataire/type-indic-delegataire.service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {IStructureDelegataire} from '../../parametrages-sdl-delegataire/models/structureDelegataire/structureDelegataire.model';
import { environment } from "../../../../../environments/environment";

@Component({
    selector: 'kt-add-tab-delegataire',
    templateUrl: './add-tab-delegataire.component.html',
    styleUrls: ['./add-tab-delegataire.component.scss'],
})
export class AddTabDelegataireComponent implements OnInit {
    formDemandeSubmitted = false;
    suiviDelegataires: ISuiviDelegataire;
	tabTypeIndicateurDelegataires?: ITypeIndicDelegataire[] | null;
    id:any;
	indicateur: any[] = [];
    private baseUrl = environment.API_SDL_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
    suiviDelegataireForm = this.fb.group({
		typeIndicateur: [''],
        nom: [''],
        description: [''],
        dateDeValeur: ['', Validators.required],
        valeurContractuel: ['', Validators.required],
        valeurConstate: [''],
        delegataire: ['']
    });

    constructor(
        private route: ActivatedRoute,
        private httpClient: HttpClient,
        private router: Router,
        private fb: FormBuilder,
        private suiviDelegataireService: TabDelegataireService,
        private translate: TranslateService,
        private typeIndicDelegataireService: TypeIndicDelegataireService,
        private  location: Location
    ) {}

    ngOnInit() {
		this.httpClient.get<any[]>(`${this.baseUrl}type-indicateur`,{ headers: this.headers } ).subscribe((response: any) => {
            this.indicateur = response
        });
        this.route.queryParams.subscribe(params => {
			this.id = params['id'];
		});
		const delegataireObject = { id: this.id };

		this.suiviDelegataireForm.patchValue({
            delegataire: delegataireObject 
		});
	}
	Back(): void {
		this.location.back();
	}

    addSuiviDelegataire() {
      
        if (this.suiviDelegataireForm.valid) {
			
            this.httpClient.post<any[]>(`${this.baseUrl}suivi-delegataire`, this.suiviDelegataireForm.value,{ headers: this.headers }).subscribe(
				(res:any) => {
				  console.log("nouveau res :", res);
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

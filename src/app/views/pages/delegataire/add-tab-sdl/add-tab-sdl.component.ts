import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ISuiviSdl } from "../models/sdl/tab-sdl.model";
import { TabSdlService } from "../service/tab-sdl/tab-sdl.service";
import { Location } from '@angular/common';
import {TypeIndicSdlService} from '../../parametrages-sdl-delegataire/service/typeIndicSdl/type-indic-sdl.service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ITypeIndicSdl} from '../../parametrages-sdl-delegataire/models/typeIndicSdl/typeIndicSdl.model';
import { environment } from "../../../../../environments/environment";
@Component({
	selector: 'kt-add-tab-sdl',
	templateUrl: './add-tab-sdl.component.html',
	styleUrls: ['./add-tab-sdl.component.scss'],
})
export class AddTabSdlComponent implements OnInit {
	formDemandeSubmitted = false;
	suiviSdls: ISuiviSdl;
	tabTypeIndicateurSdls?: ITypeIndicSdl[] | null;
    id:any;
	indicateur: any[] = [];
    private baseUrl = environment.API_SDL_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	suiviSdlForm = this.fb.group({
		typeIndicateurSdl: [''],
        nom: [''],
        description: [''],
        dateDeValeur: ['', Validators.required],
        valeurContractuel: ['', Validators.required],
        valeurConstate: [''],
		sdl:['']
	});

	constructor(
		private route: ActivatedRoute,
		private httpClient: HttpClient,
		private router: Router,
		private fb: FormBuilder,
		private suiviSdlService: TabSdlService,
		private translate: TranslateService,
		private typeIndicSdlService: TypeIndicSdlService,
		private  location: Location
	) {}

	ngOnInit() {
		this.httpClient.get<any[]>(`${this.baseUrl}type-indicateur-sdl`,{ headers: this.headers } ).subscribe((response: any) => {
            this.indicateur = response
        });
		this.route.queryParams.subscribe(params => {
			this.id = params['id'];
		});
		const sdlObject = { id: this.id };

		this.suiviSdlForm.patchValue({
		  sdl: sdlObject 
		});
	}

	Back(): void {
		this.location.back();
	}

	addSuiviSdl() {
		if (this.suiviSdlForm.valid) {
			
		    this.httpClient.post<any[]>(`${this.baseUrl}suivi-sdl`, this.suiviSdlForm.value,{ headers: this.headers }).subscribe(
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



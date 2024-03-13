import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { TabDelegataireService } from '../service/tab-delegataire/tab-delegataire.service';
import { ISuiviDelegataire } from '../models/delegataire/tab-delegataire.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { DatePipe, Location } from '@angular/common';
import { environment } from "../../../../../environments/environment";
@Component({
    selector: 'kt-upd-tab-delegataire',
    templateUrl: './upd-tab-delegataire.component.html',
    styleUrls: ['./upd-tab-delegataire.component.scss']
})
export class UpdTabDelegataireComponent implements OnInit {
    suiviDelegataires: ISuiviDelegataire;
	formSuiviDelegataireSubmitted = false;
    tabTabDelegataire?: ISuiviDelegataire[] | null;

    id:any;
	structure: any[] = [];
	baseUrl = environment.API_SDL_URL
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
    });

    constructor(
        private datePipe:DatePipe,
        private route: ActivatedRoute,
        private httpClient: HttpClient,
        private router: Router,
        private fb: FormBuilder,
        private suiviDelegataireService: TabDelegataireService,
        private translate: TranslateService,
        private activatedRoute: ActivatedRoute,
        private  location: Location
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params["id"];
        this.httpClient.get<any[]>(`${this.baseUrl}suivi-delegataire/${this.id}`, { headers: this.headers }).subscribe((res: any) => {
            this.suiviDelegataireForm.patchValue({ ...res });
            this.suiviDelegataireForm.get('dateDeValeur').setValue(this.datePipe.transform(res.dateDeValeur, 'yyyy-MM-dd'));
          });
		this.httpClient.get<any[]>(`${this.baseUrl}type-indicateur`,{ headers: this.headers } ).subscribe((response: any) => {
			this.structure = response
			this.suiviDelegataireForm.patchValue({ ...response });
			});
		
    }

    selectedValueStructureFunction(p1: InterfaceStreucture, p2: InterfaceStreucture) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}

    Back(): void {
         this.location.back();
    }

    updateSuiviDelegataire() {
		if (this.suiviDelegataireForm.value) {
			if (this.suiviDelegataireForm.valid) {
				this.httpClient.put<any[]>(`${this.baseUrl}suivi-delegataire/${this.id}`,this.suiviDelegataireForm.value,{ headers: this.headers } ).subscribe((response: any) => {
					Swal.fire({
						title: "Enregistrement réussi!",
						text: "Enregistré avec succès.",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {
						this.suiviDelegataireForm.reset(); 
						this.Back()
					});
				},
				(err) => {
					console.error("Erreur lors de la mise à jour du type :", err);
					Swal.fire({
						title: "Erreur!",
						text: "Un problème est survenu lors de l'enregistrement du Type examen.",
						icon: "error",
						confirmButtonText: "OK",
					});
				}
				);
			}
		}
	}

}
export interface InterfaceStreucture{
	id:number;
	libelle:string;
	description:string;
  }

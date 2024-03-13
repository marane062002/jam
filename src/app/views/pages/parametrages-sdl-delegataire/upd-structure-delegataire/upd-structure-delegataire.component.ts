import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { environment } from "../../../../../environments/environment";

import { StructureDelegataireService } from '../service/structureDelegataire/structure-delegataire.service';
import { IStructureDelegataire } from '../models/structureDelegataire/structureDelegataire.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {ISuiviDelegataire} from '../../delegataire/models/delegataire/tab-delegataire.model';
@Component({
	selector: 'kt-upd-structure-delegataire',
	templateUrl: './upd-structure-delegataire.component.html',
	styleUrls: ['./upd-structure-delegataire.component.scss'],
})

export class UpdStructureDelegataireComponent implements OnInit {
	structureDelegatairess: IStructureDelegataire;
	formStructureDelegataireSubmitted = false;
	tabStructureDelegataire?: IStructureDelegataire[] | null;
    id:any;
	baseUrl = environment.API_SDL_URL
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	structureDelegataireForm = this.fb.group({
		libelle: [''],
		description: [''],
	});

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private httpClient: HttpClient,
		private structureDelegataireService: StructureDelegataireService,
		private translate: TranslateService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.httpClient.get<any[]>(`${this.baseUrl}structure-delegatire/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.structureDelegataireForm.patchValue({ ...res });
		});
	}
	Back(): void {
		this.router.navigate(['parametrage-sdl/list-structure-delegataire'])
	}

	updateStructureDelegataire() {
		
		if (this.structureDelegataireForm.value) {
			this.httpClient.put<any[]>(`${this.baseUrl}structure-delegatire/${this.id}`,this.structureDelegataireForm.value,{ headers: this.headers } ).subscribe((response: any) => {
				Swal.fire({
					title: "Enregistrement réussi!",
					text: "Enregistré avec succès.",
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					this.structureDelegataireForm.reset(); 
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

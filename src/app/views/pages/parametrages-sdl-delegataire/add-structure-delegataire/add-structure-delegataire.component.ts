import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {IStructureDelegataire} from '../models/structureDelegataire/structureDelegataire.model';
import {StructureDelegataireService} from '../service/structureDelegataire/structure-delegataire.service';
@Component({
    selector: 'kt-add-structure-delegataire',
    templateUrl: './add-structure-delegataire.component.html',
    styleUrls: ['./add-structure-delegataire.component.scss'],
})
export class AddStructureDelegataireComponent implements OnInit {
    formDemandeSubmitted = false;
    structureDelegatairess: IStructureDelegataire;
	private baseUrl = environment.API_SDL_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
    // GroupForm delegataireForm
    structureDelegataireForm = this.fb.group({
        libelle: [''],
        description: [''],
    });

    constructor(
		private router: Router,
		private httpClient: HttpClient,
		private fb: FormBuilder,
		private structureDelegataireService: StructureDelegataireService,
		private translate: TranslateService
	) {}

	ngOnInit() {}

	Back(): void {
		this.router.navigate(['parametrage-sdl/list-structure-delegataire'])
	}

	addStructureDelegataire() {
		
		if (this.structureDelegataireForm.valid) {
			
			this.httpClient.post<any>(`${this.baseUrl}structure-delegatire`, this.structureDelegataireForm.value,{ headers: this.headers }).subscribe(
				(res:any) => {
				  console.log("nouveau res :", res);
				  Swal.fire({
					title: 'Enregistrement réussi!',
					text: 'Enregistré avec succès.',
					icon: 'success',
					confirmButtonText: 'OK'
				  }).then(() => {
					this.Back();
					this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
				  });
				},
				(err) => {
				  console.error(err);
				  Swal.fire({
					title: 'Erreur!',
					text: 'Un problème est survenu lors de l\'enregistrement .',
					icon: 'error',
					confirmButtonText: 'OK'
				  });
				}
			  );
		}

	}

}






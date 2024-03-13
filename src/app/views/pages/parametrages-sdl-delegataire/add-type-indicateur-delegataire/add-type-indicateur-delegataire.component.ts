import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {ITypeIndicDelegataire} from '../models/typeIndicDelegataire/typeIndicDelegataire.model';
import {TypeIndicDelegataireService} from '../service/typeIndicDelegataire/type-indic-delegataire.service';
@Component({
	selector: "kt-add-type-indicateur-delegataire",
	templateUrl: "./add-type-indicateur-delegataire.component.html",
	styleUrls: ["./add-type-indicateur-delegataire.component.scss"],
})
export class AddTypeIndicateurDelegataireComponent implements OnInit {
	formDemandeSubmitted = false;
	typeIndicDelegataireServicess: ITypeIndicDelegataire;
	private baseUrl = environment.API_SDL_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	typeIndicDelegataireForm = this.fb.group({
		libelle: [''],
		description: [''],
	});

	constructor(
		private router: Router,
		private httpClient: HttpClient,
		private fb: FormBuilder,
		private typeIndicDelegataireService: TypeIndicDelegataireService,
		private translate: TranslateService
	) {}

	ngOnInit() {}

	Back(): void {
		this.router.navigate(['parametrage-sdl/list-type-indicateur-delegataire'])
	}

	addTypeIndicDelegataire() {
		this.formDemandeSubmitted = true;
		console.log('form submit !');
		console.log('type indicateur delegataire form', this.typeIndicDelegataireForm.value);

		if (this.typeIndicDelegataireForm.valid) {
			this.httpClient.post<any>(`${this.baseUrl}type-indicateur`, this.typeIndicDelegataireForm.value,{ headers: this.headers }).subscribe(
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







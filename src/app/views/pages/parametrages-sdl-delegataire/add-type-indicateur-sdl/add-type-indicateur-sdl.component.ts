import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {ITypeIndicSdl} from '../models/typeIndicSdl/typeIndicSdl.model';
import {TypeIndicSdlService} from '../service/typeIndicSdl/type-indic-sdl.service';
@Component({
	selector: "kt-add-type-indicateur-sdl",
	templateUrl: "./add-type-indicateur-sdl.component.html",
	styleUrls: ["./add-type-indicateur-sdl.component.scss"],
})
export class AddTypeIndicateurSdlComponent implements OnInit {
	formDemandeSubmitted = false;
	typeIndicSdlServicess: ITypeIndicSdl;
	private baseUrl = environment.API_SDL_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	typeIndicSdlForm = this.fb.group({
		libelle: [''],
		description: [''],
	});

	constructor(
		private httpClient: HttpClient,
		private router: Router,
		private fb: FormBuilder,
		private typeIndicSdlService: TypeIndicSdlService,
		private translate: TranslateService
	) {}

	ngOnInit() {}

	Back(): void {
		this.router.navigate(['parametrage-sdl/list-type-indicateur-sdl'])
	}

	addTypeIndicSdl() {
		this.formDemandeSubmitted = true;
		console.log('form submit !');
		console.log('type indicateur sdl form', this.typeIndicSdlForm.value);

		if (this.typeIndicSdlForm.valid) {
			this.httpClient.post<any>(`${this.baseUrl}type-indicateur-sdl`, this.typeIndicSdlForm.value,{ headers: this.headers }).subscribe(
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




import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { environment } from "../../../../../environments/environment";
import {IStructureSdl} from '../models/structureSdl/structureSdl.model';
import {StructureSdlService} from '../service/structureSdl/structure-sdl.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
	selector: 'kt-add-structure-sdl',
	templateUrl: './add-structure-sdl.component.html',
	styleUrls: ['./add-structure-sdl.component.scss']
})
export class AddStructureSdlComponent implements OnInit {
	formDemandeSubmitted = false;
	structureSdlss: IStructureSdl;
	private baseUrl = environment.API_SDL_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});

	structureSdlForm = this.fb.group({
		libelle: [''],
		description: [''],
	});

	constructor(
		private router: Router,
		private httpClient: HttpClient,
		private fb: FormBuilder,
		private structureSdlService: StructureSdlService,
		private translate: TranslateService
	) {}

	ngOnInit() {}

	Back(): void {
		this.router.navigate(['parametrage-sdl/list-structure-sdl'])
	}

	addStructureSdl() {
		this.formDemandeSubmitted = true;
		console.log('form submit !');
		console.log('structure sdl form', this.structureSdlForm.value);

		if (this.structureSdlForm.valid) {
			this.httpClient.post<any>(`${this.baseUrl}structure-sdl`, this.structureSdlForm.value,{ headers: this.headers }).subscribe(
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
		// localStorage.setItem("curentStep", JSON.stringify(0));
	}

}






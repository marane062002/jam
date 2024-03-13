import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { TypeIndicSdlService } from "../service/typeIndicSdl/type-indic-sdl.service";
import { ITypeIndicSdl } from "../models/typeIndicSdl/typeIndicSdl.model";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";

@Component({
	selector: "kt-upd-type-indicateur-sdl",
	templateUrl: "./upd-type-indicateur-sdl.component.html",
	styleUrls: ["./upd-type-indicateur-sdl.component.scss"],
})
export class UpdTypeIndicateurSdlComponent implements OnInit {
	typeIndicSdlss: ITypeIndicSdl;
	formSdlSubmitted = false;
	tabTypeIndicSdl?: ITypeIndicSdl[] | null;
	id:any;
	baseUrl = environment.API_SDL_URL
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	typeIndicSdlForm = this.fb.group({
		libelle: [''],
		description: [''],
	});

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private httpClient: HttpClient,
		private typeIndicSdlService: TypeIndicSdlService,
		private translate: TranslateService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.httpClient.get<any[]>(`${this.baseUrl}type-indicateur-sdl/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.typeIndicSdlForm.patchValue({ ...res });
		});
	}
	Back(): void {
		this.router.navigate(['parametrage-sdl/list-type-indicateur-sdl']);
	}

	updateTypeIndicSdl() {
			
		if (this.typeIndicSdlForm.value) {
			this.httpClient.put<any[]>(`${this.baseUrl}type-indicateur-sdl/${this.id}`,this.typeIndicSdlForm.value,{ headers: this.headers } ).subscribe((response: any) => {
				Swal.fire({
					title: "Enregistrement réussi!",
					text: "Enregistré avec succès.",
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					this.typeIndicSdlForm.reset(); 
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

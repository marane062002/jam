import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { TypeIndicDelegataireService } from "../service/typeIndicDelegataire/type-indic-delegataire.service";
import { ITypeIndicDelegataire } from "../models/typeIndicDelegataire/typeIndicDelegataire.model";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
@Component({
	selector: "kt-upd-type-indicateur-delegataire",
	templateUrl: "./upd-type-indicateur-delegataire.component.html",
	styleUrls: ["./upd-type-indicateur-delegataire.component.scss"],
})
export class UpdTypeIndicateurDelegataireComponent implements OnInit {
	typeIndicDelegatairess: ITypeIndicDelegataire;
	formDelegataireSubmitted = false;
	tabTypeIndicDelegataire?: ITypeIndicDelegataire[] | null;
	id:any;
	baseUrl = environment.API_SDL_URL
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	typeIndicDelegataireForm = this.fb.group({
		libelle: [''],
		description: [''],
	});

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private httpClient: HttpClient,
		private typeIndicDelegataireService: TypeIndicDelegataireService,
		private translate: TranslateService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.httpClient.get<any[]>(`${this.baseUrl}type-indicateur/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.typeIndicDelegataireForm.patchValue({ ...res });
		});
	}
	Back(): void {
		this.router.navigate(['parametrage-sdl/list-type-indicateur-delegataire']);
	}

	updateTypeIndicDelegataire() {
			if (this.typeIndicDelegataireForm.valid) {
				this.httpClient.put<any[]>(`${this.baseUrl}type-indicateur/${this.id}`,this.typeIndicDelegataireForm.value,{ headers: this.headers } ).subscribe((response: any) => {
					Swal.fire({
						title: "Enregistrement réussi!",
						text: "Enregistré avec succès.",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {
						this.typeIndicDelegataireForm.reset(); 
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

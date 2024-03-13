import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { environment } from "../../../../../environments/environment";
import { StructureSdlService } from "../service/structureSdl/structure-sdl.service";
import { IStructureSdl } from "../models/structureSdl/structureSdl.model";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
@Component({
	selector: 'kt-upd-structure-sdl',
	templateUrl: './upd-structure-sdl.component.html',
	styleUrls: ['./upd-structure-sdl.component.scss'],
})

export class UpdStructureSdlComponent implements OnInit {
	structureSdlss: IStructureSdl;
	formSdlSubmitted = false;
	tabStructureSdl?: IStructureSdl[] | null;
	id:any;
	baseUrl = environment.API_SDL_URL
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
		private fb: FormBuilder,
		private structureSdlService: StructureSdlService,
		private translate: TranslateService,
		private activatedRoute: ActivatedRoute,
		private httpClient: HttpClient,
		private route: ActivatedRoute,
	) {}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.httpClient.get<any[]>(`${this.baseUrl}structure-sdl/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.structureSdlForm.patchValue({ ...res });
		});
	}
	Back(): void {
		this.router.navigate(['parametrage-sdl/list-structure-sdl']);
	}

	updateStructureSdl() {
		if (this.structureSdlForm.value) {
			if (this.structureSdlForm.valid) {
				this.httpClient.put<any[]>(`${this.baseUrl}structure-sdl/${this.id}`,this.structureSdlForm.value,{ headers: this.headers } ).subscribe((response: any) => {
					Swal.fire({
						title: "Enregistrement réussi!",
						text: "Enregistré avec succès.",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {
						this.structureSdlForm.reset(); 
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

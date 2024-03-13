import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import {TabSdlService} from '../service/tab-sdl/tab-sdl.service';
import { ISuiviSdl } from "../models/sdl/tab-sdl.model";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import {DatePipe, Location} from '@angular/common';
import { environment } from "../../../../../environments/environment";
import {ITypeIndicSdl} from '../../parametrages-sdl-delegataire/models/typeIndicSdl/typeIndicSdl.model';
import {TypeIndicSdlService} from '../../parametrages-sdl-delegataire/service/typeIndicSdl/type-indic-sdl.service';
@Component({
	selector: 'kt-upd-tab-sdl',
	templateUrl: './upd-tab-sdl.component.html',
	styleUrls: ['./upd-tab-sdl.component.scss']
})
export class UpdTabSdlComponent implements OnInit {
	suiviSdls: ISuiviSdl;
	formSdlSubmitted = false;
	tabSuiviSdl?: ISuiviSdl[] | null;
	tabTypeIndicateurSdls?: ITypeIndicSdl[] | null;
	id:any;
	structure: any[] = [];
	baseUrl = environment.API_SDL_URL
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
	});

	constructor(
		private datePipe: DatePipe,
		private httpClient: HttpClient,
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private suiviSdlService: TabSdlService,
		private translate: TranslateService,
		private activatedRoute: ActivatedRoute,
		private typeIndicSdlService: TypeIndicSdlService,
		private  location: Location
	) {}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.httpClient.get<any[]>(`${this.baseUrl}type-indicateur-sdl`,{ headers: this.headers } ).subscribe((response: any) => {
			this.structure = response
			this.suiviSdlForm.patchValue({ ...response });
			});
		this.httpClient.get<any[]>(`${this.baseUrl}suivi-sdl/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.suiviSdlForm.patchValue({ ...res });
			this.suiviSdlForm.get('dateDeValeur').setValue(this.datePipe.transform(res.dateDeValeur, 'yyyy-MM-dd'));
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

	updateSuiviSdl() {
		if (this.suiviSdlForm.value) {
			if (this.suiviSdlForm.valid) {
				this.httpClient.put<any[]>(`${this.baseUrl}suivi-sdl/${this.id}`,this.suiviSdlForm.value,{ headers: this.headers } ).subscribe((response: any) => {
					Swal.fire({
						title: "Enregistrement réussi!",
						text: "Enregistré avec succès.",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {
						this.suiviSdlForm.reset(); 
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
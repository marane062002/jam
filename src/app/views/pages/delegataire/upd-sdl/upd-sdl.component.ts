import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { SdlService } from "../service/sdl/sdl.service";
import { ISdl } from "../models/sdl/sdl.model";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import {IStructureSdl} from '../../parametrages-sdl-delegataire/models/structureSdl/structureSdl.model';
import {StructureSdlService} from '../../parametrages-sdl-delegataire/service/structureSdl/structure-sdl.service';
import { MatTableDataSource } from '@angular/material';
import { Association360Tab } from '../../pesee/show-pesee/show-pesee.component';
import { Observable } from 'rxjs';
import * as $ from "jquery";
@Component({
	selector: 'kt-upd-sdl',
	templateUrl: './upd-sdl.component.html',
	styleUrls: ['./upd-sdl.component.scss']
})
export class UpdSdlComponent implements OnInit {
	sdls: ISdl;
	formSdlSubmitted = false;
	tabSdl?: ISdl[] | null;
	tabStructureSdls?: IStructureSdl[] | null;


	pcfileDeclar : File;
	labelDeclar: any;
	pcDeclarantFile: File;
	dataSource2 = new MatTableDataSource<any>();
    allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
	dataSource3: MatTableDataSource<any>;
    formDelegataireSubmitted = false;
	displayedColumns2=['nomDoc','titre','label','dow']
	displayedColumns1 = [ "label", "nomDoc", "actions"];
	asyncTabs: Observable<Association360Tab[]>;
	id:any;
	AlfresscoURL = environment.API_ALFRESCO_URL

	structure: any[] = [];
	baseUrl = environment.API_SDL_URL
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	sdlForm = this.fb.group({
		raisonSociale: [''],
        raisonCommerciale: [''],
        identifiantFiscal: ['', Validators.required],
        identifiantCommun: ['', Validators.required],
        numCnss: ['', Validators.required],
        adresse: [''],
        numTel: [''],
        nemFax: [''],
        email: [''],
        gerant: [''],
		structureSdl: [''],
		capital: [''],
	});

	constructor(
		private route: ActivatedRoute,
		private httpClient: HttpClient,
		private router: Router,
		private fb: FormBuilder,
		private sdlService: SdlService,
		private translate: TranslateService,
		private structureSdlService: StructureSdlService,
		private activatedRoute: ActivatedRoute
	) {}
	pjDeclar: any;
	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.pjDeclar= this.fb.group({
			pcfile: [""],
		})

		this.getAllPjImm(this.id)
		this.httpClient.get<any[]>(`${this.baseUrl}structure-sdl`,{ headers: this.headers } ).subscribe((response: any) => {
			this.structure = response
			this.sdlForm.patchValue({ ...response });
			});
		this.httpClient.get<any[]>(`${this.baseUrl}sdl/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.sdlForm.patchValue({ ...res });
			console.log(this.sdlForm.value)
		});
	}
	selectedValueStructureFunction(p1: InterfaceStreucture, p2: InterfaceStreucture) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	saveDec(event: any): void {
		$("#testd").val(event.target.files[0].name);
		this.pjDeclar.get('pcfile').setValue(event.target.files[0].name);
		this.formPjDeclar.selecetedFile = event.target.files[0];
	  }
	
	  labelDeclarant(event: any): void {
		this.formPjDeclar.LabelPj = event.target.value;
	  }
	  validerPjDec() {
		this.allpjDeclar.push(this.formPjDeclar);
		$("#testd").val(null);
		this.dataSource3 = new MatTableDataSource(this.allpjDeclar);
		this.formPjDeclar = { selecetedFile: {}, LabelPj: this.formPjDeclar.LabelPj };
	  }
	Back(): void {
		this.router.navigate(['delegataire/sdl']);
	}
	onDeletePjDec(id: number): void {
		this.allpjDeclar.splice(id, 1);
		if (this.allpjDeclar.length > 0) {
		  this.dataSource3 = new MatTableDataSource(this.allpjDeclar);
		} else {
		  this.dataSource3 = null;
		}
	  }
	  onClickPj(e, id) {
        var r = e.substring(0, e.length - 4);
		console.log("rrrrr:", r)
		console.log("id alf:", id)

        this.httpClient.delete(`${this.AlfresscoURL}/sdl-pj/index/${id}`)
		.subscribe(
            (data:any) => {
				console.log(data)
				this.ngOnInit()
            },
            (error) => console.log(error)
        );
    }
	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/sdl-pj/index/${ide}`)
		.subscribe(
            (data:any) => {
				// 
                this.dataSource2 = new MatTableDataSource(data);
            },
            (error) => console.log(error)
        );
    }
	updateSdl() {
	
		if (this.sdlForm.value) {
			if (this.sdlForm.valid) {
				this.httpClient.put<any[]>(`${this.baseUrl}sdl/${this.id}`,this.sdlForm.value,{ headers: this.headers } ).subscribe((response: any) => {
					
					this.allpjDeclar.forEach(formPj => {	
        
						const pcjDeclarant = new FormData();
					
						  pcjDeclarant.append("file", formPj.selecetedFile)
						  pcjDeclarant.append("sousModule", "SDL")
						  pcjDeclarant.append("id",this.id)
						  pcjDeclarant.append("label", formPj.LabelPj);
					
						  this.httpClient.post(`${this.AlfresscoURL}/sdl-pj/multiplefile`, pcjDeclarant)
						  .subscribe((res)=>{
						  })
						});
					
					Swal.fire({
						title: "Enregistrement réussi!",
						text: "Enregistré avec succès.",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {
						this.sdlForm.reset(); 
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

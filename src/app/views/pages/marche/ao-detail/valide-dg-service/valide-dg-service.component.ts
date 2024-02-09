import { Component, OnInit, ViewChild } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	FormArray,
	FormControl,
	NgForm,
	Validators,
} from "@angular/forms";
import { AoService } from "../../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import * as $ from "jquery";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "./../../../../../../environments/environment";
import Swal from "sweetalert2";

@Component({
	selector: "kt-valide-dg-service",
	templateUrl: "./valide-dg-service.component.html",
	styleUrls: ["./valide-dg-service.component.scss"],
})
export class ValideDgServiceComponent implements OnInit {


	visa:FormGroup
	idao:number;
	  constructor(	private activatedRoute: ActivatedRoute,
		private aoService:AoService) {
		this.visa = new FormGroup({
		  note: new FormControl('',Validators.required),
		});
	   }
	
	   ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
				this.idao = params["id"];
			});
			this.getDetailsAo();
	  }
	
	  onSubmit(value:any){
		console.log(value);
		this.aoService.updateVisaDGS(this.idao, value).subscribe(res=>{
		  console.log(res);
		  Swal.fire(
			'Visa de DGS à été bien traité',
			' ',
			'success'
		  )
		  this.ngOnInit();
		},err=>{
		  console.log(err)
		})
	  
	  }
	  getDetailsAo() {
		// start spinner
			this.aoService	.getAoById(this.idao).subscribe(
					(data) => {
						console.log("AO " + JSON.stringify(data, null, 2))
					this.visa.get("note").setValue(data.visaDSF);
					},
					(err) => {
						console.log(err);
					}
				);
		}
}
export interface Validation {
	id: string;
	dateReponse: string;
	reserve: string;
	ao: string;
	valide: string;
}

import {
	Component,
	OnInit,
	ViewChild,
	ViewChildren,
	QueryList,
} from "@angular/core";
import { AoService } from "../../../shared/ao.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import * as $ from "jquery";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "./../../../../../../environments/environment";
import Swal from "sweetalert2";

@Component({
	selector: "kt-valide-tresorerie",
	templateUrl: "./valide-tresorerie.component.html",
	styleUrls: ["./valide-tresorerie.component.scss"],
})
export class ValideTresorerieComponent implements OnInit {

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
		this.aoService.updateVisaTresorie	(this.idao, value).subscribe(res=>{
		  console.log(res)
		  Swal.fire(
			'Visa de Tresorie à été bien traité',
			' ',
			'success'
		  );
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
					this.visa.get("note").setValue(data.visaTresorerie);
					},
					(err) => {
						console.log(err);
					}
				);
		}

}

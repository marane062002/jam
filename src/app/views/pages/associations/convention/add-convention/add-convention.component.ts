import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ConventionMarcheService } from "../../../shared/conventionService";
import * as $ from "jquery";
@Component({
	selector: "kt-add-convention",
	templateUrl: "./add-convention.component.html",
	styleUrls: ["./add-convention.component.scss"],
})
export class AddConventionComponent implements OnInit {
	isVisible: any;
	isSelected: boolean = false;
	formConvention:FormGroup;
	convention_id
	isUpdate: boolean = false;
	formPj = { type: 0, selecetedFile: {} };
	allpjs = [];
	constructor(private router: Router, 
		private activatedRoute:ActivatedRoute,
	private conventionMarcheService:ConventionMarcheService) {
		this.formConvention = new FormGroup({
			id: new FormControl(''),
			object: new FormControl(''),
			montant: new FormControl(''),
			duree: new FormControl(''),
			date: new FormControl(''),
		  });
	}

	ngOnInit() {
		
		  this.activatedRoute.queryParams.subscribe(params => {
			this.convention_id= params['id']; 
			if(this.convention_id!=undefined && this.convention_id!=0){
			  this.isUpdate=true;
			  this.conventionMarcheService.findById(this.convention_id).subscribe((res:any)=>{
			   this.formConvention.patchValue(res);
			   console.log(this.formConvention.value)
			   },err=>{
				console.log(err);
			   })
			}
		})
	}
  
	RetourEmbalages(){
		this.router.navigate(["/convention/listconvention"]);
	}

	onSubmit(){
		this.conventionMarcheService.save(this.formConvention.value).subscribe(res=>{
		let id=JSON.parse(res).id;
			if (this.allpjs.length > 0 &&id!=undefined) {
				for (var i = 0; i < this.allpjs.length; i++) {
					this.conventionMarcheService.nouvellepj(this.allpjs[i].selecetedFile,id,"ConventionMrche")
						.subscribe((data) => {
							
							console.log("C: " + JSON.stringify(data, null, 2));
						});
				}
			}
			this.RetourEmbalages();
		},err=>{
			console.log(err)
		})
	}
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
		this.allpjs.push(this.formPj);
	}
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { MorgueService } from "../services/morgue.service";
import { InterfaceMorgue } from "../list-morgue/list-morgue.component";
import * as $ from "jquery";
import { InterfaceCommune } from "../../parametrage-bmh/list-commune/list-commune.component";
import { Association360Tab } from "../details-obstacles/details-obstacles.component";
import { MatTableDataSource } from "@angular/material";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
@Component({
	selector: "kt-update-morgue",
	templateUrl: "./update-morgue.component.html",
	styleUrls: ["./update-morgue.component.scss"],
})
export class UpdateMorgueComponent implements OnInit {
	pcfileDeclar : File;
	labelDeclar: any;
	pcDeclarantFile: File;
    allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
	dataSource3: MatTableDataSource<any>;

	displayedColumns1 = [ "label", "nomDoc", "actions"];

	dataSource2 = new MatTableDataSource<any>();

	displayedColumns2=['nomDoc','titre','label','dow']
	asyncTabs: Observable<Association360Tab[]>;
	id: any;
	details;
	
	AlfresscoURL = environment.API_ALFRESCO_URL
	constructor(private httpClient:HttpClient ,private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute, private service: MorgueService) {}
	FormArticle = new FormGroup({
		id: new FormControl(""),
		numCasier: new FormControl("", Validators.required),
		numDeces: new FormControl("", Validators.required),
		status: new FormControl("", Validators.required),
	});
    pjDeclar: any;
	ngOnInit() {
		this.pjDeclar= this.formBuilder.group({
			pcfile: [""],
		})
	
		const id = this.route.snapshot.params["id"];
		this.getAllPjImm(id);
		this.service.getById(id).subscribe(
			(res) => {
				console.log(res);
				this.FormArticle.patchValue({ ...res });
				//
				// const dateFormatee = this.datePipe.transform(this.FormArticle.value.date, 'yyyy-MM-dd');
				// // this.FormArticle.value.date = dateFormatee
				// this.FormArticle.patchValue({date: dateFormatee});
				//
				// console.log(dateFormatee)
				this.FormArticle.value;
			},
			(err) => {
				console.log(err);
			}
		);
		// this.typeService.getAllTypes().subscribe(res=>{
		//   this.type=res;
		// })
	}
	onPcDeclarantChange(event: any) {
		this.pcDeclarantFile = event.target.files[0];
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

  onDeletePjDec(id: number): void {
    this.allpjDeclar.splice(id, 1);
    if (this.allpjDeclar.length > 0) {
      this.dataSource3 = new MatTableDataSource(this.allpjDeclar);
    } else {
      this.dataSource3 = null;
    }
  }
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-morgue"]);
	}



	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/bmh-morgue/index/${ide}`)
		.subscribe(
            (data:any) => {
				// 
                this.dataSource2 = new MatTableDataSource(data);
            },
            (error) => console.log(error)
        );
    }
	onClickPj(e, id) {
        var r = e.substring(0, e.length - 4);
		console.log("rrrrr:", r)
		console.log("id alf:", id)

        this.httpClient.delete(`${this.AlfresscoURL}/bmh-morgue/index/${id}`)
		.subscribe(
            (data:any) => {
				console.log(data)
				this.ngOnInit()
            },
            (error) => console.log(error)
        );
    }



	selectedValueMorgueFunction(p1: InterfaceMorgue, p2: InterfaceMorgue) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	update() {
		if (this.FormArticle.valid) {
			this.service.update(this.FormArticle.value.id, this.FormArticle.value).subscribe(
				(res) => {

					this.allpjDeclar.forEach(formPj => {	
        
						const pcjDeclarant = new FormData();
					
						  pcjDeclarant.append("file", formPj.selecetedFile)
						  pcjDeclarant.append("sousModule", "MORGUE")
						  pcjDeclarant.append("id",this.FormArticle.value.id)
						  pcjDeclarant.append("label", formPj.LabelPj);
					
						  this.httpClient.post(`${this.AlfresscoURL}/bmh-morgue/multiplefile`, pcjDeclarant)
						  .subscribe((res)=>{
						  console.log('Morgue pièce Jointe stored successfully:', res);
						  })
						});

					console.log("Type mis à jour avec succès :", res);
					Swal.fire({
						title: "Enregistrement réussi!",
						text: "Type Examen enregistré avec succès.",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {
						this.FormArticle.reset();
						this.RetourEmbalages();
						this.ngOnInit(); 
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
		} else {
			console.log("le formulaire est invalide");
		}
	}
}

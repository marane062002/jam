import { Component, OnInit } from "@angular/core";
import { InterfaceType } from "../../parametrage-bmh/list-types/list-types.component";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { TypeServiceService } from "../../../pages/parametrage-bmh/services/type-service.service";
import { OrganismeService } from "../services/organisme.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { Association360Tab } from "../details-obstacles/details-obstacles.component";
import { Observable } from "rxjs";
import * as $ from "jquery";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
@Component({
	selector: "kt-update-organisme",
	templateUrl: "./update-organisme.component.html",
	styleUrls: ["./update-organisme.component.scss"],
})
export class UpdateOrganismeComponent implements OnInit {
	type: InterfaceType[] = [];


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
	constructor(private httpClient : HttpClient,private formBuilder: FormBuilder,private typeService: TypeServiceService, private router: Router, private route: ActivatedRoute, private service: OrganismeService) {}
	FormArticle = new FormGroup({
		id: new FormControl(""),
		raisonSociale: new FormControl("", Validators.required),
		rc: new FormControl("", Validators.required),
		ice: new FormControl("", Validators.required),
		adresse: new FormControl("", Validators.required),
		iff: new FormControl("", Validators.required),
		tel: new FormControl("", Validators.required),
		type: new FormControl("", Validators.required),
	});
	pjDeclar: any;
	ngOnInit() {
		this.pjDeclar= this.formBuilder.group({
			pcfile: [""],
		})
		const id = this.route.snapshot.params["id"];
		this.getAllPjImm(id)
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
		this.typeService.getAllTypes().subscribe((res) => {
			this.type = res;
		});
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-organisme"]);
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
	selectedValueTypeFunction(p1: InterfaceType, p2: InterfaceType) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}

	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/bmh-organisme/index/${ide}`)
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

        this.httpClient.delete(`${this.AlfresscoURL}/bmh-organisme/index/${id}`)
		.subscribe(
            (data:any) => {
				console.log(data)
				this.ngOnInit()
            },
            (error) => console.log(error)
        );
    }
	update() {
		if (this.FormArticle.valid) {
			this.service.update(this.FormArticle.value.id, this.FormArticle.value).subscribe(
				(res) => {

					this.allpjDeclar.forEach(formPj => {	
        
						const pcjDeclarant = new FormData();
					
						  pcjDeclarant.append("file", formPj.selecetedFile)
						  pcjDeclarant.append("sousModule", "ORGANISME")
						  pcjDeclarant.append("id",this.FormArticle.value.id)
						  pcjDeclarant.append("label", formPj.LabelPj);
					
						  this.httpClient.post(`${this.AlfresscoURL}/bmh-organisme/multiplefile`, pcjDeclarant)
						  .subscribe((res)=>{
						  console.log('deces naturel pièce Jointe stored successfully:', res);
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
						this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
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

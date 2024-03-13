import { Component, OnInit } from "@angular/core";
import { InterfaceType } from "../../parametrage-bmh/list-types/list-types.component";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { OrganismeService } from "../services/organisme.service";
import { TypeServiceService } from "../../../pages/parametrage-bmh/services/type-service.service";
import Swal from "sweetalert2";
import * as $ from "jquery";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { MatTableDataSource } from "@angular/material";
@Component({
	selector: "kt-add-organisme",
	templateUrl: "./add-organisme.component.html",
	styleUrls: ["./add-organisme.component.scss"],
})
export class AddOrganismeComponent implements OnInit {
	type: InterfaceType[] = [];
	ajoutForm: any;
	pcJointeFile: File;
	private AlfresscoURL = environment.API_ALFRESCO_URL;

	pcDeclarantFile: File;

	pcfileDeclar : File;
	labelDeclar: any;
  
  
	allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
	dataSource3: MatTableDataSource<any>;
  
  
	displayedColumns1 = [ "label", "nomDoc", "actions"];
  

	constructor(private httpClient: HttpClient,private router: Router, private formBuilder: FormBuilder, private service: OrganismeService, private typeService: TypeServiceService) {}
	pjDeclar: any;
	ngOnInit() {
		this.pjDeclar= this.formBuilder.group({
			pcfile: [""],
		})
		this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			raisonSociale: [""],
			rc: [""],
			ice: [""],
			adresse: [""],
			iff: [""],
			tel: [""],
			type: [""],
		});
		this.typeService.getAllTypes().subscribe((res) => {
			this.type = res;
			console.log(res);
			console.log(this.type);
		});
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
		this.router.navigate(["/bmh1/list-organisme"]);
	}
	ajouter() {
		if (this.ajoutForm.valid) {
			this.service.create(this.ajoutForm.value).subscribe(
				(res:any) => {
					this.allpjDeclar.forEach(formPj => {	
        
						const pcjDeclarant = new FormData();
					
						  pcjDeclarant.append("file", formPj.selecetedFile)
						  pcjDeclarant.append("sousModule", "ORGANISME")
						  pcjDeclarant.append("id",res.id)
						  pcjDeclarant.append("label", formPj.LabelPj);
					
						  this.httpClient.post(`${this.AlfresscoURL}/bmh-organisme/multiplefile`, pcjDeclarant)
						  .subscribe((res)=>{
						  console.log('deces naturel pièce Jointe stored successfully:', res);
						  })
						});
					console.log(res);
					Swal.fire({
						title: "Enregistrement réussi!",
						text: "Constateur enregistré avec succès.",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {
						this.RetourEmbalages();
						this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
					});
				},
				(err) => {
					console.error(err);
					Swal.fire({
						title: "Erreur!",
						text: "Un problème est survenu lors de l'enregistrement du Constateur.",
						icon: "error",
						confirmButtonText: "OK",
					});
				}
			);
		}
	}
}

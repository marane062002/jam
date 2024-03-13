import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { MorgueService } from "../services/morgue.service";
import { HttpClient } from "@angular/common/http";
import * as $ from "jquery";
import { environment } from "../../../../../environments/environment";
import { MatTableDataSource } from "@angular/material";
@Component({
	selector: "kt-add-morgue",
	templateUrl: "./add-morgue.component.html",
	styleUrls: ["./add-morgue.component.scss"],
})
export class AddMorgueComponent implements OnInit {
	ajoutForm: any;
	pcJointeFile: File;


	pcDeclarantFile: File;

    pcfileDeclar : File;
	labelDeclar: any;


    allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
    dataSource3: MatTableDataSource<any>;


    displayedColumns1 = [ "label", "nomDoc", "actions"];


	private AlfresscoURL = environment.API_ALFRESCO_URL;
	constructor(private httpClient: HttpClient,private router: Router, private formBuilder: FormBuilder, private service: MorgueService) {}
	pjDeclar: any;
	ngOnInit() {
		this.pjDeclar= this.formBuilder.group({
			pcfile: [""],
		})
		this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			numCasier: [""],
			numDeces: [""],
			status: [""],
		});
		// this.organismeService.getAll().subscribe(res=>{
		//   this.organisme=res
		//   console.log(res);
		//   console.log(this.organisme);
		// })
		// this.vehiculeService.getAll().subscribe(res=>{
		//   this.vehicule=res
		//   console.log(res);
		//   console.log(this.vehicule);
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
	ajouter() {
		if (this.ajoutForm.valid) {
			const formData = new FormData();
			const pcJointe = new FormData();

			formData.append("morgue",new Blob([JSON.stringify(this.ajoutForm.value)],{type:'application/json'}))
			// formData.append("pcj",this.pcJointeFile)
			this.service.create(formData).subscribe(
				(res:any) => {
					this.allpjDeclar.forEach(formPj => {	
        		
						const pcjDeclarant = new FormData();
					
						  pcjDeclarant.append("file", formPj.selecetedFile)
						  pcjDeclarant.append("sousModule", "MORGUE")
						  pcjDeclarant.append("id",res.id)
						  pcjDeclarant.append("label", formPj.LabelPj);
					
						  this.httpClient.post(`${this.AlfresscoURL}/bmh-morgue/multiplefile`, pcjDeclarant)
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

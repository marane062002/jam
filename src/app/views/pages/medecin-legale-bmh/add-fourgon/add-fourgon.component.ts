import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FourgonService } from "../services/fourgon.service";
import { OrganismeService } from "../services/organisme.service";
import { InterfaceOrganisme } from "../list-organisme/list-organisme.component";
import { InterfaceVehicule } from "../../parametrage-bmh/list-vehicule/list-vehicule.component";
import { VehiculeService } from "../../parametrage-bmh/services/vehicule.service";
import { HttpClient } from "@angular/common/http";
import * as $ from "jquery";
import { environment } from "../../../../../environments/environment";
import { MatTableDataSource } from "@angular/material";
@Component({
	selector: "kt-add-fourgon",
	templateUrl: "./add-fourgon.component.html",
	styleUrls: ["./add-fourgon.component.scss"],
})
export class AddFourgonComponent implements OnInit {
	organisme: InterfaceOrganisme[] = [];
	vehicule: InterfaceVehicule[] = [];
	pcJFile:File;
	ajoutForm: any;
    
	pcDeclarantFile: File;

	pcfileDeclar : File;
	  labelDeclar: any;
  
  
	allpjDeclar = []
	  formPjDeclar = { selecetedFile: {}, LabelPj: "" };
	dataSource3: MatTableDataSource<any>;
  
  
	displayedColumns1 = [ "label", "nomDoc", "actions"];
  
  
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	constructor(private httpClient: HttpClient,private router: Router, private formBuilder: FormBuilder, private service: FourgonService, private organismeService: OrganismeService, private vehiculeService: VehiculeService) {}
	pjDeclar: any;
	ngOnInit() {
		this.pjDeclar= this.formBuilder.group({
			pcfile: [""],
		})
		this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			matricule: [""],
			couleur: [""],
			vehicule: [""],
			organisme: [""],
		});
		this.organismeService.getAll().subscribe((res) => {
			this.organisme = res;
			console.log(res);
			console.log(this.organisme);
		});
		this.vehiculeService.getAll().subscribe((res) => {
			this.vehicule = res;
			console.log(res);
			console.log(this.vehicule);
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
		this.router.navigate(["/bmh1/list-fourgon/"]);
	}
	ajouter() {
		if (this.ajoutForm.valid) {
			const formData = new FormData();
			const pcj = new FormData();
			formData.append("fourgon", new Blob([JSON.stringify(this.ajoutForm.value)],{ type: 'application/json' }))
			formData.append("pcj",this.pcJFile)
			this.service.create(formData).subscribe(
				(res:any) => {
					// 
					console.log(res);
					
					this.allpjDeclar.forEach(formPj => {	
        
						const pcjDeclarant = new FormData();
					
						  pcjDeclarant.append("file", formPj.selecetedFile)
						  pcjDeclarant.append("sousModule", "FOURGON")
						  pcjDeclarant.append("id",res.id)
						  pcjDeclarant.append("label", formPj.LabelPj);
					
						  this.httpClient.post(`${this.AlfresscoURL}/bmh-fourgon/multiplefile`, pcjDeclarant)
						  .subscribe((res)=>{
						  console.log('deces naturel pièce Jointe stored successfully:', res);
						  })
						});	
					
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

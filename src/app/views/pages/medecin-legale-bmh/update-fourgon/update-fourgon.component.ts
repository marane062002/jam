import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { InterfaceOrganisme } from "../list-organisme/list-organisme.component";
import { InterfaceVehicule } from "../../parametrage-bmh/list-vehicule/list-vehicule.component";
import { OrganismeService } from "../services/organisme.service";
import { FourgonService } from "../services/fourgon.service";
import { VehiculeService } from "../../parametrage-bmh/services/vehicule.service";
import { environment } from "../../../../../environments/environment";
import { MatTableDataSource } from "@angular/material";
import { Association360Tab } from "../details-obstacles/details-obstacles.component";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import * as $ from "jquery";
@Component({
	selector: "kt-update-fourgon",
	templateUrl: "./update-fourgon.component.html",
	styleUrls: ["./update-fourgon.component.scss"],
})
export class UpdateFourgonComponent implements OnInit {


	pcfileDeclar : File;
	labelDeclar: any;
	pcDeclarantFile: File;
    allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
	dataSource3: MatTableDataSource<any>;

	displayedColumns1 = [ "label", "nomDoc", "actions"];

	dataSource2 = new MatTableDataSource<any>();

	organisme: InterfaceOrganisme[] = [];
	vehicule: InterfaceVehicule[] = [];
	pcj: File;

	displayedColumns2=['nomDoc','titre','label','dow']
	asyncTabs: Observable<Association360Tab[]>;
	id: any;
	details;
	AlfresscoURL = environment.API_ALFRESCO_URL
	constructor(private httpClient:HttpClient,private formBuilder: FormBuilder,private service: FourgonService, private vehiculeService: VehiculeService, private organismeService: OrganismeService, private router: Router, private route: ActivatedRoute, private fourgonService: FourgonService) {}
	FormArticle = new FormGroup({
		id: new FormControl(""),
		matricule: new FormControl("", Validators.required),
		couleur: new FormControl("", Validators.required),
		vehicule: new FormControl("", Validators.required),
		organisme: new FormControl("", Validators.required),
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
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-fourgon"]);
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
	selectedValueOrganismeFunction(p1: InterfaceOrganisme, p2: InterfaceOrganisme) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	selectedValueVehiculeFunction(p1: InterfaceVehicule, p2: InterfaceVehicule) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}


	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/bmh-fourgon/index/${ide}`)
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

        this.httpClient.delete(`${this.AlfresscoURL}/bmh-fourgon/index/${id}`)
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
			const formData = new FormData();
			formData.append("fourgon", new Blob([JSON.stringify(this.FormArticle.value)],{ type: 'application/json' }));
			// formData.append("pcj",this.pcj)
			this.service.update(this.FormArticle.value.id,formData).subscribe(
				(res:any) => {

					this.allpjDeclar.forEach(formPj => {	
        
						const pcjDeclarant = new FormData();
					
						  pcjDeclarant.append("file", formPj.selecetedFile)
						  pcjDeclarant.append("sousModule", "FOURGON")
						  pcjDeclarant.append("id",this.FormArticle.value.id)
						  pcjDeclarant.append("label", formPj.LabelPj);
					
						  this.httpClient.post(`${this.AlfresscoURL}/bmh-fourgon/multiplefile`, pcjDeclarant)
						  .subscribe((res)=>{
						  console.log('Fourgon pièce Jointe stored successfully:', res);
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

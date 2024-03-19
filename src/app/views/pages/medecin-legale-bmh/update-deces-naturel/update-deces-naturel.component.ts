import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DecesNaturelsService } from "../services/deces-naturels.service";
import { ActivatedRoute, Router } from "@angular/router";
import { InterfaceDeces } from "../list-deces-naturel/list-deces-naturel.component";
import { ArrondissemntService } from "../../parametrage-bmh/services/arrondissemnt.service";
import { CommuneService } from "../../parametrage-bmh/services/commune.service";
import { ConstateurService } from "../../parametrage-bmh/services/constateur.service";
import { QuartierService } from "../../parametrage-bmh/services/quartier.service";
import { InterfaceArrondissement } from "../../parametrage-bmh/list-arrondissement/list-arrondissement.component";
import { InterfaceCommune } from "../../parametrage-bmh/list-commune/list-commune.component";
import { InterfaceConstateur } from "../../parametrage-bmh/list-constateur/list-constateur.component";
import { InterfaceQuartier } from "../../parametrage-bmh/list-quartier/list-quartier.component";
import Swal from "sweetalert2";
import * as $ from "jquery";
import { DatePipe } from "@angular/common";
import { MatTableDataSource } from "@angular/material";
import { Observable } from "rxjs";
import { Association360Tab } from "../details-obstacles/details-obstacles.component";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
	selector: "kt-update-deces-naturel",
	templateUrl: "./update-deces-naturel.component.html",
	styleUrls: ["./update-deces-naturel.component.scss"],
})
export class UpdateDecesNaturelComponent implements OnInit {

	pcfileDeclar : File;
	labelDeclar: any;
	pcDeclarantFile: File;
    allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
	dataSource3: MatTableDataSource<any>;

	displayedColumns1 = [ "label", "nomDoc", "actions"];
    Oldstatut:any;
	dataSource2 = new MatTableDataSource<any>();
	arrondissement: InterfaceArrondissement[] = [];
	commune: InterfaceCommune[] = [];
	constateur: InterfaceConstateur[] = [];
	quartier: InterfaceQuartier[] = [];
	constater: InterfaceQuartier[] = [];
	displayedColumns2=['nomDoc','titre','label','dow']
	asyncTabs: Observable<Association360Tab[]>;
	id: any;
	details;
	deces: InterfaceDeces;
	baseUrl = environment.API_BMH_URL
	AlfresscoURL = environment.API_ALFRESCO_URL

	private headers = new HttpHeaders({
		// 'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});

	constructor(private formBuilder: FormBuilder,private httpClient: HttpClient,private router: Router, private datePipe: DatePipe, private ArrondissementService: ArrondissemntService, private communeService: CommuneService, private constateurService: ConstateurService, private quartierService: QuartierService, private service: DecesNaturelsService, private route: ActivatedRoute) {}
	
	

	FormArticle = new FormGroup({
		id: new FormControl(""),
		nom: new FormControl("", Validators.required),
		prenom: new FormControl("", Validators.required),
		cin: new FormControl("", Validators.required),
		nationalite: new FormControl("", Validators.required),
		date: new FormControl("", Validators.required),
		sexe: new FormControl("", Validators.required),
		commune: new FormControl("", Validators.required),
		arrondissement: new FormControl("", Validators.required),
		quartier: new FormControl("", Validators.required),
		constateur: new FormControl("", Validators.required),
		lieu: new FormControl("", Validators.required),
		// adresseDeces: new FormControl("", Validators.required),
		adresseResidence: new FormControl("", Validators.required),
		constater: new FormControl("", Validators.required),
		cause: new FormControl("",Validators.required),
		descriptionDec: new FormControl("", Validators.required),
		dateDeces: new FormControl("", Validators.required),
		numDeces: new FormControl("", Validators.required),
		numRegistre : new FormControl("", Validators.required),
		statusCadavre : new FormControl("", Validators.required),
		numTombe:new FormControl(""),
		nomCim:new FormControl("")
	});
	pjDeclar: any;
	ngOnInit() {
		this.pjDeclar= this.formBuilder.group({
			pcfile: [""],
		})
		this.id = this.route.snapshot.params["id"];
		this.service.getById(this.id).subscribe(
			(res:any) => {
				console.log(res);
				
				this.FormArticle.patchValue({ ...res });
				const dateFormateDec = this.datePipe.transform(this.FormArticle.value.dateDeces, "yyyy-MM-dd");
				const dateFormatee = this.datePipe.transform(this.FormArticle.value.date, "yyyy-MM-dd");
				// this.FormArticle.value.date = dateFormatee
				this.FormArticle.patchValue({ date: dateFormatee });
				this.FormArticle.patchValue({ dateDeces: dateFormateDec });
				console.log("form :",this.FormArticle.value.nationalite);
				this.FormArticle.value;
				this.Oldstatut = res.statusCadavre;
			},
			(err) => {
				console.log(err);
			}
		);
		this.getAllPjImm(this.id)
		this.ArrondissementService.getAll().subscribe((res) => {
			this.arrondissement = res;
			console.log(res);
			console.log(this.arrondissement);
		});
		this.communeService.getAll().subscribe((res) => {
			this.commune = res;
			console.log(res);
			console.log(this.commune);
		});
		this.constateurService.getAllConstateur().subscribe((res) => {
			this.constateur = res;
			console.log(res);
			console.log(this.constateur);
		});
		this.quartierService.getAll().subscribe((res) => {
			this.quartier = res;
			console.log(res);
			console.log(this.quartier);
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


	selectedValueCommuneFunction(p1: InterfaceCommune, p2: InterfaceCommune) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	selectedValueArrondissementFunction(p1: InterfaceArrondissement, p2: InterfaceArrondissement) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	selectedValueConstateurFunction(p1: InterfaceConstateur, p2: InterfaceConstateur) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	selectedValueQuartierFunction(p1: InterfaceQuartier, p2: InterfaceQuartier) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-deces-naturel"]);
	}


	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/bmh-decesNaturel/index/${ide}`)
		.subscribe(
            (data:any) => {
                this.dataSource2 = new MatTableDataSource(data);
            },
            (error) => console.log(error)
        );
    }
	onClickPj(e, id) {
        var r = e.substring(0, e.length - 4);
		console.log("rrrrr:", r)
		console.log("id alf:", id)

        this.httpClient.delete(`${this.AlfresscoURL}/bmh-decesNaturel/index/${id}`)
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
			
			console.log("form art : ",this.FormArticle.value)
			
			// if (this.FormArticle.value.nationalite === "Autre") {
			// 	this.FormArticle.value.nationalite = this.FormArticle.value.autreNationalite;
			// }

		
			if(this.Oldstatut !== this.FormArticle.value.statusCadavre){
				
				const historique = {
							 "nouveauStatut":this.FormArticle.value.statusCadavre,
							 "decesNaturel":{
							  "id":this.id
							 }
						  }
						  
						  this.httpClient.post(`${this.baseUrl}historique-deces`, historique , { headers: this.headers })
						  .subscribe((res)=>{
							
						  console.log('stored successfully:', res);
						  })
			}

            
			this.service.update(this.FormArticle.value.id, this.FormArticle.value).subscribe(
				(res:any) => {
					
					this.allpjDeclar.forEach(formPj => {	
        
						const pcjDeclarant = new FormData();
					
						  pcjDeclarant.append("file", formPj.selecetedFile)
						  pcjDeclarant.append("sousModule", "Décés Naturel")
						  pcjDeclarant.append("id",this.FormArticle.value.id)
						  pcjDeclarant.append("label", formPj.LabelPj);
					
						  this.httpClient.post(`${this.AlfresscoURL}/bmh-decesNaturel/multiplefile`, pcjDeclarant)
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
						this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
						this.router.navigate(["/bmh1/list-deces-naturel"]);
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

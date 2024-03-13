import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from 'sweetalert2';
import { MatTableDataSource } from "@angular/material";
import { Association360Tab } from "../../pesee/show-pesee/show-pesee.component";
import { Observable } from "rxjs";
import * as $ from "jquery";
@Component({
	selector: "kt-upd-sortie",
	templateUrl: "./upd-sortie.component.html",
	styleUrls: ["./upd-sortie.component.scss"],
})
export class UpdSortieComponent implements OnInit {

  sortieId: any;
  sortieDetails: any;
  
 private headers = new HttpHeaders({
		// 'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
  private AlfresscoURL = environment.API_ALFRESCO_URL;

  pcfileDeclar : File;
	labelDeclar: any;
	pcDeclarantFile: File;
  allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
	dataSource3: MatTableDataSource<any>;
	displayedColumns1 = [ "label", "nomDoc", "actions"];
  displayedColumns2=['nomDoc','titre','label','dow']
  asyncTabs: Observable<Association360Tab[]>;
  dataSource2 = new MatTableDataSource<any>();
  ajoutForm: FormGroup;

  data: any[] = [];
  datef: Date;
  date : any;
  lieu : any;
  remarques : any;
  adresse : any;
  piceJointe : any ;
  procesVerbal : any;
   objetControl = new FormControl();
   typeTraitementControl = new FormControl();
   equipeControl = new FormControl();
  arrondissementControl = new FormControl();
  quartierControl = new FormControl();
  communeControl = new FormControl();
   quantiteControl = new FormControl();
   produitControl = new FormControl();
   
  

  obj : any[] = [];
	type : any[] = [];
	equipe : any [] = [];
	arrondissement : any[] = [];
  quartier : any[] = [];
	commune : any[] = [];
	quantite : any [] = [];
	produit : any[] = [];

  handleFileInput(event: any): void{
		this.piceJointe = event.target.files[0];
	}
  handleproces(event: any): void{
		this.procesVerbal = event.target.files[0];
	}

	private baseUrl = environment.API_BMH_URL;
	constructor(private fb : FormBuilder ,private router: Router, private httpClient:HttpClient, private route: ActivatedRoute) {}
  
  pjDeclar: any;
	ngOnInit() {
    this.ajoutForm = this.fb.group({
      pj: this.fb.group({
          pcfileDeclar: [''] 
      })
    });
    this.route.params.subscribe((params) => {
			this.sortieId = +params['id']; 
		  });
    this.fetchTypes();
    this.fetchObjet();
    this.fetchEquipe();
    this.fetchArrondis();
    this.fetchQuartier();
    this.fetchCommune();
    this.fetchQuantite();
    this.fetchProduit();
    this.fetchSortie();
    this.getAllPjImm(this.sortieId)
  }
  saveDec(event: any): void {
    $("#testd").val(event.target.files[0].name);
    this.ajoutForm.get('pj.pcfileDeclar').setValue(event.target.files[0].name);
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
  async getAllPjImm(ide) {
    await this.httpClient.get(`${this.AlfresscoURL}/bmh-sortie/index/${ide}`)
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

        this.httpClient.delete(`${this.AlfresscoURL}/bmh-sortie/index/${id}`)
    .subscribe(
            (data:any) => {
        console.log(data)
        this.ngOnInit()
            },
            (error) => console.log(error)
        );
    }
  fetchSortie():void {
		const url = `${this.baseUrl}sortie/${this.sortieId}`;
		this.httpClient.get(url,{ headers: this.headers }).subscribe(
		  (response) => {
			this.sortieDetails = response;

			const selectedSorties = this.sortieDetails.equipes.map(sortie => sortie.id);


			this.lieu = this.sortieDetails.lieu;
      this.adresse = this.sortieDetails.adresse;
      this.procesVerbal = this.sortieDetails.procesVerbal;
      this.remarques = this.sortieDetails.remarques;
      this.piceJointe = this.sortieDetails.pieceJointe;
			this.objetControl.setValue(this.sortieDetails.objetSortie.id);
			this.typeTraitementControl.setValue(this.sortieDetails.typeTraitement.id);
			this.equipeControl.setValue(selectedSorties);
			this.produitControl.setValue(this.sortieDetails.produitUtilise.id);
			this.quantiteControl.setValue(this.sortieDetails.quantite.id);
      this.communeControl.setValue(this.sortieDetails.commune.id);
			this.arrondissementControl.setValue(this.sortieDetails.arrondissement.id);
			this.quartierControl.setValue(this.sortieDetails.quartier.id);
			this.produitControl.setValue(this.sortieDetails.produitUtilise.id);

      this.datef = new Date(this.sortieDetails.date);
			this.date = this.datef.toISOString().split('T')[0];
			console.log(this.date)	  
        },
		  (error) => {
			console.error("Error fetching etablissement details:", error);
		  }
		  )
	}
  private fetchTypes(): void {
		this.httpClient.get<any[]>(`${this.baseUrl}type-traitement`,{ headers: this.headers }).subscribe(
		  (response) => {
			this.type = response;
		  },
		  (error) => {
			console.error("Error fetching types:", error);
		  }
		);
	  }
    private fetchObjet(): void {
      this.httpClient.get<any[]>(`${this.baseUrl}objet`,{ headers: this.headers }).subscribe(
        (response) => {
        this.obj = response;
        },
        (error) => {
        console.error("Error fetching types:", error);
        }
      );
      }

      private fetchEquipe(): void {
        this.httpClient.get<any[]>(`${this.baseUrl}equipe`,{ headers: this.headers }).subscribe(
          (response) => {
          this.equipe = response;
          },
          (error) => {
          console.error("Error fetching types:", error);
          }
        );
        }

        private fetchQuartier(): void {
          this.httpClient.get<any[]>(`${this.baseUrl}quartier`,{ headers: this.headers }).subscribe(
            (response) => {
            this.quartier = response;
            },
            (error) => {
            console.error("Error fetching types:", error);
            }
          );
          }

          private fetchArrondis(): void {
            this.httpClient.get<any[]>(`${this.baseUrl}arrondissement`,{ headers: this.headers }).subscribe(
              (response) => {
              this.arrondissement = response;
              },
              (error) => {
              console.error("Error fetching types:", error);
              }
            );
            }

            private fetchCommune(): void {
              this.httpClient.get<any[]>(`${this.baseUrl}commune`,{ headers: this.headers }).subscribe(
                (response) => {
                this.commune = response;
                },
                (error) => {
                console.error("Error fetching types:", error);
                }
              );
              }

              private fetchProduit(): void {
                this.httpClient.get<any[]>(`${this.baseUrl}produit`,{ headers: this.headers }).subscribe(
                  (response) => {
                  this.produit = response;
                  },
                  (error) => {
                  console.error("Error fetching types:", error);
                  }
                );
                }
                  private fetchQuantite(): void {
                    this.httpClient.get<any[]>(`${this.baseUrl}quantite`,{ headers: this.headers }).subscribe(
                      (response) => {
                      this.quantite = response;
                      },
                      (error) => {
                      console.error("Error fetching types:", error);
                      }
                    );
                    }

                updSortie():void{
                      const sortie = {
                        date: this.date,
                        lieu : this.lieu,
                        adresse : this.adresse,
                        remarques : this.remarques,
                        equipes: this.equipeControl.value.map((id: number) => ({ id })),
                        objetSortie: {id : this.objetControl.value},
                        typeTraitement: {id : this.typeTraitementControl.value},
                        commune: {id : this.communeControl.value},
                        arrondissement: {id : this.arrondissementControl.value},
                        quartier: {id : this.quartierControl.value},
                        produitUtilise: {id : this.produitControl.value},
                        quantite: {id : this.quantiteControl.value}
                      }
                      console.log("sortie : ", sortie)
                      const formData = new FormData();
                      const pcj = new FormData();
                      const prcsv = new FormData();

                      formData.append('sortie', new Blob([JSON.stringify(sortie)], { type: 'application/json' }));

                      this.httpClient.put<any>(`${this.baseUrl}sortie/${this.sortieId}`, sortie,{ headers: this.headers }).subscribe(
                        (response) => {
                          console.log("Sortie created successfully:", response);
                          Swal.fire({
                            title: 'Enregistrement réussi!',
                            text: 'Constateur enregistré avec succès.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                          })
                          
                          this.allpjDeclar.forEach(formPj => {	
        
                            const pcjDeclarant = new FormData();
                        
                              pcjDeclarant.append("file", formPj.selecetedFile)
                              pcjDeclarant.append("sousModule", "SORTIE")
                              pcjDeclarant.append("id",response.id)
                              pcjDeclarant.append("label", formPj.LabelPj);
                        
                              this.httpClient.post(`${this.AlfresscoURL}/bmh-sortie/multiplefile`, pcjDeclarant)
                              .subscribe((res)=>{
                              console.log('deces naturel pièce Jointe stored successfully:', res);
                              })
                            });
                          
                          this.router.navigate(["/sortie/list-sortie"]);
                          
                        },
                        (error) => {
                          console.error("Error creating etablissement:", error);
                        }
                      );
                    }   

	RetourEmbalages(): void {
		this.router.navigate(["/sortie/list-sortie"]);
	}
}

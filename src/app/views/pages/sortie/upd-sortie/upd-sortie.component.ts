import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
	selector: "kt-upd-sortie",
	templateUrl: "./upd-sortie.component.html",
	styleUrls: ["./upd-sortie.component.scss"],
})
export class UpdSortieComponent implements OnInit {

  sortieId: any;
  sortieDetails: any;
  
 private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});

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
	constructor(private router: Router, private httpClient:HttpClient, private route: ActivatedRoute) {}

	ngOnInit() {
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
                  //  console.log(this.typeTraitementControl.value)
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
                      formData.append('sortie', new Blob([JSON.stringify(sortie)], { type: 'application/json' }));
                      formData.append('procesVerbal', this.procesVerbal);
                      formData.append('pieceJointe', this.piceJointe);
                      console.log(formData);
                      this.httpClient.put<any>(`${this.baseUrl}sortie/${this.sortieId}`, formData,{ headers: this.headers }).subscribe(
                        (response) => {
                          console.log("Sortie created successfully:", response);
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

import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
	selector: "kt-add-sortie",
	templateUrl: "./add-sortie.component.html",
	styleUrls: ["./add-sortie.component.scss"],
})
export class AddSortieComponent implements OnInit {
  data: any[] = [];
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
  private AlfresscoURL = environment.API_ALFRESCO_URL;
  private headers = new HttpHeaders({
		// 'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});

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
	constructor(private router: Router, private httpClient: HttpClient) {}


	ngOnInit() {
    this.fetchTypes();
    this.fetchObjet();
    this.fetchEquipe();
    this.fetchArrondis();
    this.fetchQuartier();
    this.fetchCommune();
    this.fetchQuantite();
    this.fetchProduit();
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
                // private fetchConvention(): void {
                //   this.httpClient.get<any[]>(`${this.baseUrl}convention`).subscribe(
                //     (response) => {
                //     this.convention = response;
                //     },
                //     (error) => {
                //     console.error("Error fetching types:", error);
                //     }
                //   );
                //   }
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

        createCarte():void{
          
                   console.log(this.typeTraitementControl.value)
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
                      formData.append('procesVerbal', this.procesVerbal);
                      formData.append('pieceJointe', this.piceJointe);
                      console.log(formData);
                      this.httpClient.post<any>(`${this.baseUrl}sortie`, formData,{ headers: this.headers }).subscribe(
                        (response) => {

                          console.log("Sortie created successfully:", response);

                          pcj.append('id',response.id)
                          pcj.append("file", this.piceJointe)
                          pcj.append("sousModule", "SORTIE PIECE JOINTE")
                          this.httpClient.post(`${this.AlfresscoURL}/bmh-sortie/multiplefile`, pcj)
                            .subscribe((res)=>{
                                console.log('Piece Jointe stored successfully:', res);
                          })

                          prcsv.append('id',response.id)
                          prcsv.append("file", this.procesVerbal)
                          prcsv.append("sousModule", "PROCES-VERBAL")
                          this.httpClient.post(`${this.AlfresscoURL}/bmh-sortie/multiplefile`, prcsv)
                            .subscribe((res)=>{
                                console.log('Piece Jointe stored successfully:', res);
                          })

                          this.router.navigate(["/sortie/list-sortie"]);
                        },
                        (error) => {
                          console.error("Error creating etablissement:", error);
                        }
                      );
                    }   
	RetourEmbalages(): void {
		this.router.navigate(["sortie/list-sortie"]);
	}
}

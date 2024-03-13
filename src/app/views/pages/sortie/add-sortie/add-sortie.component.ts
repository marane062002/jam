import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material";
import * as $ from "jquery";
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

  pcDeclarantFile: File;
  pcfileDeclar : File;
	labelDeclar: any;
  allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
  dataSource3: MatTableDataSource<any>;
  displayedColumns1 = [ "label", "nomDoc", "actions"];
  
  adresse : any;
  piceJointe : any ;
  procesVerbal : any;
  objetControl = new FormControl();
  // ajoutForm: any;
  ajoutForm: FormGroup;
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
	constructor(private router: Router, private httpClient: HttpClient,private fb: FormBuilder) {}

  pjDeclar: any;
	ngOnInit() {
    this.ajoutForm = this.fb.group({
      pj: this.fb.group({
          pcfileDeclar: [''] 
      })
    });
    // this.pjDeclar= this.fb.group({
		// 	pcfile: [""],
		// })
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
  onPcDeclarantChange(event: any) {
		this.pcDeclarantFile = event.target.files[0];
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
    console.log(this.allpjDeclar)
  }

  onDeletePjDec(id: number): void {
    this.allpjDeclar.splice(id, 1);
    if (this.allpjDeclar.length > 0) {
      this.dataSource3 = new MatTableDataSource(this.allpjDeclar);
    } else {
      this.dataSource3 = null;
    }
  }
        createCarte():void{
          console.log("all pj declar :",this.allpjDeclar)
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
  
                      console.log(formData);
                      this.httpClient.post<any>(`${this.baseUrl}sortie`, sortie,{ headers: this.headers }).subscribe(
                        (response) => {

                          console.log("Sortie created successfully:", response);
                          // pcj.append('id',response.id)
                          // pcj.append("file", this.piceJointe)
                          // pcj.append("sousModule", "SORTIE PIECE JOINTE")
                          // this.httpClient.post(`${this.AlfresscoURL}/bmh-sortie/multiplefile`, pcj)
                          //   .subscribe((res)=>{
                          //       console.log('Piece Jointe stored successfully:', res);
                          // })

                          // prcsv.append('id',response.id)
                          // prcsv.append("file", this.procesVerbal)
                          // prcsv.append("sousModule", "PROCES-VERBAL")
                          // this.httpClient.post(`${this.AlfresscoURL}/bmh-sortie/multiplefile`, prcsv)
                          //   .subscribe((res)=>{
                          //       console.log('Piece Jointe stored successfully:', res);
                          // })

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
                      this.router.navigate(["sortie/list-sortie"]);
                    }
}

























// <div class="kt-portlet portlet-3">
// 	<div class="kt-portlet__head kt-bg-portlet-3">
// 		<div class="kt-portlet__head-label">
// 			<h2 class="kt-portlet__head-title kt-font-inverse-brand">
// 				Clause de contrat
// 			</h2>
// 		</div>
// 	</div>
// </div>

// <!-- <div class="col-md-6">
// 					<div class="form-group fv-plugins-icon-container">
// 						<mat-form-field class="example-full-width">
// 							<label>Clauses: </label>
// 							<mat-select [formControl]="objetControl" matNativeControl class="form-control">
// 								<mat-option *ngFor="let clauses of clause" value="1"> 
// 									{{ clauses.clause }}
// 								</mat-option>
// 							</mat-select>
// 						</mat-form-field>
// 						<div class="fv-plugins-message-container"></div>
// 					</div>
// 				</div> -->

// 				<div class="col-md-12">
// 					<div class="form-group">
// 						<div class="input-group date">
// 							<mat-form-field class="example-full-width">
// 								<label> Clauses: </label>
// 								<mat-select
// 								   [formControl]="objetControl"
// 									matNativeControl
// 									multiple
// 									class="form-control"
// 								>
// 								<mat-option *ngFor="let clause of clause" [value]="clause.id"> 
// 									{{ clause.clause}}
// 								</mat-option>
// 								</mat-select>
// 							</mat-form-field>
// 						</div>
// 					</div>
// 				</div>
// 				<!-- <button type="submit" (click)="getChecked()" class="btn btn-success">Get checked</button> -->
// 				<!-- <button type="submit" (click)="Clause()" class="btn btn-success"> -->






// <div class="kt-portlet__heads pt-5">
// 	<div class="kt-portlet__head-label" align="right">
// 		<button
// 			href="javascript:; "
// 			(click)="backList()"
// 			_ngcontent-dkp-c41=""
// 			class="btn btn-secondary btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u"
// 		>
// 			<i _ngcontent-dkp-c41="" class="la la-recycle"></i>
// 			Retour
// 		</button>
// 		<button
// 		(click)="getChecked()"
// 			_ngcontent-dkp-c41=""
// 			class="btn btn-success btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u"
// 			type="reset"
// 		>
// 			<i _ngcontent-dlp-c41 class="icon la la-floppy-o"></i>
// 			Enregistrer
// 		</button>
// 	</div>
// </div>































// import { Component, OnInit } from "@angular/core";
// import { FormBuilder, FormControl, FormGroup, NgForm } from "@angular/forms";
// import { ActivatedRoute, Router } from "@angular/router";
// import { environment } from "../../../../../../environments/environment";
// import { HttpClient, HttpHeaders } from "@angular/common/http";
// @Component({
// 	selector: "kt-evaluer-contrat",
// 	templateUrl: "./evaluer-contrat.component.html",
// 	styleUrls: ["./evaluer-contrat.component.scss"],
// })
// export class EvaluerContratComponent implements OnInit {
// 	ajoutForm: FormGroup;
// 	clauses: string[] = [];
// 	clause: string[] = [];
// 	clausesFormArray: string[] = [];
//     newClause: string = '';
// 	id:any;
// 	objetControl = new FormControl();
// 	baseUrl = environment.API_PROPRETE_URL
// 	private headers = new HttpHeaders({
// 		'Content-Type': 'application/json',
// 		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
// 	});
// 	constructor(private router: Router,private route: ActivatedRoute, private httpClient : HttpClient, private formBuilder: FormBuilder) {}

// 	ngOnInit():void {
// 		this.getAllClauses()
// 		this.id = this.route.snapshot.params["id"];
// 		this.ajoutForm = this.formBuilder.group({
// 				numContrat: [''],
// 				description: [''],
// 				intitule: [''],
// 				type: [''],
// 				dateDebut: [''],
// 				dateFin: [''],
// 				clauses: [[]],
// 			  });
// 			  this.httpClient.get<any[]>(`${this.baseUrl}contrat/${this.id}`,{ headers: this.headers } ).subscribe((response: any) => {
// 				this.ajoutForm.patchValue({ ...response });
// 				});
// 		// this.addClauseControl()
		
// 	}

// 	getAllClauses(){
// 		this.httpClient.get<any[]>(`${this.baseUrl}clause`,{ headers: this.headers } ).subscribe((response: any) => {
// 			this.clause = response
// 		});
// 	}
// 	buildClauseCheckboxes() {
// 		const checkboxArray = this.clauses.map(clause => {
// 		  return this.formBuilder.control(false);
// 		});
// 		return this.formBuilder.array(checkboxArray);
// 	  }
// 	getChecked() {
// 		const selectedClauses = this.ajoutForm.value.clauses;
// 		console.log('Selected Clauses:', selectedClauses);
// 		console.log('Selected Clauses 2:', this.objetControl.value);
// 		this.ajoutForm.controls['clauses'].setValue(this.objetControl.value.map((id: number) => ({ id })));
// 			// this.httpClient.put<any[]>(`${this.baseUrl}contrat/${this.id}`, this.ajoutForm ,{ headers: this.headers } ).subscribe((response: any) => {
// 		    // });
// 			console.log("ajout form :",this.ajoutForm.value)
// 	}
// 	addClauseControl() {
//         this.clausesFormArray.push(this.ajoutForm.value.clauses);
// 		console.log(this.clauses)
//     }
// 	addNewClause(form: NgForm) {
// 			if (this.newClause.trim() !== '') {
// 				const body = { clause: this.newClause.trim() };
// 				this.httpClient.post<any[]>(`${this.baseUrl}clause`,body,{ headers: this.headers } ).subscribe((response: any) => {
// 			    console.log("OK!§");
// 				this.ngOnInit()
// 				});

// 				this.clauses.push(this.newClause.trim());
// 				this.newClause = '';
// 			}
// 			this.ajoutForm.controls['clauses'].setValue(this.objetControl.value.map((id: number) => ({ id })));
// 			// this.httpClient.put<any[]>(`${this.baseUrl}contrat/${this.id}`, this.ajoutForm ,{ headers: this.headers } ).subscribe((response: any) => {
// 		    // });
// 			console.log(this.ajoutForm.value)
// 		}
// 		Clause(){
// 			console.log(this.ajoutForm.value)
// 		}
// 	backList() {
// 		this.router.navigate(["/pages/proprete-contrats/list-contrats"]);
// 	}
// }

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";
@Component({
	selector: "kt-evaluer-contrat",
	templateUrl: "./evaluer-contrat.component.html",
	styleUrls: ["./evaluer-contrat.component.scss"],
})
export class EvaluerContratComponent implements OnInit {
	ajoutForm: FormGroup;
	clauses: string[] = [];
	clause: string[] = [];
	clausesFormArray: string[] = [];
    newClause: string = '';
	id:any;
	objetControl = new FormControl();
	baseUrl = environment.API_PROPRETE_URL
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	constructor(private router: Router,private route: ActivatedRoute, private httpClient : HttpClient, private formBuilder: FormBuilder) {}

	ngOnInit():void {
		this.getAllClauses()
		this.id = this.route.snapshot.params["id"];
		this.ajoutForm = this.formBuilder.group({
				numContrat: [''],
				description: [''],
				intitule: [''],
				type: [''],
				dateDebut: [''],
				dateFin: [''],
				clauses: [[]],
			  });
		
			  this.httpClient.get<any[]>(`${this.baseUrl}contrat/${this.id}`,{ headers: this.headers } ).subscribe((response: any) => {
				this.ajoutForm.patchValue({ ...response });
				this.clauses = response.clauses;
				this.objetControl.setValue(this.ajoutForm.value.clauses);
				});
				
		// this.addClauseControl()
		
	}
	compareFn(clause1: any, clause2: any): boolean {
		return clause1 && clause2 ? clause1.id === clause2.id : clause1 === clause2;
	  }
	isClauseSelected(clauseId: number): boolean {
		return this.clauses.findIndex((clause:any) => clause.id === clauseId) !== -1;
	  }
	getAllClauses(){
		this.httpClient.get<any[]>(`${this.baseUrl}clause`,{ headers: this.headers } ).subscribe((response: any) => {
			this.clause = response
		});
	}
	buildClauseCheckboxes() {
		const checkboxArray = this.clauses.map(clause => {
		  return this.formBuilder.control(false);
		});
		return this.formBuilder.array(checkboxArray);
	  }
	getChecked() {
		const selectedClauses = this.ajoutForm.value.clauses;
		console.log('Selected Clauses:', selectedClauses);
		console.log('Selected Clauses 2:', this.objetControl.value);
		this.ajoutForm.controls['clauses'].setValue(this.objetControl.value.map((id: number) => ({ id })));
			// this.httpClient.put<any[]>(`${this.baseUrl}contrat/${this.id}`, this.ajoutForm ,{ headers: this.headers } ).subscribe((response: any) => {
		    // });
			console.log("ajout form :",this.ajoutForm.value)
	}
	addClauseControl() {
        this.clausesFormArray.push(this.ajoutForm.value.clauses);
		console.log(this.clauses)
    }
	addNewClause(form: NgForm) {
			if (this.newClause.trim() !== '') {
				const body = { clause: this.newClause.trim() };
				this.httpClient.post<any[]>(`${this.baseUrl}clause`,body,{ headers: this.headers } ).subscribe((response: any) => {
			    console.log("OK!§");
				this.ngOnInit()
				});

				this.clauses.push(this.newClause.trim());
				this.newClause = '';
			}
			this.ajoutForm.controls['clauses'].setValue(this.objetControl.value.map((id: number) => ({ id })));
			// this.httpClient.put<any[]>(`${this.baseUrl}contrat/${this.id}`, this.ajoutForm ,{ headers: this.headers } ).subscribe((response: any) => {
		    // });
			console.log(this.ajoutForm.value)
		}
		Clause(){
			console.log(this.ajoutForm.value)
		}

		onSubmit(){
			this.ajoutForm.controls['clauses'].setValue(this.objetControl.value.map((id: number) => ({ id })));
			this.httpClient.put<any[]>(`${this.baseUrl}contrat/${this.id}`, this.ajoutForm.value ,{ headers: this.headers } ).subscribe((response: any) => {
		    	Swal.fire({
					title: 'Enregistrement réussi!',
					text: 'Enregistré avec succès.',
					icon: 'success',
					confirmButtonText: 'OK'
				  }).then(() => {
					this.backList();
					this.ngOnInit(); 
				  });
				
				(err) => {
				  console.error(err);
				  Swal.fire({
					title: 'Erreur!',
					text: 'Un problème est survenu lors de l\'enregistrement du Constateur.',
					icon: 'error',
					confirmButtonText: 'OK'
				  });
				}
			});
		}

	backList() {
		this.router.navigate(["/pages/proprete-contrats/list-contrats"]);
	}
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import Swal from "sweetalert2";
@Component({
	selector: "kt-edit-equipement",
	templateUrl: "./edit-equipement.component.html",
	styleUrls: ["./edit-equipement.component.scss"],
})
export class EditEquipementComponent implements OnInit {
	ajoutForm:any;
	delegataire:any;
	id:any;
	baseUrl = environment.API_PROPRETE_URL
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	constructor(private httpClient:HttpClient,private route:ActivatedRoute,private router: Router, private formBuilder: FormBuilder) {}
	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.ajoutForm = this.formBuilder.group({
			type: ['', Validators.required],
			immatriculation: ['', Validators.required],
			designation: ['', Validators.required],
			capacite: ['', Validators.required],
			etat: ['', Validators.required],
			commentaire: [''],
			operationnel: ['', Validators.required],
			localisation: [''] ,
			delegataire: ['']
		  });
		this.httpClient.get<any[]>(`${this.baseUrl}equipement/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.ajoutForm.patchValue({ ...res });
			console.log(this.ajoutForm.value)
		});

		this.httpClient.get<any[]>(`${this.baseUrl}delegataire`,{ headers: this.headers }).subscribe(
			(res:any) => {
			  this.delegataire = res
			  console.log("nouveau res :", res);
			}
		)
	}

	backList() {
		this.router.navigate(["/pages/proprete-flotte/list-flotte"]);
	}
	selectedValueDelegataireFunction(p1: InterfaceDelegataire, p2: InterfaceDelegataire) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}

	ajouter(){
		this.httpClient.put<any[]>(`${this.baseUrl}equipement/${this.id}`,this.ajoutForm.value,{ headers: this.headers }).subscribe(
			(res:any) => {
			  console.log("nouveau res :", res);
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
			}
		  )
		console.log(this.ajoutForm.value)
	}
}
export interface InterfaceDelegataire {
	id: string;
}
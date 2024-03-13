import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import Swal from "sweetalert2";
@Component({
	selector: "kt-edit-regroupement",
	templateUrl: "./edit-regroupement.component.html",
	styleUrls: ["./edit-regroupement.component.scss"],
})
export class EditRegroupementComponent implements OnInit {
	pointRegroupementForm:FormGroup;
	equipement:any;
	id:any;
	baseUrl = environment.API_PROPRETE_URL
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	constructor(private httpClient:HttpClient,private route:ActivatedRoute,private router: Router, private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.pointRegroupementForm = this.formBuilder.group({
			ref: ['', Validators.required],
			localisation: ['', Validators.required],
			adresse: ['', Validators.required],
			equipement: ['', Validators.required]
		  });
		  this.httpClient.get<any[]>(`${this.baseUrl}regroupement/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.pointRegroupementForm.patchValue({ ...res });
			console.log(this.pointRegroupementForm.value)
		});
		  this.httpClient.get<any[]>(`${this.baseUrl}equipement`,{ headers: this.headers }).subscribe(
			(res:any) => {
			  this.equipement = res
			  console.log("nouveau res :", res);
			}
		  )
	}

	backList() {
		this.router.navigate([
			"/pages/proprete-regroupement/list-regroupement",
		]);
	}
	selectedValueEquipementFunction(p1: InterfaceEquipement, p2: InterfaceEquipement) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	onSubmit(){
		this.httpClient.put<any[]>(`${this.baseUrl}regroupement/${this.id}`,this.pointRegroupementForm.value,{ headers: this.headers }).subscribe(
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
		console.log(this.pointRegroupementForm.value)
	}
}
export interface InterfaceEquipement {
	id: string;
	type: string;
	immatriculation: string;
	designation: string;
	capacite: String;
	etat: string;
	commentaire: string;
	operationnel: string;
	localisation: string;
}

// {
//     "id": 1,
//     "type": "immobile",
//     "immatriculation": "655 Oak Lane",
//     "designation": null,
//     "capacite": "12 East Milton Street",
//     "etat": "",
//     "commentaire": "94 West Fabien Street",
//     "operationnel": "",
//     "localisation": "",
//     "delegataire": {
//         "id": 1,
//         "rc": "Reiciendis ea rerum ",
//         "rs": "Porro non repellendu"
//     }
// }
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material";
import { Association360Tab } from "../../../pesee/show-pesee/show-pesee.component";
import { Observable } from "rxjs";
import * as $ from "jquery";
@Component({
	selector: "kt-add-reclamation",
	templateUrl: "./add-reclamation.component.html",
	styleUrls: ["./add-reclamation.component.scss"],
})
export class AddReclamationComponent implements OnInit {
	reclamationForm: FormGroup;
	pcfileDeclar : File;
	labelDeclar: any;
	pcDeclarantFile: File;
	dataSource2 = new MatTableDataSource<any>();
    allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
	dataSource3: MatTableDataSource<any>;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	private baseUrl = environment.API_PROPRETE_URL; 
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	displayedColumns2=['nomDoc','titre','label','dow']
	displayedColumns1 = [ "label", "nomDoc", "actions"];
	asyncTabs: Observable<Association360Tab[]>;
	constructor(private router: Router,private httpClient:HttpClient,private formBuilder: FormBuilder) {}

    pjDeclar: any;
	ngOnInit() {
		this.pjDeclar= this.formBuilder.group({
			pcfile: [""],
		})
		
		this.reclamationForm = this.formBuilder.group({
			objet: ['', Validators.required],
			secteur: ['', Validators.required],
			adresse: ['', Validators.required],
		  });
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
	  onClickPj(e, id) {
        var r = e.substring(0, e.length - 4);
		console.log("rrrrr:", r)
		console.log("id alf:", id)

        this.httpClient.delete(`${this.AlfresscoURL}/reclamation-proprete/index/${id}`)
		.subscribe(
            (data:any) => {
				console.log(data)
				this.ngOnInit()
            },
            (error) => console.log(error)
        );
    }
	


	backList() {
		this.router.navigate([
			"/pages/proprete-reclamations-penalites/list-reclamations",
		]);
	}
	onSubmit(){
		if (this.reclamationForm.valid) {
			this.httpClient.post<any[]>(`${this.baseUrl}reclamation`, this.reclamationForm.value,{ headers: this.headers }).subscribe(
					  (res:any) => {
						console.log("nouveau res :", res);
						this.allpjDeclar.forEach(formPj => {	
        
							const pcjDeclarant = new FormData();
						
							  pcjDeclarant.append("file", formPj.selecetedFile)
							  pcjDeclarant.append("sousModule", "RECLAMATION")
							  pcjDeclarant.append("id", res.id)
							  pcjDeclarant.append("label", formPj.LabelPj);
						
							  this.httpClient.post(`${this.AlfresscoURL}/reclamation-proprete/multiplefile`, pcjDeclarant)
							  .subscribe((res)=>{
							  })
							});
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
	}

}

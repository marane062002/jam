import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material";
import { Association360Tab } from "../../../pesee/show-pesee/show-pesee.component";
import { Observable } from "rxjs";
import * as $ from "jquery";
@Component({
	selector: "kt-edit-penalite",
	templateUrl: "./edit-penalite.component.html",
	styleUrls: ["./edit-penalite.component.scss"],
})
export class EditPenaliteComponent implements OnInit {
	pcfileDeclar : File;
	labelDeclar: any;
	pcDeclarantFile: File;
	dataSource2 = new MatTableDataSource<any>();
    allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
	dataSource3: MatTableDataSource<any>;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	penaliteForm:any;
	id:any;
	displayedColumns2=['nomDoc','titre','label','dow']
	displayedColumns1 = [ "label", "nomDoc", "actions"];
	asyncTabs: Observable<Association360Tab[]>;
	baseUrl = environment.API_PROPRETE_URL

	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	constructor(private httpClient:HttpClient,private route:ActivatedRoute,private router: Router, private formBuilder: FormBuilder) {}
	pjDeclar: any;
	ngOnInit() {
		this.pjDeclar= this.formBuilder.group({
			pcfile: [""],
		})
		this.id = this.route.snapshot.params["id"];
		this.getAllPjImm(this.id)
		this.penaliteForm = this.formBuilder.group({
			numPenalite: ['', Validators.required],
			adresse: ['', Validators.required],
			objet: ['', Validators.required],
			nombre: ['', Validators.required],
			natureInfraction: ['', Validators.required],
			montantAssocie: ['', Validators.required],
			description: ['', Validators.required],
		  });
		  this.httpClient.get<any[]>(`${this.baseUrl}penalite/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.penaliteForm.patchValue({ ...res });
			console.log(this.penaliteForm.value)
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

        this.httpClient.delete(`${this.AlfresscoURL}/penalite-proprete/index/${id}`)
		.subscribe(
            (data:any) => {
				console.log(data)
				this.ngOnInit()
            },
            (error) => console.log(error)
        );
    }
	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/penalite-proprete/index/${ide}`)
		.subscribe(
            (data:any) => {
                this.dataSource2 = new MatTableDataSource(data);
            },
            (error) => console.log(error)
        );
    }
	backList() {
		this.router.navigate([
			"/pages/proprete-reclamations-penalites/list-penalites",
		]);
	}

	onSubmit(){
		this.httpClient.put<any[]>(`${this.baseUrl}penalite/${this.id}`,this.penaliteForm.value,{ headers: this.headers }).subscribe(
			(res:any) => {
			  console.log("nouveau res :", res);
			  this.allpjDeclar.forEach(formPj => {	
        
				const pcjDeclarant = new FormData();
			
				  pcjDeclarant.append("file", formPj.selecetedFile)
				  pcjDeclarant.append("sousModule", "PENALITE")
				  pcjDeclarant.append("id",this.id)
				  pcjDeclarant.append("label", formPj.LabelPj);
			
				  this.httpClient.post(`${this.AlfresscoURL}/panalite-proprete/multiplefile`, pcjDeclarant)
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
			}
		  )
	}

}

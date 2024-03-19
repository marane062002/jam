import { Component, OnInit } from '@angular/core';
import { DecesNaturelsService } from '../services/deces-naturels.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InterfaceDeces } from '../list-deces-naturel/list-deces-naturel.component';
import { Router } from '@angular/router';
import { ArrondissemntService } from '../../parametrage-bmh/services/arrondissemnt.service';
import { InterfaceArrondissement } from '../../parametrage-bmh/list-arrondissement/list-arrondissement.component';
import { CommuneService } from '../../parametrage-bmh/services/commune.service';
import { QuartierService } from '../../parametrage-bmh/services/quartier.service';
import { ConstateurService } from '../../parametrage-bmh/services/constateur.service';
import { InterfaceCommune } from '../../parametrage-bmh/list-commune/list-commune.component';
import { InterfaceQuartier } from '../../parametrage-bmh/list-quartier/list-quartier.component';
import { InterfaceConstateur } from '../../parametrage-bmh/list-constateur/list-constateur.component';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material';
import * as $ from "jquery";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'kt-add-deces-naturel',
  templateUrl: './add-deces-naturel.component.html',
  styleUrls: ['./add-deces-naturel.component.scss']
})
export class AddDecesNaturelComponent implements OnInit {


  constateur:InterfaceConstateur[]=[]
  quartier:InterfaceQuartier[]=[]
  commune:InterfaceCommune[]=[];
  arrondissement:InterfaceArrondissement[]=[]
  ajoutForm: any; // Formulaire de type FormGroup
  private _newDeces: InterfaceDeces;
  pcDeclarantFile: File;

  pcfileDeclar : File;
	labelDeclar: any;


  allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
  dataSource3: MatTableDataSource<any>;


  displayedColumns1 = [ "label", "nomDoc", "actions"];

  private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
  public get newDeces(): InterfaceDeces {
    return this._newDeces;
  }
  public set newDeces(value: InterfaceDeces) {
    this._newDeces = value;
  }
  private baseUrl = environment.API_BMH_URL;
  private AlfresscoURL = environment.API_ALFRESCO_URL;
  constructor(private httpClient:HttpClient, private communeService:CommuneService,private quartierService:QuartierService,private constateurService:ConstateurService, private ArrondissementService:ArrondissemntService, private router:Router,private formBuilder: FormBuilder,private service:DecesNaturelsService) { }
  pjDeclar: any;
  ngOnInit() {
    this.pjDeclar= this.formBuilder.group({
			pcfile: [""],
		})
    this.ajoutForm = this.formBuilder.group({
      // id: [null], // Exemple de champ non modifiable
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', Validators.required],
      nationalite: [''],
      nationalite1: [''],
      sexe: [''],
      date: [''], // Exemple de champ avec une valeur par défaut
      commune: [''],
      constateur: [''],
      arrondissement:[''],
      quartier: [''],
      lieu: ['',Validators.required],
      // adresseDeces: ['',Validators.required],
      adresseResidence: ['',Validators.required],
      // autreNationalite:[''],
      constater:[''],
      cause:[''],
      dateDeces:[''],
      descriptionDec:[''],
      numDeces:[''],
      numRegistre:[''],
      statusCadavre:[''],
      numTombe:[''],
      nomCim:[''],
      commentaire:['']
    });
    
  

    // this.ajoutForm = this.formBuilder.group(this.ajoutForm);
    this.ArrondissementService.getAll().subscribe(res=>{
      this.arrondissement=res
      console.log(res);
      console.log(this.arrondissement);
    })
    this.communeService.getAll().subscribe(res=>{
      this.commune=res
      console.log(res);
      console.log(this.commune);
    })
    this.constateurService.getAllConstateur().subscribe(res=>{
      this.constateur=res
      console.log(res);
      console.log(this.constateur);
    })
    this.quartierService.getAll().subscribe(res=>{
      this.quartier=res
      console.log(res);
      console.log(this.quartier);
    })
    
     
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




  RetourEmbalages(){
    this.router.navigate(["/bmh1/list-deces-naturel"]);
  }
  detecterChangementNationalite() {
    
      // if ( this.ajoutForm.value.nationalite === 'Autre') {
        
      //   this.ajoutForm.value.nationalite=this.ajoutForm.value.autreNationalite
        
      // } else {
      //   this.ajoutForm.get('autreNationalite').clearValidators();
      // }
      // this.ajoutForm.get('autreNationalite').updateValueAndValidity();
    }

  
  ajouter(){
   console.log(this.ajoutForm)
    this.detecterChangementNationalite();
    if(this.ajoutForm.valid){
    
      // if ( this.ajoutForm.value.nationalite === 'Autre') {
        
      //   this.ajoutForm.value.nationalite=this.ajoutForm.value.autreNationalite
        
      // }
      
      this.service.create(this.ajoutForm.value).subscribe(
        (res:any) => {
          const historique = {
              "nouveauStatut":this.ajoutForm.value.statusCadavre,
               "decesNaturel":{
                "id":res.id
               }
            }
            
            this.httpClient.post(`${this.baseUrl}historique-deces`, historique , { headers: this.headers })
            .subscribe((res)=>{
            
            console.log('stored successfully:', res);
            })
          this.allpjDeclar.forEach(formPj => {	
        
            const pcjDeclarant = new FormData();
        
              pcjDeclarant.append("file", formPj.selecetedFile)
              pcjDeclarant.append("sousModule", "Décés Naturel")
              pcjDeclarant.append("id",res.id)
              pcjDeclarant.append("label", formPj.LabelPj);
        
              this.httpClient.post(`${this.AlfresscoURL}/bmh-decesNaturel/multiplefile`, pcjDeclarant)
              .subscribe((res)=>{
              console.log('deces naturel pièce Jointe stored successfully:', res);
              })
            });
           
          console.log("nouveau res :", res);
          Swal.fire({
            title: 'Enregistrement réussi!',
            text: 'Constateur enregistré avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.RetourEmbalages();
            this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
          });
        },
        (err) => {
          console.error(err);
          Swal.fire({
            title: 'Erreur!',
            text: 'Un problème est survenu lors de l\'enregistrement du Constateur.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }

  
  }
  



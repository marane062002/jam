import { Component, OnInit } from '@angular/core';
import { StatistiqueEtablissementService } from '../../Service/controle-sanitaire/statistique-etablissement.service';
import { environment } from '../../../../../../environments/environment';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Interface } from 'readline';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'kt-statistique-etablissement',
  templateUrl: './statistique-etablissement.component.html',
  styleUrls: ['./statistique-etablissement.component.scss']
})
export class StatistiqueEtablissementComponent implements OnInit {
  baseUrl=environment.API_BMH_URL
  searchForm
  // filterDecesData(){}
  // reset(){}
  searchEtb:any[]=[]
  dateDebut: Date;
  dateFin: Date;
  sommeNature:any;
  sommeEtHg:any;
  sommeUnite:any;
  sommeMesures:any;
  stUnite:any[]
  stMesure:any[]
  stNature:any[]
  data:any
  // searchForm: FormGroup;
  etatsHygiene: string[] = ['EHS', 'EHM', 'EHNS']; // Définissez les états d'hygiène disponibles
colonnesAffichees: string[] = ['Arrondissement', ...this.etatsHygiene,"NBTOTAL"]; // Les colonnes affichées

nature: string[] = ['Alimentaires', 'Publics', 'Touristiques']; // Définissez les états d'hygiène disponibles
colonnesAfficheesNature: string[] = ['Arrondissement', ...this.nature]; // Les colonnes affichées

mesure: string[] = ['Prelevements', 'MiseDemeurs', 'AvertissementOrale','ArretActivite','SaisieDestructions']; // Définissez les états d'hygiène disponibles
colonnesAfficheesMesure: string[] = ['Arrondissement', ...this.mesure]; // Les colonnes affichées
ajoutForm: any;
unite: string[] = ['Kg', 'Litre', 'Unite']; // Définissez les états d'hygiène disponibles
// colonnesAfficheesUnite: string[] = ['Arrondissement', ...this.mesure, ...this.unite]; 
colonnesAfficheesUnite: string[] = ['Arrondissement', ...this.unite]; 
colonnesAfficheesUniteMesure: string[] = ['Arrondissement', ...this.mesure, ...this.unite]; 
combinedData: any[] = [];
  statistiques:any[]
  chart: any;// Déclaration de la variable pour stocker les statistiques
  result:any={}
  // displayedColumns: string[] = ["Arrondissement", "EHS", "EHM", "EHNS","NBTOTAL"];
  constructor(private datePipe:DatePipe,private service: StatistiqueEtablissementService,private formBuilder: FormBuilder,private http:HttpClient) {

   }
   private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
  ngOnInit(): void {
    this.colonnesAfficheesUnite
    this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			dateDebut: [""],
			dateFin: [""],
		});
    
    this.fetchData2();
    this.fetchData3();
    this.fillChartByParam2();
    
    
    this.fillChartByParam1();
     // Appel de la méthode pour récupérer les statistiques lors de l'initialisation du composant
    this.fillChartByParam3(); // Appel de la méthode pour récupérer les statistiques lors de l'initialisation du composant
    this.fillChartByParam4(); // Appel de la méthode pour récupérer les statistiques lors de l'initialisation du composant
    this.getArrondissement();
    
    this.getArrondissementParNature();
    // this.getCombinedData().subscribe(data => {
    //   this.combinedData = data;
    // });
    this.getArrondissementParUnite();
    this.getArrondissementParMesure();
    
    // this.getTotatlArrondissementMesures();
    this.fetchData();
    this.fetchData1();

    // this.exportToExcelSurvenu();
  
    
  }

  fillChartByParam2(): void {
    let params = new HttpParams();
    if (this.dateDebut) {
      
      params = params.set('dateDebut', this.formatDate(this.dateDebut));
    }
    if (this.dateFin) {
      
      params = params.set('dateFin', this.formatDate(this.dateFin));
    }
    this.http.get<any>(`${this.baseUrl}`+'statistique/arrondissements',{params ,headers: this.headers }).subscribe(
      (data: any) => {
        
        const arrondissements = Object.keys(data);
        const typesHygiene = ['EHS', 'EHM', 'EHNS']; // Les différents types d'état d'hygiène
        const datasets = [];

        // Parcourir les données pour chaque arrondissement
        arrondissements.forEach(arrondissement => {
          const values = [];

          // Parcourir les différents types d'état d'hygiène pour chaque arrondissement
          typesHygiene.forEach(type => {
            if (data[arrondissement][type]) {
              values.push(data[arrondissement][type]);
            } else {
              values.push(0); // Si le type d'état d'hygiène n'existe pas, mettre 0 comme valeur
            }
          });

          // Ajouter le dataset pour l'arrondissement actuel
          datasets.push({
            label: arrondissement,
            data: values,
            backgroundColor: this.generateRandomColor() // Générer une couleur aléatoire pour chaque arrondissement
          });
        });

        // Appel de la méthode pour créer le graphique à barres
        this.createBarChart(arrondissements, typesHygiene, datasets);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  createBarChart(arrondissements: string[], typesHygiene: string[], datasets: any[]): void {
    
    this.chart = new Chart('canvas', {
      
      type: 'bar',
      data: {
        labels: typesHygiene,
        datasets: datasets
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  // Générer une couleur aléatoire
  generateRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }



  fillChartByParam1(): void {
    let params = new HttpParams();
    if (this.dateDebut) {
      
      params = params.set('dateDebut', this.formatDate(this.dateDebut));
    }
    if (this.dateFin) {
      
      params = params.set('dateFin', this.formatDate(this.dateFin));
    }
    this.http.get<any>(`${this.baseUrl}`+'statistique/nature',{params ,headers: this.headers }).subscribe(
      (data: any) => {
        const arrondissements = Object.keys(data);
        const typesHygiene = ['Alimentaires', 'Publics', 'Touristiques']; // Les différents types d'état d'hygiène
        const datasets = [];

        // Parcourir les données pour chaque arrondissement
        arrondissements.forEach(arrondissement => {
          const values = [];

          // Parcourir les différents types d'état d'hygiène pour chaque arrondissement
          typesHygiene.forEach(type => {
            if (data[arrondissement][type]) {
              values.push(data[arrondissement][type]);
            } else {
              values.push(0); // Si le type d'état d'hygiène n'existe pas, mettre 0 comme valeur
            }
          });

          // Ajouter le dataset pour l'arrondissement actuel
          datasets.push({
            label: arrondissement,
            data: values,
            backgroundColor: this.generateRandomColor1() // Générer une couleur aléatoire pour chaque arrondissement
          });
        });

        // Appel de la méthode pour créer le graphique à barres
        this.createBarChart1(arrondissements, typesHygiene, datasets);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  createBarChart1(arrondissements: string[], typesHygiene: string[], datasets: any[]): void {
    this.chart = new Chart('canvas1', {
      type: 'bar',
      data: {
        labels: typesHygiene,
        datasets: datasets
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  generateRandomColor1(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }


  fillChartByParam3(): void {
    let params = new HttpParams();
    if (this.dateDebut) {
      
      params = params.set('dateDebut', this.formatDate(this.dateDebut));
    }
    if (this.dateFin) {
      
      params = params.set('dateFin', this.formatDate(this.dateFin));
    }
    this.http.get<any>(`${this.baseUrl}`+'statistique/mesures',{params ,headers: this.headers }).subscribe(
      (data: any) => {
        const arrondissements = Object.keys(data);
        const typesHygiene = ['Prelevements', 'MiseDemeurs', 'AvertissementOrale','ArretActivite','SaisieDestructions']; // Les différents types d'état d'hygiène
        const datasets = [];

        // Parcourir les données pour chaque arrondissement
        arrondissements.forEach(arrondissement => {
          const values = [];

          // Parcourir les différents types d'état d'hygiène pour chaque arrondissement
          typesHygiene.forEach(type => {
            if (data[arrondissement][type]) {
              values.push(data[arrondissement][type]);
            } else {
              values.push(0); // Si le type d'état d'hygiène n'existe pas, mettre 0 comme valeur
            }
          });

          // Ajouter le dataset pour l'arrondissement actuel
          datasets.push({
            label: arrondissement,
            data: values,
            backgroundColor: this.generateRandomColor1() // Générer une couleur aléatoire pour chaque arrondissement
          });
        });

        // Appel de la méthode pour créer le graphique à barres
        this.createBarChart3(arrondissements, typesHygiene, datasets);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  createBarChart3(arrondissements: string[], typesHygiene: string[], datasets: any[]): void {
    this.chart = new Chart('canvas3', {
      type: 'bar',
      data: {
        labels: typesHygiene,
        datasets: datasets
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  generateRandomColor3(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  fillChartByParam4(): void {
    let params = new HttpParams();
    if (this.dateDebut) {
      
      params = params.set('dateDebut', this.formatDate(this.dateDebut));
    }
    if (this.dateFin) {
      
      params = params.set('dateFin', this.formatDate(this.dateFin));
    }
    this.http.get<any>(`${this.baseUrl}`+'statistique/unite',{params ,headers: this.headers }).subscribe(
      (data: any) => {
        const arrondissements = Object.keys(data);
        const unite = ['Kg', 'Litre', 'Unite']; // Les différents types d'état d'hygiène
        const datasets = [];
          arrondissements.forEach(arrondissement => {
          const values = [];

          // Parcourir les différents types d'état d'hygiène pour chaque arrondissement
          unite.forEach(type => {
            if (data[arrondissement][type]) {
              values.push(data[arrondissement][type]);
            } else {
              values.push(0); // Si le type d'état d'hygiène n'existe pas, mettre 0 comme valeur
            }
          });
          datasets.push({
            label: arrondissement,
            data: values,
            backgroundColor: this.generateRandomColor1() // Générer une couleur aléatoire pour chaque arrondissement
          });
        });

        // Appel de la méthode pour créer le graphique à barres
        this.createBarChart4(arrondissements, unite, datasets);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  createBarChart4(arrondissements: string[], unite: string[], datasets: any[]): void {
    this.chart = new Chart('canvas4', {
      type: 'bar',
      data: {
        labels: unite,
        datasets: datasets
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
              // beginAtZero: false,
              // min: 10,
              // max: 100, 
              // stepSize: 10
            }
          }]
        }
      }
    });
  }

  generateRandomColor4(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }


  // getArrondissement(){
  //   this.service.getStatistiquesParArrondissement().subscribe(data => {
  //     this.statistiques = Object.entries(data).map(([arrondissement, valeurs]) => {
  //       // Vérifier si valeurs est un objet
  //       if (typeof valeurs === 'object' && valeurs !== null) {
  //         return {
  //           arrondissement,
  //           ...valeurs,
            
  //         };
  //       } else {
  //         // Gérer le cas où valeurs n'est pas un objet
  //         // Vous pouvez renvoyer un objet vide ou effectuer une autre action appropriée
  //         return {
  //           arrondissement
  //         };
  //       }
  //     });
  //   });
  // }
  sommeTotale
  getArrondissement() {
    let params = new HttpParams();
    if (this.dateDebut) {
      
      params = params.set('dateDebut', this.formatDate(this.dateDebut));
    }
    if (this.dateFin) {
      params = params.set('dateFin', this.formatDate(this.dateFin));
    }
    this.http.get<any>(`${this.baseUrl}`+'statistique/arrondissements', {params ,headers: this.headers }).subscribe(data => {
      const statistiques = data;
      let sommeTotale = 0; 
      let params = new HttpParams();
      if (this.dateDebut) {
        params = params.set('dateDebut', this.formatDate(this.dateDebut));
      }
      if (this.dateFin) {
        
        params = params.set('dateFin', this.formatDate(this.dateFin));
      }
      
      this.http.get<any[]>(`${this.baseUrl}statistique`,{params ,headers: this.headers }).subscribe((nombreEtablissements: any) => {
        
        this.statistiques = Object.entries(statistiques).map(([arrondissement, valeurs]) => {
          // Récupérer le nombre total d'établissements contrôlés pour cet arrondissement
          const nombreTotal = nombreEtablissements[arrondissement] || 0;
          sommeTotale += nombreTotal; 
          return {
            arrondissement,
            nombreTotal,
            ...valeurs
          };
        });
        this.sommeTotale = sommeTotale;
      });
    });
    console.log("stats arrondissement :", this.statistiques)
  }
  formatDate(date: any): string {
		return this.datePipe.transform(date, 'yyyy-MM-dd');
	  }
 getArrondissementParNature(){
  let params = new HttpParams();
  if (this.dateDebut) { 
    params = params.set('dateDebut', this.formatDate(this.dateDebut));
  }
  if (this.dateFin) {
    
    params = params.set('dateFin', this.formatDate(this.dateFin));
  }
  this.http.get<any>(`${this.baseUrl}`+'statistique/nature', {params ,headers: this.headers }).subscribe(data => {
      this.stNature = Object.entries(data).map(([arrondissement, valeurs]) => {
        if (typeof valeurs === 'object' && valeurs !== null) {
          return {
            arrondissement,
            ...valeurs,
          };
        } else {
          return {
            arrondissement
          };
        }
      });
    });
  }
longeur
  getArrondissementParMesure(){
    let params = new HttpParams();
    if (this.dateDebut) {
      
      params = params.set('dateDebut', this.formatDate(this.dateDebut));
    }
    if (this.dateFin) {
      
      params = params.set('dateFin', this.formatDate(this.dateFin));
    }
    this.http.get<any>(`${this.baseUrl}`+'statistique/mesures', {params ,headers: this.headers }).subscribe(data => {
      this.stMesure = Object.entries(data).map(([arrondissement, valeurs]) => {
        console.log("mesure",data)
        this.longeur
        // Vérifier si valeurs est un objet
        if (typeof valeurs === 'object' && valeurs !== null) {
          return {
            arrondissement,
            ...valeurs,
            
          };
        } else {
          // Gérer le cas où valeurs n'est pas un objet
          // Vous pouvez renvoyer un objet vide ou effectuer une autre action appropriée
          return {
            arrondissement
          };
        }
      });
    });
  }
  reset() {
		this.dateFin = null
    this.dateDebut = null
    this.ngOnInit()
	  }

    filterDecesData() {
      console.log("dated:", this.dateDebut)
      console.log("datefin :", this.dateFin)
      this.getArrondissement();
      this.fetchData2()
      this.fillChartByParam2()
      this.fillChartByParam1()
      this.fillChartByParam3()
      this.fillChartByParam4()
      this.getArrondissement()
      this.getArrondissementParNature()
      this.getArrondissementParMesure()
      this.getArrondissementParUnite()
      this.fetchData()
      this.fetchData1()
      this.fetchData2()
      this.fetchData3()
    }

  
  filtrerParDate(): void {
    debugger
    if (this.dateDebut && this.dateFin) {
      // Convertir les dates de type string en objets Date
       debugger
      const dateDebutObj = new Date(this.dateDebut);
      const dateFinObj = new Date(this.dateFin);
  debugger
      // Filtrer les données en fonction de l'intervalle de dates
      this.stMesure = this.stMesure.filter(item => {

        // Convertir la date de l'item en objet Date
        const dateItem = new Date(item.date); 
        
        // Vérifier si la date de l'item est comprise entre la date de début et la date de fin
        return dateItem >= dateDebutObj && dateItem <= dateFinObj;
      });
      console.log("st mesures : ",this.stMesure)
    }
  }
  


  getArrondissementParUnite(){
    let params = new HttpParams();
    if (this.dateDebut) {
      
      params = params.set('dateDebut', this.formatDate(this.dateDebut));
    }
    if (this.dateFin) {
      
      params = params.set('dateFin', this.formatDate(this.dateFin));
    }
    this.http.get<any>(`${this.baseUrl}`+'statistique/unite', {params ,headers: this.headers }).subscribe(data => {
      this.stUnite = Object.entries(data).map(([arrondissement, valeurs]) => {
        console.log("unite",data)
        // Vérifier si valeurs est un objet
        if (typeof valeurs === 'object' && valeurs !== null) {
          return {
            arrondissement,
            ...valeurs,
            
          };
        } else {
          // Gérer le cas où valeurs n'est pas un objet
          // Vous pouvez renvoyer un objet vide ou effectuer une autre action appropriée
          return {
            arrondissement
          };
        }
      });
    });
  }

    // getTotatlArrondissementMesures(){
    //   for(let i=0;i<this.mesure.length;i++){
    //       this.service.getSommeMesuresParArrondissement(this.mesure[i]).subscribe(data => {
    //     
    //     this.sommeMesures = data;
    //     
    //     console.log("total",this.sommeMesures)
    //   });
    //   }
    
    // }
  

    fetchData() {
      let params = new HttpParams();
      if (this.dateDebut) {
        
        params = params.set('dateDebut', this.formatDate(this.dateDebut));
      }
      if (this.dateFin) {
        
        params = params.set('dateFin', this.formatDate(this.dateFin));
      }
      this.http.get<any>(`${this.baseUrl}statistique/totalMesure`,{params ,headers: this.headers }).subscribe(data=>{
        this.sommeMesures=data;
        console.log(this.sommeMesures)
      })
    }

    fetchData1() {
      let params = new HttpParams();
      if (this.dateDebut) {
        
        params = params.set('dateDebut', this.formatDate(this.dateDebut));
      }
      if (this.dateFin) {
        
        params = params.set('dateFin', this.formatDate(this.dateFin));
      }
      this.http.get<any>(`${this.baseUrl}statistique/totalUnite`,{params ,headers: this.headers }).subscribe(data=>{
        
        this.sommeUnite=data;
        console.log("sommeUnite",this.sommeUnite)
      })
    }

    fetchData3() {
      let params = new HttpParams();
      if (this.dateDebut) {
        
        params = params.set('dateDebut', this.formatDate(this.dateDebut));
      }
      if (this.dateFin) {
        
        params = params.set('dateFin', this.formatDate(this.dateFin));
      }
      this.http.get<any>(`${this.baseUrl}statistique/totalNature`, {params ,headers: this.headers }).subscribe(data=>{
        this.sommeNature=data;
      })  
      console.log("sommeUnite",this.sommeNature)
    }
  
    fetchData2() {
      let params = new HttpParams();
      if (this.dateDebut) {
        
        params = params.set('dateDebut', this.formatDate(this.dateDebut));
      }
      if (this.dateFin) {
        
        params = params.set('dateFin', this.formatDate(this.dateFin));
      }
      
      this.http.get<any[]>(`${this.baseUrl}statistique/totalEtatHg`,{params ,headers: this.headers }).subscribe(data => {
      this.sommeEtHg = data;
      console.log("sommeHg", data);
    
    });
    }

    exportToExcelSurvenu(){
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('exportData'));
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      
      // const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      // Créez le tampon du fichier Excel
const excelBuffer: any = XLSX.write(wb, { type: 'array' });

      this.saveAsExcelFile(excelBuffer, 'Etat d hygiene fes etablissements Controles par arrondissement');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
      FileSaver.saveAs(data, fileName + new Date().getTime() + '.xlsx');

    }

    exportToExcelSurvenu1(){
      
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('exportData1'));
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      
      // const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      // Créez le tampon du fichier Excel
const excelBuffer: any = XLSX.write(wb, { type: 'array' });

      this.saveAsExcelFile(excelBuffer, 'Rapport de Nature de l Etablissement');
  }

  private saveAsExcelFile1(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
      FileSaver.saveAs(data, fileName + new Date().getTime() + '.xlsx');

    }

    exportToExcelSurvenu2(){
      
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById('exportData2'));
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      
      // const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      // Créez le tampon du fichier Excel
const excelBuffer: any = XLSX.write(wb, { type: 'array' });

      this.saveAsExcelFile(excelBuffer, 'Rapport du travail des equipes de controle');
  }

  private saveAsExcelFile2(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
      FileSaver.saveAs(data, fileName + new Date().getTime() + '.xlsx');

    }
 
    onSubmit(){
      const dateDebutValue = this.ajoutForm.get('dateDebut').value;
      const dateFinValue = this.ajoutForm.get('dateFin').value;
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const dateDebutString = dateDebutValue.toLocaleDateString('fr-FR', options);
      const dateFinString = dateFinValue.toLocaleDateString('fr-FR', options);
    
      console.log('Date Debut:', dateDebutString);
      console.log('Date Fin:', dateFinString);

        this.service.getEtablissements(dateDebutValue,dateFinValue).subscribe(
          (res: any) => {
              console.log(res);
                  this.stMesure = res;                  
          })
    }


   


  
  
  
}

  



import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatStepper, MatTableDataSource } from '@angular/material';
import { AoService } from '../../../shared/ao.service';

@Component({
  selector: 'kt-seance-resultat-def',
  templateUrl: './seance-resultat-def.component.html',
  styleUrls: ['./seance-resultat-def.component.scss']
})
export class SeanceResultatDefComponent implements OnInit { 
	typePjSeanceAvantDerniere = ["Lettre de complement"];
  displayedColumns1 = ["type", "nomDoc", "actions"];
  typePjSeanceDerniere = ["Convocation", "Lettre d'attribution", "Lettre de maintien", "Pv"];

	formPj = {
		type: "",
		selecetedFile: {},
	};
	formPjD = {
		type: "",
		selecetedFile: {},
	};
	@ViewChild("stepper", { static: true }) mystepper!: MatStepper;

  constructor(public dialogRef: MatDialogRef<SeanceResultatDefComponent>, private aoService: AoService, @Inject(MAT_DIALOG_DATA) public formData: any) { }
  longeurTableSeance
  ngOnInit() {
	this.formData
	
	this.aoService.findAllSeance().subscribe((res) => {
		this.longeurTableSeance = res.length;
	});
  }
  isLettreComplement
	selectedTypePJ(e) {
		if (this.formData.avantDerniereSeance == true) {
			if (e == "Lettre de complement") {
				this.isLettreComplement = true;
			
			}

		}
	}
	isConvocation
	isLettreAttribution
	isLettreMaintien
	isPv
	selectedTypePJDernier(e) {
		if (this.formData.derniereSeance == true) {
			if (e == "Convocation") {
				this.isConvocation = true;
				this.isLettreAttribution = false;
				this.isLettreMaintien = false;
				this.isPv = false;

			}
			if (e == "Lettre d'attribution") {
				this.isConvocation = false;
				this.isLettreAttribution = true;
				this.isLettreMaintien = false;
				this.isPv = false;

			}
			if (e == "Lettre de maintien") {
				this.isConvocation = false;
				this.isLettreAttribution = false;
				this.isLettreMaintien = true;
				this.isPv = false;

			}

			if (e == "Pv") {
				this.isConvocation = false;
				this.isLettreAttribution = false;
				this.isLettreMaintien = false;
				this.isPv = true;
			
			}
		}
	}
  getUpdatedUrl() {
		if (this.isLettreComplement == true) {
			let url = "./assets/doc/Lettre de Copmlément de dossier administratif.docx";
			window.open(url, "_blank");
		}


	}

	getUpdatedUrlDernier() {
		if (this.isConvocation == true) {
			let url = "./assets/doc/convocation.docx";
			window.open(url, "_blank");
		}
if(this.isLettreAttribution==true){
	let url = "./assets/doc/lettre d'attribution.docx";
	window.open(url, "_blank");
}
if(this.isLettreMaintien==true){
	let url = "./assets/doc/Lettre du Maintien.doc";
	window.open(url, "_blank");
}
if(this.isPv==true){
	let url = "./assets/doc/RESULTAT DEFINITIF.docx";
	window.open(url, "_blank");
}

	}
  allpjs = [];
	dataSource1: MatTableDataSource<any>;
	datas=[];

  file?: File;
	handleFile(e: any) {
		this.formPj.selecetedFile = e.target.files;
		this.file = e.target.files[0];
		this.allpjs.push(this.formPj);
		console.log(this.allpjs);
		
				this.aoService.nouvellepjSeance(this.formPj.selecetedFile, this.formData.idSeance, this.formPj.type, "SEANCE").subscribe((data) => {
					console.log("C: " + JSON.stringify(data, null, 2));
					this.dataSource1 = new MatTableDataSource(this.allpjs);
					this.formPj = { type: "", selecetedFile: {} };

					this.datas.push(data);

				});
				this.aoService.sendData(this.datas);
		// this.saveAttatchment(id, this.file)
	}





	allpjsD = [];
	dataSource2: MatTableDataSource<any>;
	datasDernier=[]
  fileD?: File;
	handleFileDernier(e: any) {
		this.formPjD.selecetedFile = e.target.files;
		this.fileD = e.target.files[0];
		this.allpjsD.push(this.formPjD);
		console.log(this.allpjsD);
		
				this.aoService.nouvellepjSeance(this.formPjD.selecetedFile, this.formData.idSeance, this.formPjD.type, "SEANCE").subscribe((data) => {
					console.log("C: " + JSON.stringify(data, null, 2));
					this.dataSource2 = new MatTableDataSource(this.allpjsD);
					this.formPjD = { type: "", selecetedFile: {} };
					this.datasDernier.push(data);

          
				});
				this.aoService.sendData(this.datasDernier);

		// this.saveAttatchment(id, this.file)
	}
	saveStepOne(){
		let seance = {
			ao: { id: this.formData.idao },
			libele: "seance" + Number(this.longeurTableSeance + 1),
			etatSeance:'DERNIER'

		};
	
		this.aoService.createSeance(seance).subscribe((res) => {
			this.formData.derniereSeance=true
			this.formData.avantDerniereSeance=false
			this.formData.seance=false
			this.mystepper.next();
		})
	}
}

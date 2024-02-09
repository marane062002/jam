import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatStepper, MatTableDataSource } from "@angular/material";
import * as $ from "jquery";
import { AoService } from "../../../shared/ao.service";
import { seanceService } from "../../../shared/seance.service";

@Component({
	selector: "kt-seance-dialog",
	templateUrl: "./seance-dialog.component.html",
	styleUrls: ["./seance-dialog.component.scss"],
})
export class SeanceDialogComponent implements OnInit {
	dataSource1: MatTableDataSource<any>;
	allpjs = [];
	@ViewChild("stepper", { static: true }) mystepper!: MatStepper;

	constructor(public dialogRef: MatDialogRef<SeanceDialogComponent>, private aoService: AoService, @Inject(MAT_DIALOG_DATA) public formData: any) {}
	typePjSeance = ["Convocation", "Feuille de presence", "Pv"];
	typePjSeanceAvantDerniere = ["Lettre de complement"];
	typePjSeanceDerniere = ["Convocation", "Lettre d'attribution", "Lettre de maintien", "Pv"];
	formPj = {
		type: "",
		selecetedFile: {},
	};
	displayedColumns1 = ["type", "nomDoc", "actions"];
	ngOnInit() {
		this.formData;
	}
	nom: string = '';
	prenom: string = '';
	role: string = '';
	membres: any[] = [];
  
	ajouterUnMembre() {
	  // Check if all fields are filled
	  if (this.nom && this.prenom && this.role) {
		// Add the new member to the array
		this.membres.push({
		  nom: this.nom,
		  prenom: this.prenom,
		  role: this.role
		});
  
		// Clear the input fields
		this.nom = '';
		this.prenom = '';
		this.role = '';
	  }
	}
	downloadFile(membre: any) {
		// Assuming you have a method to generate/download a file based on member data
		// You can implement this method based on your specific requirements
		// For example, generating a CSV file with member details
		const csvContent = `Nom,Prénom,Rôle\n${membre.nom},${membre.prenom},${membre.role}`;
		const blob = new Blob([csvContent], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
	
		// Create a temporary link and trigger the download
		const a = document.createElement('a');
		a.href = url;
		a.download = 'member_details.csv';
		document.body.appendChild(a);
		a.click();
	
		// Clean up
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	  }
	onDeletePj(id: number): void {
		this.allpjs.splice(id, 1);
		if (this.allpjs.length > 0) {
			this.dataSource1 = new MatTableDataSource(this.allpjs);
		} else {
			this.dataSource1 = null;
		}
	}
	isConvocation = false;
	isFeuillePresence = false;
	isPV = false;
	selectedTypePJ(e) {
		if (this.formData.seance == true) {
			if (e == "Convocation") {
				this.isConvocation = true;
				this.isFeuillePresence = false;
				this.isPV = false;
			}
			if (e == "Feuille de presence") {
				this.isFeuillePresence = true;
				this.isConvocation = false;
				this.isPV = false;
			}
			if (e == "Pv") {
				this.isFeuillePresence = false;
				this.isConvocation = false;
				this.isPV = true;
			}
		}
	}
	getUpdatedUrl() {
		if (this.isConvocation == true) {
			let url = "./assets/doc/convocation.docx";
			window.open(url, "_blank");
		}
		if (this.isFeuillePresence == true) {
			let url = "./assets/doc/feuille de présence commission.docx";
			window.open(url, "_blank");
		}

		if (this.isPV == true) {
			let url = "./assets/doc/PV 22-2021 1ère séance.docx";
			window.open(url, "_blank");
		}

	}
	file?: File;
	datas=[];
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
	// saveAttatchment(idDemande: number, file: File) {
	// 		this.aoService
	// 			.uploadSigned(idDemande, file)
	// 			.subscribe(
	// 				(res) => {
	// 					this.loadPage(0, true)

	// 					Swal.fire({
	// 						position: "center",
	// 						icon: "error",
	// 						title: this.translate.instant(
	// 							"PAGES.GENERAL.MSG_SIGNE_NOCONFIRMED"
	// 						),
	// 						showConfirmButton: false,
	// 						timer: 1500,
	// 					});
	// 				},
	// 				(error) => {
	// 					Swal.fire({
	// 						position: "center",
	// 						icon: "success",
	// 						title: this.translate.instant(
	// 							"PAGES.GENERAL.MSG_SIGNE_CONFIRMED"
	// 						),
	// 						showConfirmButton: false,
	// 						timer: 1500,
	// 					}).then(() => {
	// 						this.loadPage(0, true)
	// 					});
	// 				});

	// }
}

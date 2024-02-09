import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { AoService } from '../../../../../../views/pages/shared/ao.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'kt-show-seance-dialog',
  templateUrl: './show-seance-dialog.component.html',
  styleUrls: ['./show-seance-dialog.component.scss']
})
export class ShowSeanceDialogComponent implements OnInit {
	dataSource1: MatTableDataSource<any>;
	displayedColumns1 = ["type", "nomDoc", "actions"];

  constructor(public dialogRef: MatDialogRef<ShowSeanceDialogComponent>, private aoService: AoService, @Inject(MAT_DIALOG_DATA) public formData: any) { }
pjExiste
typePjSeance 

formPj = {
  type: "",
  selecetedFile: {},
};
  ngOnInit() {
    this.formData
    
    this.aoService.getAllPjSeance(this.formData.idSeance).subscribe((res)=>{
     
        this.aoService.findSeance(this.formData.idSeance).subscribe((data)=>{
          if(data.etatSeance=='SEANCE'){
            this.typePjSeance = ["Convocation", "Feuille de presence", "Pv"];

          }
          if(data.etatSeance=='AVANT_DERNIER'){
            this.typePjSeance = ["Lettre de complement"];

          }
          if(data.etatSeance=='DERNIER'){
            this.typePjSeance = ["Convocation", "Lettre d'attribution", "Lettre de maintien", "Pv"];

          }
        })
        this.dataSource1=res

     
      
    })
    
  }
  isConvocation = false;
	isFeuillePresence = false;
	isPV = false;
	selectedTypePJ(e) {
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
  onClickPj(e, id) {
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PieceJointeSeance/" + r, "_blank");
	}
}

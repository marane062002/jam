import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { AoService } from '../../shared/ao.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'kt-show-pj-commentaire',
  templateUrl: './show-pj-commentaire.component.html',
  styleUrls: ['./show-pj-commentaire.component.scss']
})
export class ShowPjCommentaireComponent implements OnInit {
  dataSource1: MatTableDataSource<any>;
	displayedColumns1 = [ "nomDoc", "actions"];

  constructor(public dialogRef: MatDialogRef<ShowPjCommentaireComponent>, private aoService: AoService, @Inject(MAT_DIALOG_DATA) public formData: any) { }
  pjExiste
  typePjSeance 
  
  formPj = {
    selecetedFile: {},
  };
  ngOnInit() {
    
    	this.aoService.findPjByCommentaire_Id(this.formData.idCommentaire).then((data) => {
						;
            this.dataSource1=data

					});
  }
  onClickPj(e, id) {
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjCommentaire/" + r, "_blank");
	}
}

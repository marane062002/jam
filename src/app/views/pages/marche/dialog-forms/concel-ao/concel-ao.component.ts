import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'kt-concel-ao',
  templateUrl: './concel-ao.component.html',
  styleUrls: ['./concel-ao.component.scss']
})
export class ConcelAoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConcelAoComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: any) { }

  ngOnInit() {

    //const id = this.formData.id;
    //const statut = this.formData.statutAo;
    //const motif = this.formData.motifAnnulation;

  //  console.log("Dialog ngOnInit : id : " + id + " | statut : "+ JSON.stringify(statut,null,2) + " | motif : " + motif )
    
  }

  // ================================================================
  //
  // ================================================================
  onNoClick(): void {
    this.dialogRef.close();
  }
}

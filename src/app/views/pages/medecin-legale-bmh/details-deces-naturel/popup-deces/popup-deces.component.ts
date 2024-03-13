import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { PopupComponent } from '../../details-obstacles/popup/popup.component';

@Component({
  selector: 'kt-popup-deces',
  templateUrl: './popup-deces.component.html',
  styleUrls: ['./popup-deces.component.scss']
})
export class PopupDecesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef <PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ["Num", "Nouveau_statut", "date"];
  ngOnInit() {
    this.dataSource.data = this.data
    console.log(this.data)
    console.log(this.data.id)
  }
    convertTimestampToDateTime(timestamp: number): string {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adjust options as needed
    }
    closeDialog(): void {
      this.dialogRef.close();
    }
}

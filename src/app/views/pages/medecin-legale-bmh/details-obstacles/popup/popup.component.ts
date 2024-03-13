import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'kt-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef <PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ["Num", "Nouveau_statut", "date"];
  ngOnInit() {
    this.dataSource.data = this.data
    console.log(this.data)
    console.log(this.data.id)
  }
  convertTimestampToDateTime(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  }
  closeDialog(): void {
    this.dialogRef.close();
    }
}

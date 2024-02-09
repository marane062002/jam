import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'kt-pdfviewer-dialog',
  templateUrl: './pdfviewer-dialog.component.html',
  styleUrls: ['./pdfviewer-dialog.component.scss']
})
export class PdfviewerDialogComponent implements OnInit {
  pdfSrc: string;
  isLoading = true;
  constructor(public dialogRef: MatDialogRef<PdfviewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.pdfSrc = data.pdfUrl;
    setTimeout(() => {
      if (this.pdfSrc != null)
        this.isLoading = false
    }, 1000);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}

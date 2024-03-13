import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'kt-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.scss']
})
export class PdfviewerComponent implements OnInit {
  pdfSrc: string;
  isLoading = true;
  constructor(public dialogRef: MatDialogRef<PdfviewerComponent>,
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

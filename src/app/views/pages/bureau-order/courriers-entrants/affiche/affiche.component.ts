import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-affiche',
  templateUrl: './affiche.component.html',
  styleUrls: ['./affiche.component.scss']
})
export class AfficheComponent implements OnInit {
  imageUrl: SafeUrl;


	constructor(private sanitizer: DomSanitizer,private router: Router,  public dialogRef: MatDialogRef<AfficheComponent>, @Inject(MAT_DIALOG_DATA) public Data: any) {}
  base64Image: any
  ngOnInit() {
    
    this.base64Image = this.Data.Data
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.base64Image);

	}

  retour(): void {
		this.dialogRef.close();
	}}
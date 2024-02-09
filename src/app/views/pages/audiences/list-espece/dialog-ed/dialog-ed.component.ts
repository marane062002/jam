import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
	selector: 'kt-dialog-ed',
	templateUrl: './dialog-ed.component.html',
	styleUrls: ['./dialog-ed.component.scss']
})
export class DialogEdesComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<DialogEdesComponent>,) { }

	ngOnInit() {
	}

}

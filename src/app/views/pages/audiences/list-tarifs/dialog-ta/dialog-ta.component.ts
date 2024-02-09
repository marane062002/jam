import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { info } from 'console';

@Component({
	selector: 'kt-dialog-ta',
	templateUrl: './dialog-ta.component.html',
	styleUrls: ['./dialog-ta.component.scss']
})
export class DialogTaComponent implements OnInit {
	typetarif = new FormControl();
	typeList = ['Unité', 'Kg'];
	selectedType;
	constructor(public dialogRef: MatDialogRef<DialogTaComponent>,) {



	}

	ngOnInit() {
	}



}




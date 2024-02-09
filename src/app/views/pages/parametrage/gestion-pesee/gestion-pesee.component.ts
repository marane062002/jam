import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PeseeService } from '../../pesee/Services/pesee.service';


@Component({
  selector: 'kt-gestion-pesee',
  templateUrl: './gestion-pesee.component.html',
  styleUrls: ['./gestion-pesee.component.scss']
})
export class GestionPeseeComponent implements OnInit {
	TypePeseeForm: FormGroup;

  language=localStorage.getItem('language');

  constructor(
    private router: Router,
    private translate: TranslateService,
    private peseeService: PeseeService) {
	this.TypePeseeForm = new FormGroup({

		typePesee: new FormControl("", [Validators.required]),
	});
  }

  ngOnInit() {
  }
  change1(e){

  }
  change2(e){

  }

  confirmbox() {
    
  }
}

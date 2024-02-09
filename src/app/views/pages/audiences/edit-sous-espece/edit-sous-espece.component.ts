import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'kt-edit-sous-espece',
  templateUrl: './edit-sous-espece.component.html',
  styleUrls: ['./edit-sous-espece.component.scss']
})
export class EditSousEspeceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  back() {
    this.router.navigate(["pages/audiences/list-sous-espece"]);
  }

}

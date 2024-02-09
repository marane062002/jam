import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'kt-add-sous-espece',
  templateUrl: './add-sous-espece.component.html',
  styleUrls: ['./add-sous-espece.component.scss']
})
export class AddSousEspeceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  back() {
    this.router.navigate(["pages/audiences/list-sous-espece"]);
  }

}

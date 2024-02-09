import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultationService } from '../../shared/consultation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  constructor(private service : ConsultationService , private router: Router) { }
  formData={"numRef":"","libelle":"","description":""};
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.service.sendArticle(this.formData).subscribe(data => {
      this.router.navigate(['/marches/articles-list']);
    })
  }

  backList(){
	this.router.navigate(['/marches/articles-list']);
  }
}

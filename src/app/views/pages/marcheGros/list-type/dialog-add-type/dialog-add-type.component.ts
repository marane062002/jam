import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { CategorieProduit } from '../../../../../core/_base/layout/models/categorie-produit';
import { TypeProduit } from '../../../../../core/_base/layout/models/type-produit';
import { TypeServiceService } from '../../Service/type-service.service';
import { CatService } from '../../Service/cat-service.service';

@Component({
  selector: 'kt-dialog-add-type',
  templateUrl: './dialog-add-type.component.html',
  styleUrls: ['./dialog-add-type.component.scss']
})
export class DialogAddTypeComponent implements OnInit {
  loading: boolean = false
  type: TypeProduit
  Cat: CategorieProduit[]

  typeform = new FormGroup({
    numArticleProduit: new FormControl('', [Validators.required]),
    nomArticleProduit: new FormControl('', [Validators.required]),

    categorieProduit: new FormGroup({
      id: new FormControl('', Validators.required),
    }),

  });
  constructor(
     public dialogRef: MatDialogRef<DialogAddTypeComponent>,
     private typeservice: TypeServiceService,
     private catService: CatService,
     ) { }


  ngOnInit() {
    this.catService.query().subscribe({
      next: (res: HttpResponse<CategorieProduit[]>) => {
        this.Cat = res.body;
      },
      error: () => {

      },
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  resetForm() {
    this.loading = false;
    this.typeform.reset();
    this.dialogRef.close();

  }
  onSubmit() {

    this.typeservice.createType(this.typeform.value)
      .subscribe(data =>
        console.log("data=============>", data), error => console.log(error));
    this.dialogRef.close();
    location.reload()

  }

  onImageSelected(event:any){
    
  }
}


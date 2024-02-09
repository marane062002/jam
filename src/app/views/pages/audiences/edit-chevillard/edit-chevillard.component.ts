import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ChevillardService } from '../service/chevillard.service';
import Swal from 'sweetalert2';
import { Chevillard, IChevillard } from '../../../../core/_base/layout/models/abattoir/chevillard';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-edit-chevillard',
  templateUrl: './edit-chevillard.component.html',
  styleUrls: ['./edit-chevillard.component.scss']
})
export class EditChevillardComponent implements OnInit {

  id: number;
  chevillard: Chevillard;
  constructor(private router: Router,
    protected activatedRoute: ActivatedRoute,
    private chevillardService: ChevillardService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']
    })
    console.log("Id:" + this.id);
    this.getData();
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ chevillardD }) => {
      this.chevillardUpdateForm.patchValue({ ...chevillardD })
      console.log(this.chevillardUpdateForm.value);

    });
  }
  back() {
    this.router.navigate(["audiences/list-audiences"]);
  }

  chevillardUpdateForm = this.fb.group({
    id: '',
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    dateNaissance: ['', Validators.required],
    telephone: ['', Validators.required],
    cin: ['', Validators.required],
    adresse: ['', Validators.required],

  });


  getData() {
    this.chevillardService.getChevillardById(this.id)
      .then(data => {
        console.log(data);
        this.chevillardUpdateForm.patchValue(data);
      });
  }


  edit() {
    const formValues = this.chevillardUpdateForm.value
    const chevillard: any = Object.assign({}, formValues);
    console.log('chevillard: ' + JSON.stringify(chevillard));
    const controls = this.chevillardUpdateForm.controls;

    if (this.chevillardUpdateForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    // this.loading = true;
    this.editChevillard(chevillard);

  }

  editChevillard(chevillard) {
    this.chevillardService.updateChevillard(chevillard)
      .subscribe(
        data => {
          console.log(data),
            Swal.fire({
              position: "center",
              icon: "success",
              title: this.translate.instant("AUTH.GENERAL.MODIFICATION_REUSSIE"),
              showConfirmButton: false,
              timer: 2500
            });
          this.back()
        },
        error => {
          console.log(error),
            Swal.fire({
              position: "center",
              icon: "error",
              title: this.translate.instant("AUTH.GENERAL.ECHEC_MODIFICATION"),
              showConfirmButton: false,
              timer: 2500
            });
        }
      );
  }


  isControlHasError(controlName: string, validationType: string): boolean {
    var result;
    const control = this.chevillardUpdateForm.controls[controlName];
    if (!control) {
      return false;
    }
    result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
  /*
  chevillardUpdateForm=new FormGroup({  
    nom:new FormControl('' , [Validators.required  ] ),
    prenom:new FormControl('' , [Validators.required  ] ),
    dateNaissance:new FormControl('' , [Validators.required] ),
    telephone:new FormControl('' , [Validators.required ] ),  
    cin:new FormControl('' , [Validators.required ] ),   
    adresse:new FormControl('' , [Validators.required  ] ),
    
  });
*/
  /*
    edit(){
      const chevillardD = this.createFrom();
      if (chevillardD.id !== undefined) {
        if(this.chevillardUpdateForm.valid){
          //this.chevillardService.updateChevillard(this.chevillardUpdateForm?.value).subscribe(res => {
            this.chevillardService.updateChevillard(this.chevillardUpdateForm.value).subscribe(res => {
          //console.log("res ==> ",res?.body)
          console.log("res ==> ",res.body)
          Swal.fire({
            position: "center",
            icon: "success",
            title: this.translate.instant(
              "PAGES.GENERAL.MSG_UPDATE_CONFIRMED"
            ),
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
              this.router.navigate(["/main/facture-avocat/list-factures"]);
            })
      },error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: this.translate.instant(
            "PAGES.GENERAL.MSG_UPDATE_NOCONFIRMED"
          ),
          showConfirmButton: false,
          timer: 1500,
        });
          console.log("error ===> ",error)
      });
        }
  
    }
  
  
    }
    */
  /* 
   updateChevillard(chevillard){
     this.chevillardService.updateChevillard(chevillard).subscribe(data=>console.log(data),error=>console.log(error));
   }
 */
  /*
    protected createFrom(): IChevillard {
      return {
        ...new Chevillard(),
        id: this.chevillardUpdateForm.get(['id'])!.value,
        nom: this.chevillardUpdateForm.get(['nom'])!.value,
        prenom: this.chevillardUpdateForm.get(['prenom'])!.value,
        dateNaissance: this.chevillardUpdateForm.get(['dateNaissance'])!.value,
        telephone: this.chevillardUpdateForm.get(['telephone'])!.value,
        cin: this.chevillardUpdateForm.get(['cin'])!.value,
        adresse: this.chevillardUpdateForm.get(['adresse'])!.value,
        }
      };
  */


}


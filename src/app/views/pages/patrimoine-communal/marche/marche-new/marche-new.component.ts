import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router } from '@angular/router';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'kt-marche-new',
  templateUrl: './marche-new.component.html',
  styleUrls: ['./marche-new.component.scss']
})
export class MarcheNewComponent implements OnInit {


  loading = false;
  marcheForm: FormGroup;
  statuts: any;
  types: any;
  arrondissements: any;
  addDecisionForm: FormGroup;
  public uploadDecisionFiles: Array<File>;
  addPhotosForm: FormGroup;
  public uploadPhotosFiles: Array<File>;
  elmMarche: Number[] = [];
  elmS: Number[] = [];

  dontGoToList: boolean = false;

  constructor(private service: BienscommunalService,

    private router: Router,
    private fb: FormBuilder

  ) {

    this.getStatut()
    this.getType()
    this.getArrondissement()

  }

  createItemMagasin(): FormGroup {
    return this.fb.group({
      localisation: '',
      numMagasin: '',
      superficieMag: '',
      nomLocataireMAG: '',
      cinLocMag: '',
      dateContratLoc: '',
      dateEnregContratLoc: '',
      montantLoc: '',
      dateMajMontantLoc: '',
      dateFinContratLoc: ''
    });
  }

  createItemSeance(): FormGroup {
    return this.fb.group({
      localisation: [null],
      numSeance: [null],
      superficieSeance: [null],
      nomLocSeance: [null],
      cinLocSeance: [null],
      dateContratLocSeance: [null],
      dateEnregContratLocSeance: [null],
      montantLocSeance: [null],
      dateMajMontantLocSeance: [null],
      dateFinContratLocSeance: [null]

    });
  }
  itemsMagasin: FormArray;
  addItemMagasin(): void {
    this.itemsMagasin = this.marcheForm.get('magasins') as FormArray;
    this.itemsMagasin.push(this.createItemMagasin());
  }
  deleteItemMagasin(value) {
    this.itemsMagasin.controls.splice(value, 1);
  }


  itemsSeances: FormArray;
  addItemSeances(): void {
    this.itemsSeances = this.marcheForm.get('seances') as FormArray;
    this.itemsSeances.push(this.createItemSeance());
  }
  deleteItemSeances(value) {
    this.itemsSeances.controls.splice(value, 1);
  }
  idPatrimoine;
  idMarche;
  ngOnInit() {
    this.idPatrimoine = parseInt(localStorage.getItem('idPatrimoine'));
    this.service.getMarcheById(this.idPatrimoine).subscribe(res => {
      console.log(res);
      if (res[0].id != 0) {
        localStorage.setItem('idMarche', res[0].id);
        this.idMarche = parseInt(localStorage.getItem('idMarche'));
      }
      else {
        this.idMarche = 0;
      }
    },
      err => { console.log(err) })




    this.marcheForm = this.fb.group({

      // numMarche: ['', Validators.required],
      // localisation: [null],
      dateDebutExploitation: [null],
      nomMarche: [null],
      nombreMagasin: [null],
      nombreSession: [null],
      // superficie: [null],
      // description: [null],
      observation: [null],
      contenance: [null],
      statut: [null],
      arrondissement: [null],
      typeMarche: [null],
      adresse: [null],
      magasins: this.fb.array([]),
      seances: this.fb.array([]),
      numberOfPc: [null]

    })


    this.addDecisionForm = this.fb.group({
      _file: []
    });
    this.addPhotosForm = this.fb.group({
      _file2: []
    });

  }

  get f() { return this.marcheForm ? this.marcheForm.controls : null; }
  get m() { return this.f ? this.f.magasins as FormArray : null; }

  getStatut() {
    this.service.getStatut()
      .then(data => { this.statuts = data })
  }

  getType() {
    this.service.getType()
      .then(data => { this.types = data })
  }

  getArrondissement() {
    this.service.getArrondissement()
      .then(data => { this.arrondissements = data })
  }




  onSubmit() {
    this.marcheForm.value.numberOfPc = this.idPatrimoine;
    const formValues = this.marcheForm.value
    const controls = this.marcheForm.controls;
    /** check form */
    if (this.marcheForm.invalid) {

      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    const marche: any = Object.assign({}, formValues);

    //var smth = JSON.stringify(marche)
    this.service.saveMarche(marche)
      .subscribe(data => {
        console.log(JSON.stringify(marche))
        let m: any = Object.assign({}, data);
        console.log(m.id)
        /*  if(this.uploadDecisionFiles)
               this.service.updloadFile(this.uploadDecisionFiles, m.id,'/PjLmarcheDecisions/multiplefile')
               .subscribe(resp=>{console.log(resp)},
               error => console.log(error))
         if(this.uploadPhotosFiles)
         this.service.updloadFile(this.uploadPhotosFiles, m.id,'/PjLmarchePhotos/multiplefile')
         .subscribe(resp=>{console.log(resp)},
         error => console.log(error)) */
        //this.router.navigate(['marche/marche-index'])
        if (this.dontGoToList == false) {
          this.router.navigate(['/patrimoine/patrimoine-index'])
        }
      }, error => console.log(error)
      );

  }

  back() {
    // this.router.navigate(['marche/marche-index']);
    this.router.navigate(['/patrimoine/patrimoine-index'])
  }



  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.marcheForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  // ============================================
  // Upload file event
  // ============================================
  /* 	fileChange(event) {
      this.uploadDecisionFiles = event.target.files;
      console.log(this.uploadDecisionFiles)
      if (event.target.files.length > 0) {
        console.log("target : " + event.target.files.length);
        const file = event.target.files[0];
        this.addDecisionForm.patchValue(this.uploadDecisionFiles);

      }

    }*/
  filePhotosChange(event) {
    this.uploadPhotosFiles = event.target.files;

    if (event.target.files.length > 0) {
      console.log("target : " + event.target.files.length);
      const file = event.target.files[0];
      this.addPhotosForm.patchValue(this.uploadPhotosFiles);

    }

  }


  setNombreElementMarche(Value: Number): void {
    //  this.addItem();
    // this.elmMarche=[];
    // for(let i = 1; i <= Value ; i++){
    // }
  }

  setNombreElementS(Value: any): void {
    this.elmS = [];
    for (let i = 1; i <= Value; i++) {
      this.elmS.push(i);
    }
  }

  changeTab(a) {
    console.log(a)
    if (a.index == 0) {
      if (this.idMarche == 0) {
        this.dontGoToList = true;
        this.onSubmit();
      }
      this.router.navigate(["marche/marche-edit/magasin"], {
        queryParams: { id: this.idPatrimoine },
      });
    }
    if (a.index == 1) {
      if (this.idMarche == 0) {
        this.dontGoToList = true;
        this.onSubmit();
      }
      this.router.navigate(["marche/marche-edit/seance"], {
        queryParams: { id: this.idPatrimoine },
      });
    }
  }

}

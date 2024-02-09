import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BienscommunalService } from '../../services/bienscommunal.service';
import _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../../../utils/spinner.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-marche-edit',
  templateUrl: './marche-edit.component.html',
  styleUrls: ['./marche-edit.component.scss']
})
export class MarcheEditComponent implements OnInit {
  loading = false;
  marcheForm: FormGroup;
  statuts: any;
  types: any;
  arrondissements: any;
  addDecisionForm: FormGroup;
  public uploadDecisionFiles: Array<File>;
  addPhotosForm: FormGroup;
  public uploadPhotosFiles: Array<File>;
  id: number;

  constructor(private service: BienscommunalService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private spinnerService: SpinnerService,
    private translate: TranslateService
  ) {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    console.log('ID: ' + this.id);

    this.marcheForm = this.fb.group({
      id: [''],
      nomMarche: ['', Validators.required],
      magasins: this.fb.array([]),
      seances: this.fb.array([]),
      numberOfPc: ['']

    })
    this.addDecisionForm = this.fb.group({
      _file: []
    });
    this.addPhotosForm = this.fb.group({
      _file2: []
    });

    this.getMarche();
  }

  async getMarche(){
    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner

    await this.service.getMarcheById(this.id)
    .pipe(finalize(()=>{
      this.spinnerService.stop(spinnerRef);
    }))
    .subscribe(data => {
      //  console.log('data :' +JSON.stringify(data,null,4));
      console.log('data : ' + JSON.stringify(data[0], null, 4));
      this.isLoading=false
      this.marcheForm.patchValue(this.populateObjectMarche(data[0]));
      
    })
  }

  populateObjectMarche(value: any): any {
    let marche = {

    }
    if (value != null) {
      marche['id'] = value.id;
      marche['nomMarche'] = value.nomMarche;
      if (value.magasins != null && value.magasins.length > 0) {
        marche['magasins'] = [];
        value.magasins.forEach(element => {
          marche['magasins'].push({
            id: element.id,
            localisation: element.localisation,
            numMagasin: element.numMagasin,
            superficieMag: element.superficieMag,
            nomLocataireMAG: element.nomLocataireMAG,
            cinLocMag: element.cinLocMag,
            dateContratLoc: element.dateContratLoc,
            dateEnregContratLoc: element.dateEnregContratLoc,
            montantLoc: element.montantLoc,
            dateMajMontantLoc: element.dateMajMontantLoc,
            dateFinContratLoc: element.dateFinContratLoc
          })
        });


      }
      if (value.seances != null && value.seances.length > 0) {
        marche['seances'] = [];
        value.seances.forEach(element => {
          marche['seances'].push({
            id: element.id,
            localisation: element.localisation,
            numSeance: element.numSeance,
            superficieSeance: element.superficieSeance,
            nomLocSeance: element.nomLocSeance,
            cinLocSeance: element.cinLocSeance,
            dateContratLocSeance: element.dateContratLocSeance,
            dateEnregContratLocSeance: element.dateEnregContratLocSeance,
            montantLocSeance: element.montantLocSeance,
            dateMajMontantLocSeance: element.dateMajMontantLocSeance,
            dateFinContratLocSeance: element.dateFinContratLocSeance

          })
        });


      }
    }
    console.log('MarcheForm: '+ JSON.stringify(this.marcheForm.value));

    console.log("aaaa :"+ this.marcheForm.get('magasins')['controls'])

    console.log('Marche: '+ JSON.stringify(marche));
    return marche;

  }

  createItemMagasin(): FormGroup {
    return this.fb.group({
      id: [''],
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
      id: [null],
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
  openMagasin: boolean = false;
  idMarche;
  isLoading: boolean = true;
  async ngOnInit() {
    /* this.service.getMarcheById(this.id).subscribe((res: any) => {
			console.log(res);
      localStorage.setItem('idMarche',res[0].id);
      this.idMarche=parseInt(localStorage.getItem('idMarche'));

			var b = { index: 0 };
			this.changeTab(b);
		}, err => {
			console.log(err)
		}) */

    this.idPatrimoine = localStorage.getItem('idPatrimoine');
    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
    await this.service.getMarcheById(this.idPatrimoine)
    .pipe(finalize(()=>{
      this.spinnerService.stop(spinnerRef);
    }))
    .subscribe(res => {
      console.log(res);
      this.isLoading = false;
      this.marcheForm.patchValue(this.populateObjectMarche(res[0]));
      
      localStorage.setItem('idMarche',res[0].id);
      this.idMarche=parseInt(localStorage.getItem('idMarche'));
			var b = { index: 0 };
			this.changeTab(b);
        if (res[0].magasins != null) {
          for (let i = 0; i < res[0].magasins.length; i++) {
            this.addItemMagasin();
            this.populateObjectMarche(res[0]);
          }
        }
        if (res[0].seances != null) {
          for (let j = 0; j < res[0].seances.length; j++) {
            this.addItemSeances();
            this.populateObjectMarche(res[0]);
          }
      }
    },
      err => { console.log(err) })
      this.isLoading=false;
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

  ajouterMagasins() {

    const nb = this.f.nombreMagasin.value;
    console.log(nb)
    for (let i = 0; i < nb; i++) {
      this.m.push(this.fb.group({
        numMagasin: [''],

      }));
    }
  }

  onSubmit() {

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

    //  this.service.saveMarche(marche)
    //   .subscribe(data =>{
    //          let m:any=Object.assign({}, data);
    //              console.log(m.id)
    /*  if(this.uploadDecisionFiles)
           this.service.updloadFile(this.uploadDecisionFiles, m.id,'/PjLmarcheDecisions/multiplefile')
           .subscribe(resp=>{console.log(resp)},
           error => console.log(error))
     if(this.uploadPhotosFiles)
     this.service.updloadFile(this.uploadPhotosFiles, m.id,'/PjLmarchePhotos/multiplefile')
     .subscribe(resp=>{console.log(resp)},
     error => console.log(error)) */
    //           this.router.navigate(['marche/marche-index'])
    // },error => console.log(error)
    //         );

    //// UPDATE MARCHE   //////
    this.service.updateMarche(marche, this.idPatrimoine)
      .subscribe(data => {
        console.log(JSON.stringify(marche))
        let m: any = Object.assign({}, data);
        console.log(m.id)
        this.router.navigate(['/patrimoine/patrimoine-index'])
      }, error => console.log(error)
      )
  }

  back() {
    this.location.back()
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


  changeTab(a) {
		console.log(a)
		if (a.index == 0) {
      if(this.idMarche==0){
        this.router.navigate(["marche/marche-new"], {
          queryParams: { id: this.idMarche },
        });
      }else{
			this.router.navigate(["marche/marche-edit/magasin"], {
				queryParams: { id: this.idMarche },
			});
    }
		}
		if (a.index == 1) {
      if(this.idMarche==0){
        this.router.navigate(["marche/marche-new"], {
          queryParams: { id: this.idMarche },
        });
      }
      else{
			this.router.navigate(["marche/marche-edit/seance"], {
				queryParams: { id: this.idMarche },
			});
    }}
		}



}

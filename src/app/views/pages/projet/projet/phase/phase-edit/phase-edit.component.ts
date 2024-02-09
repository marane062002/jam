import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjetService } from '../../../services/projet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'kt-phase-edit',
  templateUrl: './phase-edit.component.html',
  styleUrls: ['./phase-edit.component.scss']
})
export class PhaseEditComponent implements OnInit {

  loading = false;
  id: number;
  phaseForm: FormGroup;
  projets: any;
  statuts: any;
  projetId: number;
  constructor(private service: ProjetService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private SpinnerService: NgxSpinnerService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.projetId = params['p'];
    });

    this.getStatuts()
  }


  ngOnInit() {

    this.phaseForm = this.fb.group({
      id: [this.id],
      designation: ['', Validators.required],
      descriptif: [null],
      projet: [{ id: this.projetId }],
      dateDebutPrevue: [''],
      dateFinPrevue: [null],
      dureeEstimee: [null],
      dateDebutReelle: [''],
      dateFinReelle: [null],
      dureeReelle: [null],
      budgetPhase: [null],
      statut: this.fb.group({ id: [] }),

    })
    setTimeout(() => { this.SpinnerService.show() }, 25);
    this.service.
      getPhaseById(this.id)
      .then(data => {
        console.log('phase : ' + JSON.stringify(data, null, 4));
        this.phaseForm.patchValue(data);
        this.phaseForm.get('dateDebutPrevue').patchValue(new Date(data.dateDebutPrevue).toISOString())
        this.phaseForm.get('dateDebutReelle').patchValue(new Date(data.dateDebutReelle).toISOString())
        this.phaseForm.get('dateFinPrevue').patchValue(new Date(data.dateFinPrevue).toISOString())
        this.phaseForm.get('dateFinReelle').patchValue(new Date(data.dateFinReelle).toISOString())
        /*this.phaseForm.get('source').patchValue('source');
     this.phaseForm.get('souSource').patchValue('souSource');
     this.phaseForm.get('type').patchValue('stypeource');
     this.phaseForm.get('sousType').patchValue('sousType');
   */
        setTimeout(() => { this.SpinnerService.hide() }, 2000);
      }, error => {
        console.log(error);
        setTimeout(() => { this.SpinnerService.hide() }, 2000);
      })
  }

  getStatuts() {
    this.service.getStatuts()
      .then(data => {
        this.statuts = data;

      }, err => {
        console.log(err);

      }
      );
  }

  dateChange() {
    let dateFp = this.phaseForm.controls['dateFinPrevue'].value
    let dateDp = this.phaseForm.controls['dateDebutPrevue'].value

    if (dateFp && dateDp) {
      if (dateFp >= dateDp) {
        let diffc = dateFp.getTime() - dateDp.getTime();
        let duree = Math.round(Math.abs(diffc / (1000 * 60 * 60 * 24)));
        this.phaseForm.controls['dureeEstimee'].setValue(duree)

      }

    }


  }
  dateRChange() {
    let dateFp = this.phaseForm.controls['dateFinReelle'].value
    let dateDp = this.phaseForm.controls['dateDebutReelle'].value

    if (dateFp && dateDp) {
      if (dateFp >= dateDp) {
        let diffc = dateFp.getTime() - dateDp.getTime();
        let duree = Math.round(Math.abs(diffc / (1000 * 60 * 60 * 24)));
        this.phaseForm.controls['dureeReelle'].setValue(duree)

      }

    }


  }
  onSubmit() {
    const formValues = this.phaseForm.value
    const controls = this.phaseForm.controls;
    /** check form */
    if (this.phaseForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    const phase: any = Object.assign({}, formValues);


    this.service.savePhase(phase)
      .subscribe(data => {
        console.log(data)
        this.router.navigate(['projet/projet-show/'], { queryParams: { id: this.projetId } })


      },
        error => console.log(error)
      );
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
    const control = this.phaseForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

}

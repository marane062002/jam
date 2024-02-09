import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2';
import { ConventionMarcheService } from '../../../shared/conventionService';
import { ProgrammePhase } from '../../../shared/ProgrammePhase';
import { ProgrammeService } from '../../../shared/ProgrammeService';
import * as _ from 'lodash';
import * as $ from "jquery";
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProgrammeRetroService } from '../../../shared/ProgrammeRetroService';
@Component({
  selector: 'kt-add-programme-retroplanning',
  templateUrl: './add-programme-retroplanning.component.html',
  styleUrls: ['./add-programme-retroplanning.component.scss']
})
export class AddProgrammeRetroplanningComponent implements OnInit {
  language = localStorage.getItem('language');
  tabConsistance = [];
  tabEmplacement = [];
  formGroup: FormGroup;
  programmePhaseBudgets: FormArray;
  sousProjets: FormArray;
  listConvention: any
  listPhase;
  programme_id: number = 0;
  showInputP2: boolean = false;
  showInputP1: boolean = false;
  isUpdate: boolean = false;
  disabled: boolean = false
  formPj = { type: 0, selecetedFile: {} };

  minDate: Date;

  allpjs = [];
  codes = ["A", "B", "C", "D", "E", "F", "G", " H", "I", " J", "K", "L", "M", "N", " O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", " Y", "Z"]
  constructor(private router: Router,
    private translate: TranslateService,
    private fileUtils: FilesUtilsService,
    private programmeRetroService: ProgrammeRetroService,
    private activatedRoute: ActivatedRoute) {
    this.formGroup = new FormGroup({
      numero: new FormControl(''),
      axe: new FormControl(''),
      projet: new FormControl(''),
      mod: new FormControl(''),
      dateDebut: new FormControl(''),
      dateFin: new FormControl(''),
      delai: new FormControl(''),
      id: new FormControl(''),
      emplacement: new FormControl([]),
      consistance: new FormControl([]),
    });

  }

  programmeEdit
  // Visible: any = 1;
  Visible: any;
  files: Observable<any>;
  files1: Observable<any>;

  isSelected: boolean = false;
  ngOnInit() {
    const today = new Date();
    this.minDate = today;
    this.formGroup.get('dateDebut').valueChanges.subscribe(() => {
      this.calculateDelay();
    });

    this.formGroup.get('dateFin').valueChanges.subscribe(() => {
      this.calculateDelay();
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.programme_id = params['id'];
      if (this.programme_id != undefined && this.programme_id != 0) {
        this.isUpdate = true;
        this.programmeRetroService.findById(this.programme_id).subscribe((res: any) => {
          this.programmeEdit = res;
          this.tabConsistance = res.consistance;
          this.tabEmplacement = res.emplacement;
          this.formGroup.patchValue(_.pickBy(res));
          if (res.consistance.length > 0 || res.emplacement.lenght > 0) {
            this.formGroup.patchValue({
              consistance: '',
              emplacement: '',
            })
          }
        }, err => {
          console.log(err);
        })
      }
    }
    )
  }

  calculateDelay() {
    const startDate = this.formGroup.get('dateDebut').value;
    const endDate = this.formGroup.get('dateFin').value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const yearsDiff = end.getFullYear() - start.getFullYear();
      const monthsDiff = end.getMonth() - start.getMonth();
      const daysDiff = end.getDate() - start.getDate();

      const delayInMonths = yearsDiff * 12 + monthsDiff;
      let totalDelay = delayInMonths + daysDiff / 30.44; // Assuming 30 days in a month for simplicity
      totalDelay = Math.round(totalDelay);
      // Update the delay field in the form
      this.formGroup.get('delai').setValue(totalDelay);
    }
  }

  addEmplacement() {
    this.tabEmplacement.push(this.formGroup.value.emplacement);
    this.formGroup.get('emplacement').reset()
  }

  addConsistance() {
    this.tabConsistance.push(this.formGroup.value.consistance);
    this.formGroup.get('consistance').reset()
  }

  deleteEmplacement(index: number) {
    this.tabEmplacement.splice(index, 1);
  }

  deleteConsistance(index: number) {
    this.tabConsistance.splice(index, 1);
  }

  RetourEmbalages(): void {
    this.router.navigate(["programme/retroplanning-programme"]);
  }

  onSubmit() {
    if (this.tabEmplacement.length != 0) {
      this.formGroup.value.emplacement = this.tabEmplacement;
    } else if (this.formGroup.value.emplacement != '') {
      this.formGroup.value.emplacement = [this.formGroup.value.emplacement]
    }
    if (this.tabConsistance.length != 0) {
      this.formGroup.value.consistance = this.tabConsistance;
    } else if (this.formGroup.value.consistance != '') {
      this.formGroup.value.consistance = [this.formGroup.value.consistance]
    }
    this.programmeRetroService.save(this.formGroup.value).subscribe((res: any) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: ' été bien enregistré',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(["/programme/retroplanning-programme"])
    }, err => {
      console.log(err)
    })
  }
}

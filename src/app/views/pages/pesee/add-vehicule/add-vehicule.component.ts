import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Console, log } from 'console';
import { Vehicule } from '../../../../core/_base/layout/models/vehicule';
import { VehiculeService } from '../Services/vehicule.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-addvehicule',
  templateUrl: './add-vehicule.component.html',
  styleUrls: ['./add-vehicule.component.scss']
})
export class AddvehiculeComponent implements OnInit {
  vehicule: Vehicule
  loading: boolean = false
  tele: String
  maxId: number;
  t: number
  i: number = 0
  series: { name: string }[] = [
    { name: 'أ' },
    { name: 'ب' },
    { name: 'ت' },
    { name: 'ث' },
    { name: 'ج' },
    { name: 'ح' },
    { name: 'خ' },
    { name: 'د' },
    { name: 'ذ' },
    { name: 'ر' },
    { name: 'ز' },
    { name: 'س' },
    { name: 'ش' },
    { name: 'ص' },
    { name: 'ض' },
    { name: 'ط' },
    { name: 'ظ' },
    { name: 'ع' },
    { name: 'غ' },
    { name: 'ف' },
    { name: 'ق' },
    { name: 'ك' },
    { name: 'ل' },
    { name: 'م' },
    { name: 'ن' },
    { name: 'ه' },
    { name: 'و' },
    { name: 'ي' },
  ];
  
  vehiculesaveform = new FormGroup({
    refTransport: new FormControl('', [Validators.required]),
    numCarteGrise: new FormControl('', [ Validators.minLength(5)]),
    numVehicule: new FormControl('', [ Validators.minLength(5)]),
    numVehiculeNumbers: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]*$')]),
    numVehiculeAlphabet: new FormControl('', [Validators.required]),
    numVehiculeTwoNumbers: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]*$')]),
    numPermi: new FormControl('', [Validators.minLength(1)]),
    numPermis: new FormArray([]),
    tarra: new FormControl('', [ Validators.minLength(3)]),
    genre: new FormControl('', [ Validators.minLength(5)]),
    nomConducteur: new FormControl('', [Validators.required, Validators.minLength(5)]),
    tel: new FormControl('', [ Validators.minLength(10)]),
    message: new FormControl('', [ Validators.minLength(5)]),
    numCnie: new FormControl('', [Validators.minLength(3)]),
    numCnies: new FormArray([]),

  });

  constructor(
    private router: Router,
    private vehiculeService: VehiculeService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {

 }


  resetForm() {
    this.loading = false;

    this.vehiculesaveform.reset();
    this.router.navigate(["pesee/list-vehicule"]);

  }
  get numCniesArray() {
    return this.vehiculesaveform.get('numCnies') as FormArray;
  }

  addNumCnieField() {
    const numCnieControl = this.vehiculesaveform.get('numCnie') as FormControl;
    const numCniesArray = this.vehiculesaveform.get('numCnies') as FormArray;
    numCniesArray.push(new FormControl(numCnieControl.value));
    numCnieControl.reset(); // Reset the input field after adding to the array
  }


  removeNumCnieField(index: number) {
    this.numCniesArray.removeAt(index);
  }
  get numPermisArray() {
    return this.vehiculesaveform.get('numPermis') as FormArray;
  }

  addNumPermisField() {
    const numPermisControl = this.vehiculesaveform.get('numPermi') as FormControl;
    const numPermisArray = this.vehiculesaveform.get('numPermis') as FormArray;
    numPermisArray.push(new FormControl(numPermisControl.value));
    numPermisControl.reset();
  }

  removeNumPermisField(index: number) {
    this.numPermisArray.removeAt(index);
  }


  onSubmit() {
    const numVehiculeNumbers = this.vehiculesaveform.get('numVehiculeNumbers').value;
    const numVehiculeAlphabet = this.vehiculesaveform.get('numVehiculeAlphabet').value;
    const numVehiculeTwoNumbers = this.vehiculesaveform.get('numVehiculeTwoNumbers').value;
    const numVehicule = `${numVehiculeNumbers}${numVehiculeAlphabet}${numVehiculeTwoNumbers}`;
    this.vehiculesaveform.get('numVehicule').setValue(numVehicule);
 
    
    this.vehiculesaveform.value.refTransport = this.maxId;
if(this.vehiculesaveform.value.refTransport!=''&& this.vehiculesaveform.value.numVehicule!=''&& this.vehiculesaveform.value.nomConducteur!='' ) {
  this.vehiculeService.createVehicule(this.vehiculesaveform.value).subscribe(
    (data) => {
      console.log('data==============>', data);
      this.resetForm();

      // Configure the MatSnackBar position at the top
      const snackBarConfig: MatSnackBarConfig = {
        verticalPosition: 'top',
        duration: 5000 // Display the snackbar for 5 seconds
      };

      this.snackBar.open(this.translate.instant('PAGES.VEHICULE.VEHICULE_ADDED_SUCCESSFULLY'), 'Close', snackBarConfig);
    },
    (error) => {
      console.log(error);

      // Check if the error object has a 'detail' property
      if (error.error && error.error.detail) {
        // Configure the MatSnackBar position at the top
        const snackBarConfig: MatSnackBarConfig = {
          verticalPosition: 'top',
          duration: 5000 // Display the snackbar for 5 seconds
        };

        this.snackBar.open(this.translate.instant('PAGES.VEHICULE.'+error.error.detail), 'Close', snackBarConfig);
      } else {
        // Configure the MatSnackBar position at the top
        const snackBarConfig: MatSnackBarConfig = {
          verticalPosition: 'top',
          duration: 5000 // Display the snackbar for 5 seconds
        };

        this.snackBar.open('An error occurred: ' + error.message, 'Close', snackBarConfig);
      }
    }
  );
}
   
  }

  ngOnInit() {
    this.vehiculeService.getMaxId().subscribe(
      (res) => {
        if (res.body === null) {
          this.maxId = 1;

        }
        else {
          this.maxId = res.body + 1;
          
        }
      },
      (error: any) => {
        console.error('Error fetching max ID:', error);
      }
    );

  }


  onSelectionChangeTarra(event) {

    if (event < 600) {
      this.vehiculesaveform.get("genre").setValue("Autre")

    } else if (600 <= event && event < 2200) {
      this.vehiculesaveform.get("genre").setValue("Pick-up")

    } else if (event >= 2200 && event <= 5000) {
      this.vehiculesaveform.get("genre").setValue("Canter")

    } else {
      this.vehiculesaveform.get("genre").setValue("Camion")

    }

  }


}

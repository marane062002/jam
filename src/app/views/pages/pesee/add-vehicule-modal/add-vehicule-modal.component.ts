import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { VehiculeService } from '../Services/vehicule.service';

@Component({
  selector: 'kt-add-vehicule-modal',
  templateUrl: './add-vehicule-modal.component.html',
  styleUrls: ['./add-vehicule-modal.component.scss']
})
export class AddVehiculeModalComponent implements OnInit {
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
    numVehicule: new FormControl('', [ Validators.minLength(5)]),
    numVehiculeNumbers: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]*$')]),
    numVehiculeAlphabet: new FormControl('', [Validators.required]),
    numVehiculeTwoNumbers: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]*$')]),
   
    tarra: new FormControl('', [ Validators.minLength(3)]),
    genre: new FormControl('', [ Validators.minLength(5)]),

    nomConducteur: new FormControl('', [Validators.required, Validators.minLength(5)]),
  

  });
  maxId: number;
  loading: boolean = false

  constructor(public dialogRef: MatDialogRef<AddVehiculeModalComponent>,  private router: Router,
    private vehiculeService: VehiculeService,
    private snackBar: MatSnackBar,
    private translate: TranslateService) { }

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
  
  resetForm() {
    this.loading = false;

    this.vehiculesaveform.reset();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}

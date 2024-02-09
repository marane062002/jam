import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; // Import the necessary modules for FormBuilder and FormGroup
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpResponse } from '@angular/common/http';
import { HangarService } from '../../../marcheGros/Service/hangar.service';
import { Hangar } from "../../../../../core/_base/layout/models/Hangar";
@Component({
  selector: 'kt-transactions-globales-journalieres',
  templateUrl: './transactions-globales-journalieres.component.html',
  styleUrls: ['./transactions-globales-journalieres.component.scss'],
})
export class TransactionsGlobalesJournalieresComponent implements OnInit {

  today: number = Date.now();
  Hangar: Hangar[];
   
  transactionForm = new FormGroup({
  transactionNumber:new FormControl('', [Validators.required]),
  transactionTime:new FormControl(this.getCurrentDateTime()),
  timeDebut: new FormControl(this.getCurrentDateTime()),
  transactionAmount:new FormControl('', [Validators.required ]),
  numTransaction:new FormControl('', [Validators.required ]),
  heureTransaction:new FormControl('', [Validators.required ]),
  sommeTransaction:new FormControl('', [Validators.required ]),
  partDue:new FormControl('', [Validators.required]),
  partCarreau:new FormControl('', [Validators.required ]),
  partCommune:new FormControl('', [Validators.required ]),
  hangar: new FormGroup({
    id: new FormControl("", Validators.required),
  }),
  });
  getCurrentDateTime(): string {
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  
    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = this.padZero(now.getHours());
    const minutes = this.padZero(now.getMinutes());
  
    return `${dayOfWeek} ${day} ${month} ${year} ${hours}:${minutes}`;
  }
  
  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
  constructor(
    private formBuilder: FormBuilder,
    private hangarService: HangarService,) {
  }
  currentTime: string;
  ngOnInit() {
    this.transactionForm.controls['transactionTime'].setValue(this.getCurrentDateTime());
    
    this.currentTime = this.getCurrentDateTime();

    setInterval(() => {
    this.currentTime = this.getCurrentDateTime();
    }, 60000); 

    this.hangarService.getAllHangars().subscribe({
        next: (res: HttpResponse<Hangar[]>) => {
            this.Hangar = res.body;
            console.log("hangar", this.Hangar);
        },

        error: () => { },
    });
  }
  toggleCheckbox(controlName: string) {
    const control = this.transactionForm.get(controlName);

    if (control) {
      control.setValue(!control.value);
      if (control.value) {
        control.enable();
      } else {
        control.enable();
      }
    }
  }

  onSubmit() {
    
  }

  resetForm() {
    
  }
}
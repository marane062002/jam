import { Injectable } from '@angular/core';

import { AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
  export class UidValidator {
  
    private timeout;
  
    constructor(private http: HttpClient) {
    }
  
    validate(control: AbstractControl): Promise<{ [key: string]: boolean }> {
      clearTimeout(this.timeout);
  
      const value = control.value;
  
      // do not call server when input is empty 
      if (!value ) {
        return Promise.resolve(null);
      }
  
      return new Promise((resolve, reject) => {
        this.timeout = setTimeout(() => {
            this.http.get<boolean>('http://localhost:9101/Users/comptes/checkUid/'+value)
            .subscribe(flag => {
                if (flag) {
                  resolve({'uidTaken': true});
                  control.setErrors({'uidTaken': true})
                } else {
                  resolve(null);
                  control.setErrors(null)
                };console.log(flag)
              },
              (err) => {
                console.log(err);
              }
            );
        }, 200);
      });
    }
  
  }
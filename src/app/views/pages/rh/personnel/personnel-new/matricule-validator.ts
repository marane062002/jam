import { Injectable } from '@angular/core';

import { AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';



@Injectable({
    providedIn: 'root'
  })
  export class MatriculeValidator {
  
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
            this.http.get<boolean>(environment.personnelUrl +'/personnels/checkMatricule/'+value)
            .subscribe(flag => {
              console.log("error")
                if (flag) {
                  resolve({'matriculeTaken': true});
                  control.setErrors({'matriculeTaken': true})
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
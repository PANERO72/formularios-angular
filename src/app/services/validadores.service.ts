import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  usuarioYaExiste(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {
    if(!control.value){
      return Promise.resolve(null);
    }
    return new Promise(( resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'PANI72'){
          resolve({existe: true});
        }else{
          resolve(null);
        }
      }, 3500);
      
    }) 
  }

  /*usuarioYaExiste(control: FormControl): ErrorValidate {
    if(control.value?.toLowerCase() === 'PANI72'){
      return {
        usuarioYaExiste: true
      }
    }
    return null;    
  }*/
  
  noPanero(control: FormControl): ErrorValidate {
    if(control.value?.toLowerCase() === 'panero'){
      return {
        noPanero: true
      }
    }

    return null;
  }

  passwordsMatcheds(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PaisesService } from './../../../services/paises.service';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent implements OnInit {

  constructor(private paisesService: PaisesService) { }

  usuario = {
    nombre: '', apellidos: '', correo: '', pais: '', genero: 'Masculino'
  };

  paises: any[] = [];

  name: string;
  lastname: string;
  email: string;
  country: string;
  gender: string;

  ngOnInit(): void {
    this.paisesService.getPaises().subscribe(paises => {
      this.paises = paises;

      this.paises.unshift({
        nombre: 'Seleccione un País', codigo: ''
      })

      console.log(paises);
    });
  }

  guardar(form: NgForm){

    if(form.invalid){

      Object.values(form.controls).forEach( control => {
        control.markAsTouched();
      }); 

      return;
    }

    this.name = form.value.nombre;
    this.lastname = form.value.apellidos;
    this.email = form.value.correo;
    this.country = form.value.pais;
    this.gender = form.value.genero;

    console.log(form);
    console.log(form.value);
    
  }

}
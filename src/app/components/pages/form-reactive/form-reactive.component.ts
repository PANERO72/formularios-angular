import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from "../../../services/validadores.service";

@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.css']
})

export class FormReactiveComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private validadores: ValidadoresService) {
    this.crearFormulario();
    //this.cargarDatosFormulario();
    this.crearListner();
  }

  valid: boolean;
  status: string;
  name: string;
  lastname: string;
  user: string;
  email: string;
  password: string;
  street: string;
  city: string;
  province: string;
  country: string;

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.form.get('pasatiempos') as FormArray;
  }

  get nombreNovalido(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get apellidosNoValidos(){
    return this.form.get('apellidos').invalid && this.form.get('apellidos').touched;
  }

  get usuarioNoValido(){
    return this.form.get('usuario').invalid && this.form.get('usuario').touched;
  }

  get correoNoValido(){
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }

  get password1NoValido(){
    return this.form.get('password1').invalid && this.form.get('password1').touched;
  }

  get password2NoValido(){
    const pass1 = this.form.get('password1').value;
    const pass2 = this.form.get('password1').value;
    
    return (pass1 === pass2) ? false : true && this.form.get('password2').invalid && this.form.get('password2').touched;
  }


  //**************************** */

  get calleNoValido(){
    return this.form.get('direccion.calle').invalid && this.form.get('direccion.calle').touched;
  }

  get ciudadNoValido(){
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
  }

  get provinciaNoValido(){
    return this.form.get('direccion.provincia').invalid && this.form.get('direccion.provincia').touched;
  }

  get paisNoValido(){
    return this.form.get('direccion.pais').invalid && this.form.get('direccion.pais').touched;
  }

  crearFormulario(){
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required], apellidos: ['', [Validators.required, this.validadores.noPanero]], usuario: ['', , this.validadores.usuarioYaExiste], correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]], password1: ['', Validators.required], password2: ['', Validators.required],
      direccion: this.formBuilder.group({
        calle: ['', Validators.required], ciudad: ['', Validators.required], provincia: ['', Validators.required], pais: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([ ])
    },{
      validators: this.validadores.passwordsMatcheds('password1', 'password2')
    });
  }

 /* crearFormulario(){
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(8)]], apellidos: ['', [Validators.required, Validators.minLength(10)]], usuario: ['', [Validators.required, Validators.minLength(10)]], correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]], password1: ['', Validators.required], password2: ['', Validators.required],
      direccion: this.formBuilder.group({
        calle: ['', Validators.required, Validators.minLength(20)], ciudad: ['', Validators.required, Validators.minLength(25)], provincia: ['', Validators.required, Validators.minLength(25)], pais: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([ ])
    },{
      validators: this.validadores.passwordsMatcheds('password1', 'password2')
    });
  }*/

  crearListner(){
    /*this.form.valueChanges.subscribe(valor => {
      console.log(valor);
    });

    /*this.form.statusChanges.subscribe(status => {
      console.log({status});
    });*/

    this.form.get('nombre').valueChanges.subscribe( console.log);
  }

  /*cargarDatosFormulario(){
    this.form.setValue({
      nombre: 'José', apellidos: 'Otero', correo: 'panerootero@gmail.com', password1: '123456', password2: '123456', direccion: {
        calle: 'Bruc nº 19', ciudad: 'Vilanova i la Geltrú', provincia: 'Barcelona', pais: 'España'
      }
    });
  }*/

  agragarPasatiempo(){
    this.pasatiempos.push(this.formBuilder.control(''));
  }

  eliminarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
  }
 
  guardar(){
    console.log(this.form);
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach( control => {
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => {
            control.markAsTouched();
          });
        }else{
          control.markAsTouched();
        }
      }); 
  
    }else{
      this.valid = this.form.valid;
      this.status = this.form.status;
      this.name = this.form.value.nombre;
      this.lastname = this.form.value.apellidos;
      this.user = this.form.value.usuario;
      this.email = this.form.value.correo;
      this.password = this.form.value.password1;
      this.street = this.form.value.calle;
			this.city = this.form.value.ciudad;
			this.province = this.form.value.provincia;
			this.country = this.form.value.pais;
    }
  }

}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FormTemplateComponent } from './components/pages/form-template/form-template.component';
import { FormReactiveComponent } from './components/pages/form-reactive/form-reactive.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { titulo: 'Inicio' }},
  { path: 'template', component: FormTemplateComponent, data: { titulo: 'Por Plantilla' } },
  { path: 'reactive', component: FormReactiveComponent, data: { titulo: 'Reactivo' } },
  { path: '**', pathMatch: 'full', redirectTo: '/home' },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
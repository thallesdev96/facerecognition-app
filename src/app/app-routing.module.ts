import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebcamComponent } from './webcam/webcam.component';

const routes: Routes = [
  { path: 'webcam', component: WebcamComponent },
  // ... outras rotas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
